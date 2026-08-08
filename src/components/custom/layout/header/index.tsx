import Logo from "../../logo";
import Nav from "./nav";
export default function Header() {
  return (
    <div className="relative px-6 pt-6">
      <header className="flex justify-between items-center">
        <Logo />
        <Nav />
      </header>
      <div className="mt-6 divider-screen" aria-hidden="true" />
    </div>
  );
}
