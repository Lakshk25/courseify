import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation";

interface SidebarItemsProps {
    icon: LucideIcon,
    label: string,
    href: string
}
const SidebarItems = (
    {
        href,
        icon: Icon,
        label
    }: SidebarItemsProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const isActive = (pathname === "/" && href === "/") || (pathname === href);

    const onClick = () => {
        router.push(href);
    }
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn("flex flex-col justify-center items-center w-full text-gray-500 font-medium px-10",
                isActive && "text-sky-700 hover:text-sky-800 border-r-4 bg-sky-100 border-sky-700")}
        >
            <div className="w-full flex items-center gap-x-2 py-4">
                <Icon />
                {label}
            </div>
        </button>
    )
}

export default SidebarItems