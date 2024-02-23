"use client";
import MobileSidebar from './mobile-sidebar'
import NavbarRoutes from './navbar-routes'

const Navbar = () => {
  return (
    <div className='flex text-gray-600 text-sm font-medium px-4 items-center py-6 border-b-2'>
      <div className='md:hidden h-full w-full'>
        <MobileSidebar />
      </div>
      <NavbarRoutes />
    </div>
  )
}

export default Navbar