export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="container text-zinc-600 pb-8 px-0!">
      sungur.dev &copy; {year}
    </div>
  );
}
