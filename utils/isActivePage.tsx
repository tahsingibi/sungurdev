import { usePathname } from "next/navigation";

export default function IsActivePage(href: string) {
    const pathname = usePathname();
    let isActive = false
    if (pathname?.length > 0) {
        const splittedPathname = pathname.split('/')
        const currentPathname = splittedPathname[1] ?? ''
        isActive = currentPathname === href.split('/')[1]
    }

    return isActive
}