import Link from 'next/link';
import styles from './style.module.scss';
import { github, instagram, linkedin, twitter } from '@/utils';
import { ReactElement } from 'react';

const _link = [
  { path: 'https://x.com/tahsingibi', name: 'Twitter', icon: twitter },
  { path: 'https://github.com/tahsingibi', name: 'Github', icon: github },
  {
    path: 'https://linkedin.com/in/tahsin-sungur',
    name: 'Linkedin',
    icon: linkedin,
  },
  {
    path: 'https://instagram.com/tahsingibi',
    name: 'Instagram',
    icon: instagram,
  },
];

function Item({ path, name, icon }: { path: string, name: string, icon: ReactElement }) {
  return (
    <li>
      <Link href={path} target='_blank'>
        {icon} {name}
      </Link>
    </li>
  );
}

export default function Socialbar() {
  return (
    <ul className={styles.socialbar}>
      {_link.map(({ path, name, icon }) => (
        <Item key={path} path={path} name={name} icon={icon} />
      ))}
    </ul>
  );
}
