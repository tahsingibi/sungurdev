import { useMDXComponent } from "next-contentlayer/hooks";
import Codeblock from '../codeblock';
import { CopyButton } from "./copybutton";
import { formatDate } from "@/utils";
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
        <>
            <h1 className="mb-4">{title}</h1>
            <span className="text-sm text-zinc-500 mb-8">{formatDate(date)} {category && '– ' + category} </span>
            <Component components={components} />
        </>
    )
}