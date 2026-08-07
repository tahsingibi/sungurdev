export default function LoadingView() {
  return (
    <div className="flex flex-col  gap-2 border-b border-zinc-900 pb-12">
      <div className="text-4xl text-white h-[1em] bg-zinc-900 animate-pulse inline-flex w-60 rounded-sm" />
      <div className="text-zinc-500 h-[1em] bg-zinc-900 animate-pulse inline-flex w-full rounded-sm" />
    </div>
  );
}
