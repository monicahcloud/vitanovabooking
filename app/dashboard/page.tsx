

import NavBar from '../components/NavBar';
import { requireUser } from '../lib/hooks'

export default async function DashboardPage () {
    //fetch user session and check that the user is authenicated
    const session = await requireUser();
  

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <NavBar />
    </div>
  )
}


