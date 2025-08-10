import { fontVariables } from '../assets/fonts';
import Footer from '../components/footer';
import Header from '../components/header';
import { layoutMetadata } from '../metadata';
import './globals.css';

export const metadata = layoutMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"
        />
      </head>
      <body className={fontVariables}>
        <section className="container flex flex-col gap-12 relative z-10">
          <Header />
          <main className="flex flex-col gap-12">{children}</main>
          <Footer />
        </section>
      </body>
    </html>
  );
}
