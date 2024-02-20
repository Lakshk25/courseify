"use client";
import { Layout, Compass } from 'lucide-react'
import { usePathname } from 'next/navigation'
import SidebarItems from './sidebar-items'


const UserRoutes = [
    {
        label: "Dashboard",
        icon: Layout,
        href: "/"
    },
    {
        label: "Browse",
        icon: Compass,
        href: "/search"
    },

]

const TeacherRoutes = [
    {
        label: "Courses",
        icon: Layout,
        href: "/"
    },
    {
        label: "Analytics",
        icon: Compass,
        href: "/teacher/analytics"
    },

]
const SidebarRoutes = () => {
    const pathname = usePathname();
    const routes = pathname.includes("teacher") ? TeacherRoutes : UserRoutes;
    return (
        <div className='flex flex-col w-full'>
            <div className="">
                {
                    routes.map((route) => (
                        <SidebarItems
                            key={route.href}
                            icon={route.icon}
                            label={route.label}
                            href={route.href}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default SidebarRoutes