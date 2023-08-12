import React from 'react'
import styles from './elements.module.scss'
import { getBlogPost, formatDate } from '@/utils';
import { Links } from '.';

export default async function BlogList() {

    const posts = await getBlogPost();

    if (!posts) {
        return <div className={styles.notItem}>Listelenecek blog yazısı bulunamadı.</div>
    }

    return (
        <div className={styles.blogList}>
            {posts?.map(({ yoast_head_json, id, date, slug }: any) => (

                <Links href={`/blog/${slug}`} key={id}>
                    <span className={styles.title}>{yoast_head_json.title.replace(' - Tahsin Bey', '')}</span>
                    <span className={styles.date}>{formatDate(date)}</span>
                </Links>

            ))}
        </div>
    )
}
