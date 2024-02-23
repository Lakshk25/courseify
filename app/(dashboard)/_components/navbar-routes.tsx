import { UserButton } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherRoute = pathname.includes("teacher");
  const isCoursesPage = pathname.startsWith("courses");

  return (
    <div className='flex justify-end items-center w-full gap-x-6 font-bold'>
      {
        (isTeacherRoute || isCoursesPage) ? (
          <Link href="/">
            <div className='flex justify-center items-center gap-x-1'>
              <LogOut className='h-5 w-5' />
              Exit
            </div>
          </Link>
        ) :
          <>
            <Link href="/teacher/courses">Teacher mode</Link>
          </>
      }
      <UserButton />
    </div >
  )
}

export default NavbarRoutes