import { ReactNode } from "react";
import styles from './style.module.scss';
import { clsx } from "@/utils";
import Blog from "@/container/blog";


export default function SidepageLayout({ children }: { children: ReactNode }) {

    return (
        <main className={clsx([styles.main])}>
            <Blog inPost={!!children} />
            {children}
        </main>
    )
}
