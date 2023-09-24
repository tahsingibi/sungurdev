import { useMDXComponent } from "next-contentlayer/hooks";
import Codeblock from '../codeblock';
import { CopyButton } from "./copybutton";
import formatDate from "@/utils/formatdate";

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
            <h1>{title}</h1>
            <p>{formatDate(date)}</p>
            <p>{category}</p>
            <Component components={components} />
        </div>
    )
}