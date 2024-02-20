import React from 'react'
import Sidebar from './_components/sidebar'
import Navbar from './_components/navbar'

const DashboardLayout = (
    {
        children
    }: { children: React.ReactNode }
) => {
    return (
        <div className='flex h-full'>
            <div>
                <Sidebar />
            </div>
            <div className='w-full'>
                <Navbar />
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout