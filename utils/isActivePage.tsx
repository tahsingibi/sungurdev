import { usePathname, useSelectedLayoutSegment } from 'next/navigation'

export function IsActivePage(href: string, targetSegment?: string | null) {
    const path = usePathname()
    const segment = useSelectedLayoutSegment();

    return path == (href)

}