"use client";

import { CodeBlock } from "@/components/custom/code-block";
import settings from "@/lib/settings";
import { usePathname } from "next/navigation";

export function NotFoundTerminal() {
  const pathname = usePathname();
  const origin = settings.url.replace(/\/$/, "");
  const code = `$ curl -i ${origin}${pathname}

HTTP/1.1 404 Not Found
content-type: application/json

{
  "error": "not_found",
  "message": "Page not found."
}`;

  return <CodeBlock filename="404.sh" language="bash" code={code} />;
}
