import { NavLink } from "./NavLink";
import { executeGraphQL } from "@/lib/graphql";
import { MenuGetBySlugDocument } from "@/gql/graphql";

export const NavLinks = async ({ channel }: { channel: string }) => {
  await executeGraphQL(MenuGetBySlugDocument, {
    variables: { slug: "navbar", channel },
    revalidate: 60 * 60 * 24,
  });

  return (
    <>
      <NavLink href="/categories/phone">Phone</NavLink>
      <NavLink href="/categories/laptop">Laptop</NavLink>
      <NavLink href="/categories/tablet">Tablet</NavLink>

      <NavLink href="/collections/featured-products">Featured Products</NavLink>
      <NavLink href="/collections/suggested-products">Suggested Products</NavLink>
    </>
  );
};
