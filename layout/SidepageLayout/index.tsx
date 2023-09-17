import { ReactNode } from "react";
import styles from './style.module.scss';
import { clsx } from "@/utils";


export default function SidepageLayout({ children }: { children: ReactNode }) {

    return (
        <main className={clsx([styles.main])}>
            {children}
        </main>
    )
}
