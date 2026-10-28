"use client";
import { useEffect, useState } from "react";
import { relative } from "../../../lib/format";

// "12 minutes ago" depends on the CURRENT time. Rendered on the server it would already be wrong by the time the
// browser hydrates, and React would report a mismatch. So: render nothing on the server, fill it in after mount.
export default function RelativeTime({ iso, prefix = "" }) {
  const [text, setText] = useState("");
  useEffect(() => {
    const update = () => setText(relative(iso));
    update();
    const timer = setInterval(update, 15_000);
    return () => clearInterval(timer);
  }, [iso]);
  return <time dateTime={iso}>{text ? `${prefix}${text}` : ""}</time>;
}
