import { ReactNode } from 'react';
import styles from './elements.module.scss';

export function Heading({ children }: { children: ReactNode }) {
    return <h2 className={styles.title}>{children}</h2>
}