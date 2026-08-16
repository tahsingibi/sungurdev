import Logo from "../../logo";
import { CommandHint } from "./command-hint";
import Nav from "./nav";
export default function Header() {
  return (
    <div className="sticky top-0 z-40 border-b border-border/60 bg-background/80 px-6 py-6 backdrop-blur-md">
      <header className="flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-4">
          <Nav />
          <CommandHint />
        </div>
      </header>
    </div>
  );
}
