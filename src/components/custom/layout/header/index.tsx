import { CommandHint } from "./command-hint";
import Nav from "./nav";

/**
 * Başlık — yalnızca gezinme.
 *
 * Sabitlenmiyor ve zemini yok: kolon zaten dar, üç bağlantı sayfayla birlikte
 * kayıp gidiyor. Logo da kalktı; adın kendisi hemen altında, banner'ın
 * içinde ve künye satırında zaten iki kez geçiyordu.
 */
export default function Header() {
  return (
    <header className="mt-8 flex items-center justify-between gap-4">
      <Nav />
      <CommandHint />
    </header>
  );
}
