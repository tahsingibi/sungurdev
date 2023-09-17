import styles from './style.module.scss';
import { home, sunglasses, quote, braces } from '@/utils';
import Links from './navlink';

const _page = [
  { href: '/', icon: home, name: 'Anasayfa' },
  { href: '/about', icon: sunglasses, name: 'Hakkımda' },
  { href: '/blog', icon: quote, name: 'Blog' },
  { href: '/project', icon: braces, name: 'Çalışmalar' },
  { href: '/bookmarks', icon: braces, name: 'Bookmarks' },
];

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      {_page.map(({ href, icon, name }) => (
        <Links href={href} key={href} >
          {icon}
          {name}
        </Links>
      ))}
    </nav>
  );
}
