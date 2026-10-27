const STATUS = {
  pending: { label: "Pending", style: "bg-gold-100 text-[#7a5a00]" },
  preparing: { label: "Preparing", style: "bg-brand-50 text-brand-700" },
  on_the_way: { label: "On the way", style: "bg-brand-100 text-brand-800" },
  completed: { label: "Completed", style: "bg-leaf-100 text-leaf-700" },
  cancelled: { label: "Cancelled", style: "bg-[#fdecea] text-[#8c1d18]" },
};

export default function StatusBadge({ status }) {
  const known = STATUS[status] ?? { label: status, style: "bg-ink-100 text-ink-600" };

  return <span className={`badge ${known.style}`}>{known.label}</span>;
}
