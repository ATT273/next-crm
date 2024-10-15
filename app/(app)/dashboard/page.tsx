import { redirect } from 'next/navigation';
import DashboardTable from "./components/table";
import { getSession } from '@/app/actions'
const Dashboard = async () => {
  const session = await getSession()
  if (!session) {
    redirect('/authenticate')
  }

  return (
    <div className='p-3 relative'>
      <h1 className='font-bold text-2xl mb-3'>Dashboard</h1>
      <DashboardTable />
    </div>
  )
}

export default Dashboard