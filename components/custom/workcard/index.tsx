import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './style.module.scss'

type WorkCardType = {
    image?: string,
    path: string,
    name: string,
    title?: string,
    right?: string
}

function GenerateAvatar({ image, text }: Readonly<{ image?: string, text: string }>) {
    return (
        <figure className={styles.image}>
            {image && <Image src={image} alt={text} width={100} height={100} />}
            {!image && <span>{text.slice(0, 2)}</span>}
        </figure>)
}

function WithLink({ image, path, name, title, right }: Readonly<WorkCardType>) {

    const target = path?.startsWith('http') ? '_blank' : '_self'

    return (
        <Link href={path} className={styles.item} target={target}>
            <GenerateAvatar image={image} text={name} />
            <div className={styles.content}>
                <h5>{name}</h5>
                <p>
                    <span>{title}</span>
                    <span>{right}</span>
                </p>
            </div>
        </Link>
    );
}

function WithDiv({ image, name, title, right }: Readonly<WorkCardType>) {
    return (
        <div className={styles.item}>
            <GenerateAvatar image={image} text={name} />
            <div className={styles.content}>
                <h5>{name}</h5>
                <p>
                    <span>{title}</span>
                    <span>{right}</span>
                </p>
            </div>
        </div>
    )
}

export default function WorkCard(props: Readonly<WorkCardType>) {
    const Element = props.path ? WithLink : WithDiv;

    return <Element {...props} />
}
