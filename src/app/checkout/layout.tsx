import { type ReactNode } from "react";
import { AuthProvider } from "@/ui/components/AuthProvider";

export const metadata = {
  title: "eBuy Storefront",
  description: "Digital devices selling website.",
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <main>
      <AuthProvider>{props.children}</AuthProvider>
    </main>
  );
}
