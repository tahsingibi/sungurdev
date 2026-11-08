import Link from "next/link";
import { ThemeToggle } from "@/components/custom/theme-provider/theme-toggle";
import settings from "@/lib/settings";
import Nav from "./nav";

export default function Header() {
  return (
    <header className="reference-header">
      <Link href="/" aria-label="Tahsin Sungur — home">
        <h1>{settings.name}</h1>
        <span>{settings.title}</span>
      </Link>
      <div className="header-controls">
        <Nav items={settings.nav} />
        <ThemeToggle />
      </div>
    </header>
  );
}
