import { fontVariables } from '../assets/fonts/geist';
import Footer from '../components/footer';
import Sidebar from '../components/sidebar';
import { layoutMetadata } from '../metadata';
import './globals.css';

export const metadata = layoutMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body className={fontVariables}>
        <section className="grid sm:grid-cols-12 container gap-12 py-10 max-sm:pt-28">
          <Sidebar />
          <main className="flex flex-col gap-12 relative z-10 sm:col-span-8">
            {children}
          </main>
        </section>
        <Footer />
      </body>
    </html>
  );
}
