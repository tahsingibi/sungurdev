import styles from './style.module.scss';
import { home, quote } from '@/utils';
import Links from './navlink';

const _page = [
  { href: '/', icon: home, name: 'Anasayfa', targetSegment: null },
  { href: '/blog', icon: quote, name: 'Blog', targetSegment: 'blog' },
];

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      {_page.map(({ href, icon, name, targetSegment }) => (
        <Links href={href} key={href} targetSegment={targetSegment} scroll={false} >
          {icon}
          {name}
        </Links>
      ))}
    </nav>
  );
}
