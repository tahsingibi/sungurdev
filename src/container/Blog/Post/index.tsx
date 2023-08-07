import React from 'react'
import Link from 'next/link';
import { getBlogPost } from "@/src/lib/fetch"
import { Heading } from '@/src/component/Elements';
import styles from './post.module.scss'
import clsx from '@/src/lib/clsx';
import { arrowTR, arrowL } from '@/src/lib/Icons';
import { clearedDate } from '@/src/lib/formatDate';

export default async function BlogPost({ params }: any) {

    const slug = params?.post[0];
    const post = await getBlogPost(slug);
    const detail = await post[0]
    const { date } = detail;

    if (!post) {
        return "Yazı bulunamadı"
    }

    return (
        <div className={styles.post}>
            <Heading>
                <Link href="/blog" className={styles.back}>{arrowL}Blog</Link>
                {detail?.yoast_head_json.title.replace(' - Tahsin Bey', '')}
                <span>{clearedDate(date)}</span>
            </Heading>
            <div className={clsx([styles.content])} dangerouslySetInnerHTML={{ __html: detail?.content?.rendered }} />
            <span className={styles.goBlog}>
                <Link href={detail.link + '#Comment'} target="_blank">yorum bırakın {arrowTR}</Link>
            </span>
        </div>
    )
}
