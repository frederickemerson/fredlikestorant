import "~/styles/globals.css";
import "@uploadthing/react/styles.css";
import { dark } from '@clerk/themes';

import { ClerkProvider } from '@clerk/nextjs'
import { TopNav } from "./_components/TopNav";
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



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
    appearance={{
      baseTheme: dark
    }}>

    <html lang="en">
      <body className={`font-sans ${inter.variable} flex flex-col gap-4`}>
        <TopNav />
        {children}
        </body>
    </html>

    </ClerkProvider>
  );
}
