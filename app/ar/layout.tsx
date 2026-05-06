import type { Metadata } from "next";
import { TubelightNavbar } from "@/components/ui/tubelight-navbar";
import { FooterAr } from "@/components/ui/footer-section-ar";
import { ChatBot } from "@/components/ChatBot";

export const metadata: Metadata = {
  title: "بنيان مصر - التميز في البناء والتصميم",
  description: "شركة رائدة في البناء والتصميم الداخلي والتشطيبات في مصر",
};

export default function ArLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TubelightNavbar />
      <main className="flex-grow pb-24 md:pb-0">{children}</main>
      <FooterAr />
      <ChatBot />
    </>
  );
}
