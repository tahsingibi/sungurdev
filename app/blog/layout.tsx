import BlogLayout from '@/layout/blog'
import { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
    return <BlogLayout>{children}</BlogLayout>
}
