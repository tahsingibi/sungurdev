import React from 'react'
import Link from 'next/link';
import { Heading } from '@/component/Elements';
import styles from '../post.module.scss'

import { clsx, arrowTR } from '@/utils';

export default async function BlogPost({ post }: any) {

    if (!post.success) {
        return (
            <>
                <Heading>404 - Sayfa bulunamadı.</Heading>
                <p>Böyle bir sayfa mevcut değil.</p>
            </>
        )
    }

    const { data } = post;
    const { date, title, content, link } = data;

    return (
        <>
            <div className={styles.post}>
                <Heading>{title}<span>{date}</span></Heading>

                <div className={clsx([styles.content])} dangerouslySetInnerHTML={{ __html: content }} />

                <span className={styles.goBlog}>
                    <Link href={link + '#Comment'} target="_blank">yorum bırakın {arrowTR}</Link>
                </span>

            </div>
        </>
    )
}
