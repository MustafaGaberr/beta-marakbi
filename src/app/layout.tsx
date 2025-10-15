import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

//   src: [
//     {
//       path: "../../public/fonts/poppins/Poppins-Thin.ttf",
//       weight: "100",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/poppins/Poppins-ExtraLight.ttf",
//       weight: "200",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/poppins/Poppins-Light.ttf",
//       weight: "300",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/poppins/Poppins-Regular.ttf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/poppins/Poppins-Medium.ttf",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/poppins/Poppins-SemiBold.ttf",
//       weight: "600",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/poppins/Poppins-Bold.ttf",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/poppins/Poppins-ExtraBold.ttf",
//       weight: "800",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/poppins/Poppins-Black.ttf",
//       weight: "900",
//       style: "normal",
//     },
//   ],
//   variable: "--font-poppins",
// });

export const metadata: Metadata = {
  title: {
    default: "Marakbi | Explore Egypt’s Hidden Gems",
    template: "%s | Marakbi",
  },
  description: "Discover the best locations, trips, and adventures in Egypt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>{children}</body>
    </html>
  );
}
