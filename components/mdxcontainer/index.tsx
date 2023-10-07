import { useMDXComponent } from "next-contentlayer/hooks";
import Codeblock from '../codeblock';
import { CopyButton } from "./copybutton";
import formatDate from "@/utils/formatdate";
import styles from './style.module.scss'

export const Pre = ({ children, raw, ...props }: any) => {
    const lang = props["data-language"] || "shell";
    return (
        <Codeblock {...props}>
            <CopyButton text={raw} />
            {children}
        </Codeblock>
    );
};


const components = {
    pre: Pre,
};


export default function MDXContainer({ post }: any) {

    const { body, title, date, category } = post

    const Component = useMDXComponent(body.code);

    return (
        <div className="container">
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.info}>{category && category + ' •'} {formatDate(date)}</div>
            <Component components={components} />
        </div>
    )
}