import PageContent from "./components/PageContent"
import { getSession } from '@/app/actions'
import { redirect } from 'next/navigation';

const Profile = async () => {
  const session = await getSession()
  if (!session) {
    redirect('/authenticate')
  }
  return (
    <>
      <PageContent />
    </>
  )
}

export default Profile