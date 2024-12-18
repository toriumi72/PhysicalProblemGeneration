import Generator from './components/generate'
import { getUnits } from '@/features/supabase/units'

export default async function GeneratePage() {
  const data = await getUnits()

  return (
    <>
      <div className="max-w-xl mx-auto">
        <Generator units={data} />
      </div>
    </>
  )
}
