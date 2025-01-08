import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google'
import localFont from "next/font/local";
import Header from "./components/Header";
import "./styles/globals.css";


const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Alan Johnson | AMA",
    description: "Hire me!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Header />
                {children}
            </body>
            <GoogleAnalytics gaId="G-J8WPCMWEZK" />
        </html>
    );
}
