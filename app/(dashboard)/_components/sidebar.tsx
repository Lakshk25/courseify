import React from 'react'
import SidebarRoutes from './sidebar-routes'

const Sidebar = () => {
    return (
        <div className='h-full hidden md:flex flex-col items-center border-r-2 w-full gap-5'>
            <div className="text-3xl text-sky-700 font-medium text-center pt-2 w-full">
                Coursify
            </div>
            <div className="h-full w-full text-sm p-0">
                <SidebarRoutes />
            </div>
        </div>
    )
}

export default Sidebar