import { ImageResponse } from "next/og";
import { getDish } from "../dishes";
import { formatETB } from "../../../lib/format";

// One 1200x630 card per dish, drawn on the server. ImageResponse supports only a subset of CSS:
// flexbox and basic properties (no grid), every div with several children needs display:flex,
// and failures are silent: open /menu/kitfo/opengraph-image in the browser to check the result.
export const alt = "Addis Eats dish preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export { generateStaticParams } from "./page"; // every dish's card is built at build time too

export default async function Image({ params }) {
  const { id } = await params;
  const dish = await getDish(id);
  const name = dish?.name ?? "Addis Eats";
  const line = dish ? `${formatETB(dish.price)} · ${dish.category}` : "Food delivery in Addis Ababa";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", alignItems: "center",
          padding: "0 90px", background: "#78350f", color: "#fef3c7",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 40 }}>
          <div style={{ display: "flex", fontSize: 38, color: "#fcd34d" }}>Addis Eats</div>
          <div style={{ display: "flex", fontSize: name.length > 12 ? 96 : 124, fontWeight: 700, marginTop: 24, lineHeight: 1.05 }}>
            {name}
          </div>
          <div style={{ display: "flex", fontSize: 48, marginTop: 28 }}>{line}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 380, height: 380, borderRadius: 190, background: "#fffbeb" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 290, height: 290, borderRadius: 145, background: "#e7d3b0" }}>
            <div style={{ display: "flex", width: 140, height: 140, borderRadius: 70, background: "#b91c1c" }} />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
