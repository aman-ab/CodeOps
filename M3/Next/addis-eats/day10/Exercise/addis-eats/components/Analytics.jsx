import Script from "next/script";
import { publicEnv } from "../lib/publicEnv";

// Third-party tags are bytes, a connection and a privacy decision. This one:
//  - only exists if NEXT_PUBLIC_ANALYTICS_SRC is set (the URL is public by nature),
//  - lazyOnload: waits for idle time, after the page is usable.
export default function Analytics() {
  if (!publicEnv.analyticsSrc) return null;
  return <Script src={publicEnv.analyticsSrc} strategy="lazyOnload" />;
}
