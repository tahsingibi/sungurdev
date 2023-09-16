import styles from './style.module.scss'

export default function Codeblock({ children, raw }: any) {

    return (
        <pre className={styles.codeblock}>
            {children}
        </pre>
    )
}
