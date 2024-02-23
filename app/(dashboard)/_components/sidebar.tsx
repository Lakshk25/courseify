import React from 'react'
import SidebarRoutes from './sidebar-routes'

const Sidebar = () => {
    return (
        <div className='h-full md:flex flex-col md:border-r-2 w-full gap-5 p-0'>
            <div className="text-3xl text-sky-700 font-medium text-center pt-2 w-full">
                Coursify
            </div>
            <div className="w-full text-sm pt-5">
                <SidebarRoutes />
            </div>
        </div>
    )
}

export default Sidebar