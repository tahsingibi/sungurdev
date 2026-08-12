import { NAV_LINK_CLASSNAME } from "@/components/custom/layout/header/nav";
import settings from "@/lib/settings";
import Link from "next/link";
import { NotFoundTerminal } from "./terminal";

export default function NotFoundView() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center gap-8 p-6 py-20 sm:py-28">
      <div className="w-full max-w-md text-left">
        <NotFoundTerminal />
      </div>

      <nav className="flex flex-wrap items-center justify-center gap-4">
        {settings.nav.map((item) => (
          <Link key={item.id} href={item.path} className={NAV_LINK_CLASSNAME}>
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
