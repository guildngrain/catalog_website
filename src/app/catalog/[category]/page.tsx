import { redirect } from "next/navigation";

const CATEGORY_REDIRECTS: Record<string, string> = {
  "new-arrivals": "/catalog?new=1",
  "best-sellers": "/catalog?featured=1",
  "mens-leather-jackets": "/catalog?gender=men",
  "womens-leather-jackets": "/catalog?gender=women",
  "gift-for-him": "/catalog?gender=men",
  "mens-biker-jackets": "/catalog?gender=men&type=Classic%20Biker",
  "womens-biker-jackets": "/catalog?gender=women&type=Classic%20Biker",
  "mens-cowboys-jackets": "/catalog?type=Cowboy%20Jacket",
};

type LegacyCategoryPageProps = {
  params: Promise<{ category: string }>;
};

/** Old category URLs redirect into the filterable catalog. */
export default async function LegacyCategoryRedirect({
  params,
}: LegacyCategoryPageProps) {
  const { category } = await params;
  redirect(CATEGORY_REDIRECTS[category] ?? "/catalog");
}
