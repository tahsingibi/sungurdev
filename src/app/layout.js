import 'remixicon/fonts/remixicon.css';
import { fontVariables } from '../assets/fonts';
import Footer from '../components/footer';
import Header from '../components/header';
import { layoutMetadata } from '../metadata';
import './globals.css';

export const metadata = layoutMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={fontVariables}>
        <section className="container flex flex-col gap-12 relative z-10 min-h-screen">
          <Header />
          <main className="flex flex-col gap-12">{children}</main>
          <Footer />
        </section>
      </body>
    </html>
  );
}
