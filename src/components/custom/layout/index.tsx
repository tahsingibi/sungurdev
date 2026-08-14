import React from "react";
import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative mx-auto flex min-h-screen w-[calc(100%-1rem)] max-w-3xl flex-col border-x border-border">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
