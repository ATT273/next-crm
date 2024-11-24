import PageContent from "./components/PageContent"
import { getSession } from '@/app/actions'
import Forbidden from "@/components/pages/forbiden";
import { permissionsValue } from "@/constants";
import { Metadata } from "next";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile",
};

const Profile = async () => {
  const session = await getSession()
  if (!session) {
    redirect('/authenticate')
  } else {
    if (!(session.permissions & permissionsValue.ACCESS)) {
      return (
        <Forbidden />
      )
    }
  }
  return (
    <>
      <PageContent />
    </>
  )
}

export default Profile