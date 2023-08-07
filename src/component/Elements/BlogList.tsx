import React from 'react'
import Link from 'next/link';
import styles from './elements.module.scss'
import { getBlogPost } from '@/src/lib/fetch'
import { clearedDate } from '@/src/lib/formatDate';

export default async function BlogList() {

    const posts = await getBlogPost();

    if (!posts) {
        return "Listelenecek blog bulunamadı."
    }

    return (
        <div className={styles.blogList}>
            {posts?.map(({ yoast_head_json, id, date, slug }: any) => (

                <Link href={`/blog/${slug}`} key={id}>
                    <span className={styles.title}>{yoast_head_json.title.replace(' - Tahsin Bey', '')}</span>
                    <span className={styles.date}>{clearedDate(date)}</span>
                </Link>

            ))}
        </div>
    )
}
