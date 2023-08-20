import { ReactNode } from 'react'
import styles from './page.module.scss'
import { clsx } from '@/utils'
import Image, { StaticImageData } from 'next/image';

export function PageWrapper({ children }: { children: ReactNode }) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

interface TitleProps {
    as?: keyof JSX.IntrinsicElements;
    customClass?: string[];
    children: React.ReactNode;
}

function Title({ as: Element = 'h2', customClass = [''], children }: TitleProps) {
    return <Element className={clsx([styles.title, ...customClass])}>{children}</Element>;
}

interface DescriptionProps {
    as?: keyof JSX.IntrinsicElements;
    customClass?: string[];
    children: React.ReactNode;
}

function Description({ as: Element = 'p', customClass = [''], children }: DescriptionProps) {
    return <Element className={clsx([styles.description, ...customClass])}>{children}</Element>
}

interface HeadlineProps {
    as?: keyof JSX.IntrinsicElements;
    customClass?: string[];
    children: React.ReactNode;
}

function Headline({ as: Element = 'div', customClass = [''], children }: HeadlineProps) {
    return <Element className={clsx([styles.headline, ...customClass])}>{children}</Element>
}

interface CoverImageProps {
    customClass?: string[];
    alt?: string;
    src: string | StaticImageData;
}

function CoverImage({ customClass = [''], src = '', alt = '', ...props }: CoverImageProps) {
    return (
        <figure className={clsx([styles.image, ...customClass])}>
            <Image alt={alt} src={src} {...props} fill />
        </figure>
    )
}

PageWrapper.Title = Title;
PageWrapper.Description = Description;
PageWrapper.Headline = Headline;
PageWrapper.CoverImage = CoverImage;