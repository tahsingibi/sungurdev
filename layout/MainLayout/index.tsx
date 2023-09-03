import { ReactNode } from "react";
import Sidebar from "@/components/sidebar"
import styles from './style.module.scss';
import { Inter } from "next/font/google"
import { clsx } from "@/utils";
import MobileNav from "@/components/mobilenav";

const font = Inter({ subsets: ['latin'] })

export default function MainLayout({ children }: { children: ReactNode }) {

    return (
        <main className={clsx([styles.main, font.className])}>
            <Sidebar />
            <MobileNav />
            <div className={styles.container}>
                {children}
            </div>
        </main>
    )
}
