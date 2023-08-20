import { ReactNode } from "react";
import styles from './main.module.scss';
import { Sidebar } from "@/components";

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <main className={styles.main}>
            <Sidebar />
            {children}
        </main>
    )
}
