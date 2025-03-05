# DB設計

--========================================
-- subjects (教科マスタ)
--========================================
CREATE TABLE public.subjects (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,        -- 例: "物理", "数学"
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--========================================
-- categories (大分類マスタ)
-- 例: 物理内の "力学", "電磁気", "波動", "熱学" など
--========================================
CREATE TABLE public.categories (
  id BIGSERIAL PRIMARY KEY,
  subject_id BIGINT REFERENCES public.subjects (id) ON DELETE CASCADE,
  name TEXT NOT NULL,    -- 例: "力学"
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (subject_id, name)
);

--========================================
-- units (単元マスタ)
-- 例: 力学内の"運動の表し方", "力とその働き", "力学的エネルギー" 等
--========================================
CREATE TABLE public.units (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT REFERENCES public.categories (id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (category_id, name)
);

--========================================
-- difficulties (難易度マスタ)
-- 例: 初級、中級、上級 など
--========================================
CREATE TABLE public.difficulties (
  id BIGSERIAL PRIMARY KEY,
  level_name TEXT NOT NULL UNIQUE,
  parameters JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--========================================
-- users (ユーザプロフィール拡張)
-- auth.usersとの1対1マッピングを想定
--========================================
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users (id),
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--========================================
-- user_settings (ユーザ毎設定)
-- ユーザのデフォルト難易度、好みの単元など
--========================================
CREATE TABLE public.user_settings (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.users (id) ON DELETE CASCADE,
  default_difficulty_id BIGINT REFERENCES public.difficulties (id),
  -- preferred_unitsは削除または、ただのBIGINT[]型（外部キーなし）にする
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--========================================
-- problem_generation_requests (問題生成要求ログ)
-- LLMへの問題生成リクエスト記録
--========================================
CREATE TABLE public.problem_generation_requests (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.users (id) ON DELETE SET NULL,
  requested_units BIGINT[] REFERENCES public.units (id),
  difficulty_id BIGINT REFERENCES public.difficulties (id),
  question_count INT NOT NULL,
  request_params JSONB,
  response_metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--========================================
-- problems (生成された問題本体)
-- どのリクエストから生成されたか、どの単元・難易度かなどを紐づけ
--========================================
-- problem_generation_requests テーブルは配列カラム無しで再作成
CREATE TABLE public.problem_generation_requests (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.users (id) ON DELETE SET NULL,
  difficulty_id BIGINT REFERENCES public.difficulties (id),
  question_count INT NOT NULL,
  request_params JSONB,
  response_metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 中間テーブルを新規作成して、problem_generation_requests と units を紐づける
CREATE TABLE public.problem_generation_request_units (
  problem_generation_request_id BIGINT REFERENCES public.problem_generation_requests (id) ON DELETE CASCADE,
  unit_id BIGINT REFERENCES public.units (id) ON DELETE CASCADE,
  PRIMARY KEY (problem_generation_request_id, unit_id)
);

--========================================
-- problem_hints (問題ごとのヒント)
-- 問題IDに対して複数のヒントを順序付きで管理
--========================================
CREATE TABLE public.problem_hints (
  id BIGSERIAL PRIMARY KEY,
  problem_id BIGINT REFERENCES public.problems (id) ON DELETE CASCADE,
  hint_order INT NOT NULL,
  hint_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (problem_id, hint_order)
);

--========================================
-- user_problem_attempts (ユーザの解答記録)
-- ユーザがどの問題にいつ解答したか、評価はどうか
--========================================
CREATE TABLE public.user_problem_attempts (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.users (id) ON DELETE CASCADE,
  problem_id BIGINT REFERENCES public.problems (id) ON DELETE CASCADE,
  user_evaluation TEXT,        -- "○", "×", "△"等
  user_answer TEXT,
  attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--========================================
-- dashboard_metrics (ダッシュボード用集計テーブル)
-- ユーザ毎に一定期間の学習データを集計
--========================================
CREATE TABLE public.dashboard_metrics (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.users (id) ON DELETE CASCADE,
  metric_date DATE NOT NULL,
  total_problems INT DEFAULT 0,
  correct_rate NUMERIC(5,2),
  difficulty_breakdown JSONB,
  trend_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--========================================
-- api_logs (APIログ)
-- LLM呼び出しやシステム的なログを保存
--========================================
CREATE TABLE public.api_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.users (id) ON DELETE SET NULL,
  endpoint TEXT,
  request_data JSONB,
  response_data JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--========================================
-- problems
--========================================
CREATE TABLE public.problems (
  id BIGSERIAL PRIMARY KEY,
  generation_request_id BIGINT REFERENCES public.problem_generation_requests (id) ON DELETE SET NULL,
  unit_id BIGINT REFERENCES public.units (id),
  difficulty_id BIGINT REFERENCES public.difficulties (id),
  -- question部分
  question_title TEXT NOT NULL,
  question_text TEXT NOT NULL,
  -- answer部分（steps）
  step_titles TEXT[] NOT NULL CHECK (array_length(step_titles, 1) = 3),
  step_explanations TEXT[] NOT NULL CHECK (array_length(step_explanations, 1) = 3),
  -- answer部分（final_answer）
  final_answer_text TEXT NOT NULL,
  final_answer_equation TEXT NOT NULL,
  -- hints部分
  hints TEXT[] NOT NULL CHECK (array_length(hints, 1) = 3),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--========================================
-- problem_units
-- 中間テーブルを新規作成して、problems と units を紐づける
--========================================
CREATE TABLE public.problem_units (
  problem_id BIGINT REFERENCES public.problems (id) ON DELETE CASCADE,
  unit_id BIGINT REFERENCES public.units (id) ON DELETE CASCADE,
  PRIMARY KEY (problem_id, unit_id)
);

-- トリガー設定
--========================================
-- トリガー関数の作成
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, display_name)
  VALUES (NEW.id, NEW.display_name);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- トリガーの作成 (authスキーマに対して)
CREATE TRIGGER on_auth_user_insert
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_auth_user();

ポイント
auth.usersテーブルへの権限設定
デフォルトではauthスキーマはSupabaseが管理する部分ですが、トリガーを作成することは可能です。
トリガー作成には十分な権限が必要なので、スーパーユーザ権限または適切なロールで操作する必要があります。

public.usersテーブルへの書き込み
public.usersは先に定義したカスタムユーザテーブルで、auth.users.idをpublic.users.idとして外部キー的に紐づけています。
トリガーはNEW.id（auth.usersの新規ユーザID）を用いてpublic.usersテーブルに対応するユーザレコードを作成します。

display_nameや他の初期値の設定
必要に応じてNEWから受け取れる値（emailなど）を活用したり、display_nameなど初期値を設定したりすることも可能です。
