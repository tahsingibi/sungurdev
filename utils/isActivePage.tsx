import { usePathname, useSelectedLayoutSegment } from 'next/navigation'


export default function IsActivePage(href: string, targetSegment?: string | null) {
    const path = usePathname()
    const segment = useSelectedLayoutSegment();

    return path.startsWith(href) && segment == targetSegment

}