import { usePathname } from 'next/navigation'

const NavbarRoutes = () => {
    const pathname = usePathname();

  return (
    <div>NavbarRoutes</div>
  )
}

export default NavbarRoutes