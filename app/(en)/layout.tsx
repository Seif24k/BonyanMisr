import { TubelightNavbar } from "@/components/ui/tubelight-navbar";
import { Footer } from "@/components/ui/footer-section";
import { ChatBot } from "@/components/ChatBot";

export default function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TubelightNavbar />
      <main className="flex-grow pb-[calc(7rem+env(safe-area-inset-bottom))] md:pb-0">{children}</main>
      <Footer />
      <ChatBot />
    </>
  );
}
