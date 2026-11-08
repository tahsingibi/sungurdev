export function PostMeta({ date, category }: { date: string; category: string }) {
  const parsedDate = new Date(date);
  const formattedDate = Number.isNaN(parsedDate.getTime())
    ? date
    : new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(parsedDate);

  return (
    <span className="post-meta">
      <time dateTime={date}>{formattedDate}</time>
      <span className="post-category">{category}</span>
    </span>
  );
}
