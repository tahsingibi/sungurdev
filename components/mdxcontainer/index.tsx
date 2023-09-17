import { useMDXComponent } from "next-contentlayer/hooks";
import Codeblock from '../codeblock';
import { CopyButton } from "./copybutton";

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

    const { body, title } = post

    const Component = useMDXComponent(body.code);

    return (
        <div className="container">
            <h1>{title}</h1>
            <Component components={components} />
        </div>
    )
}