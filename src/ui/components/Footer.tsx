import Link from "next/link";
import Image from "next/image";
import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ChannelSelect } from "./ChannelSelect";
import { ChannelsListDocument, MenuGetBySlugDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";

export async function Footer({ channel }: { channel: string }) {
  await executeGraphQL(MenuGetBySlugDocument, {
    variables: { slug: "footer", channel },
    revalidate: 60 * 60 * 24,
  });
  const channels = process.env.SALEOR_APP_TOKEN
    ? await executeGraphQL(ChannelsListDocument, {
      withAuth: false, // disable cookie-based auth for this call
      headers: {
        // and use app token instead
        Authorization: `Bearer ${process.env.SALEOR_APP_TOKEN}`,
      },
    })
    : null;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-neutral-300 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-3 gap-8 py-16">
          <div>
            <h3 className="text-sm font-semibold text-neutral-900">Pages</h3>
            <ul className="mt-4 space-y-4 [&>li]:text-neutral-500">
              <li className="text-sm">
                <LinkWithChannel href={'/pages/about'}>
                  {'About'}
                </LinkWithChannel>
              </li>
              <li className="text-sm">
                <LinkWithChannel href={'/pages/developers'}>
                  {'Developers'}
                </LinkWithChannel>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-900">Collections</h3>
            <ul className="mt-4 space-y-4 [&>li]:text-neutral-500">
              <li className="text-sm">
                <LinkWithChannel href={'/collections/featured-products'}>
                  {'Featured products'}
                </LinkWithChannel>
              </li>
              <li className="text-sm">
                <LinkWithChannel href={'/collections/suggested-products'}>
                  {'Suggested products'}
                </LinkWithChannel>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-900">Categories</h3>
            <ul className="mt-4 space-y-4 [&>li]:text-neutral-500">
              <li className="text-sm">
                <LinkWithChannel href={'/categories/phone'}>
                  {'Phone'}
                </LinkWithChannel>
              </li>
              <li className="text-sm">
                <LinkWithChannel href={'/categories/laptop'}>
                  {'Laptop'}
                </LinkWithChannel>
              </li>
              <li className="text-sm">
                <LinkWithChannel href={'/categories/tablet'}>
                  {'Tablet'}
                </LinkWithChannel>
              </li>
            </ul>
          </div>
        </div>

        {channels?.channels && (
          <div className="mb-4 text-neutral-500">
            <label>
              <span className="text-sm">Change currency:</span> <ChannelSelect channels={channels.channels} />
            </label>
          </div>
        )}

        <div className="flex flex-col justify-between border-t border-neutral-200 py-10 sm:flex-row">
          <p className="text-sm text-neutral-500">Copyright &copy; {currentYear} <i className="font-bold not-italic">eBuy</i>, Inc.</p>
          <p className="flex gap-1 text-sm text-neutral-500">
            Customed from Saleor by{" "}
            <Link className="font-bold" target={"_blank"} href={"https://saleor.io/"}>
              Bucky
            </Link>{" "}
            <Link href={"https://github.com/Aaron-24DucAnh24/eBuy-storefront"} target={"_blank"} className={"opacity-30"}>
              <Image alt="eBuy github repository" height={20} width={20} src={"/github-mark.svg"} />
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
