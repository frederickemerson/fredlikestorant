import "~/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Fred Likes To Rant",
  description: "8 days before my finals, instead of studying i procrastinated and decided to create a blog where i can talk about stuff",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

function TopNav() {
  return(
  <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
    <div>
      Fred Really Loves To Yap
    </div>

    <div>Sign In</div>
  </nav>);
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} flex flex-col gap-4`}>
        <TopNav />
        {children}
        </body>
    </html>
  );
}
