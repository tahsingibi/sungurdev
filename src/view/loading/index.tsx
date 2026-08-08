export default function LoadingView() {
  return (
    <div className="flex flex-col gap-3 px-6 py-16 sm:px-10">
      <div className="inline-flex h-10 w-60 animate-pulse bg-muted" />
      <div className="inline-flex h-4 w-full animate-pulse bg-muted" />
    </div>
  );
}
