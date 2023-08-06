import React from 'react'
import Link from 'next/link';
import { getBlogPost } from "@/src/lib/fetch"
import { Heading } from '@/src/component/Elements';
import styles from './post.module.scss'
import clsx from '@/src/lib/clsx';

export default async function BlogPost({ params }: any) {

    const slug = params?.post[0];
    const post = await getBlogPost(slug);
    const detail = await post[0]

    if (!post) {
        return "Yazı bulunamadı"
    }

    return (
        <div className={styles.post}>
            <Heading>{detail?.yoast_head_json.title.replace(' - Tahsin Bey', '')}</Heading>
            <div className={clsx(['paragraph'])} dangerouslySetInnerHTML={{ __html: detail?.content?.rendered }} />
            <span className={styles.goBlog}>
                <Link href={detail.link} target="_blank">TahsinBey&apos;de Okuyun</Link>
            </span>
        </div>
    )
}
