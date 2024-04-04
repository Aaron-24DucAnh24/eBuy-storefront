"use client";
import Link from "next/link";

const companyName = "eBuy";

export const Logo = () => {
  return (
    <Link
      className="flex items-center font-bold italic text-2xl"
      aria-label="homepage"
      href={"/default-channel/products"}>
      {companyName}
    </Link>
  );
};
