import { publicEnv } from "./publicEnv";

export const SITE_NAME = "Addis Eats";
export const DEFAULT_TITLE = "Addis Eats — food delivery in Addis Ababa";
export const DEFAULT_DESCRIPTION = "Order Ethiopian food from Addis kitchens, delivered across Addis Ababa.";

// Version in the file name: chat apps cache previews for days, so a new design needs a new name.
const DEFAULT_OG_IMAGE = {
  url: "/og/default-v1.jpg", // resolved against metadataBase -> absolute in the page source
  width: 1200,
  height: 630,
  alt: "Addis Eats: Ethiopian food, delivered across Addis Ababa",
};

export const absoluteUrl = (path) => new URL(path, publicEnv.siteUrl).href;

// One helper so every page sets the same four social tags (title, description, image, url) the same way.
//
// Why not just `export const metadata = { openGraph: {...} }` on each page? A page's `openGraph` object
// REPLACES the layout's openGraph object entirely, so siteName/locale/type would silently vanish.
// And `title.template` is not applied to openGraph.title, so we add the site name ourselves.
//
// defaultImage: false -> leave `images` out so a colocated opengraph-image file (the per-dish card) supplies it.
export function buildMetadata({ title, description, path, defaultImage = true }) {
  return {
    ...(title ? { title } : {}), // no title -> the layout's default title
    description,
    alternates: { canonical: path }, // resolved against metadataBase
    openGraph: {
      title: title ? `${title} · ${SITE_NAME}` : DEFAULT_TITLE,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_ET",
      type: "website",
      ...(defaultImage ? { images: [DEFAULT_OG_IMAGE] } : {}),
    },
  };
}
