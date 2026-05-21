import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "./context/LangContext";

export const metadata: Metadata = {
  metadataBase: new URL('https://amusyentertainment.com'),
  title: { default:"Amusy Entertainment — Japanese Claw Machine Placement", template:"%s | Amusy Entertainment" },
  description:"We partner with businesses by transforming their empty spaces with fun & lively claw machine setups. Zero cost to you.",
  keywords:["claw machine placement","Japanese claw machine","store revenue","passive income retail","branded prizes","Seattle entertainment","Washington state","amusy"],
  robots:{ index:true, follow:true },
  openGraph:{ type:"website", url:"https://amusyentertainment.com", siteName:"Amusy Entertainment", title:"Amusy Entertainment", description:"Entertainment & new revenue stream that costs your store $0.", images:[{ url:"/images/machine-stackable.png" }] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
