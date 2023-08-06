import { ReactNode } from 'react'
import MainTemplate from '@/src/template/main'

export default function AppTemplate({ children }: { children: ReactNode }) {
    return (
        <MainTemplate>
            {children}
        </MainTemplate>
    )
}