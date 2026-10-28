// A plain <a download>, on purpose: the target is a file download from an API route, not a page, so next/link
// (client-side navigation) would be wrong. The session cookie goes with it automatically.
export default function ExportCsvLink({ href, children = "Export CSV" }) {
  return (
    <a href={href} download className="inline-block rounded border bg-white px-3 py-1 text-sm underline">
      {children}
    </a>
  );
}
