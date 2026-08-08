import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Logo({ className = "", href = "/", ...props }) {
  return (
    <Link
      href="/"
      className={cn("font-pixel font-medium antialiased", className)}
      {...props}
    >
      sungur
      <span className="opacity-50">.dev</span>
    </Link>
  );
}
