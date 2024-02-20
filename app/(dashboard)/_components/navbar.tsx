import { UserButton } from '@clerk/nextjs'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'
import MobileSidebar from './mobile-sidebar'
import NavbarRoutes from './navbar-routes'

const Navbar = () => {
  return (
    <div className='flex bg-sky-200 px-2 items-center'>
      <NavbarRoutes />
      {/* <MobileSidebar /> */}
    </div>
  )
}

export default Navbar