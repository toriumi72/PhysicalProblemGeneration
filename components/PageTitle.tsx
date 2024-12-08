"use client";

import { usePathname } from "next/navigation";

export function PageTitle() {
  const pathname = usePathname();
  const titleMap: { [key: string]: string } = {
    "/": "ホーム",
    "/dashboard": "ダッシュボード",
    "/support": "サポート",
    "/generate": "問題生成",
    "/problems": "問題一覧",
    "/settings": "設定",
    "/feedback": "フィードバック",
    // 必要に応じて他のパスとタイトルを追加
  };
  const pageTitle = titleMap[pathname] || pathname;

  return <h1 className="mb-2 font-semibold">{pageTitle}</h1>;
} 