"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({
  text,
  className,
  onClick,
  size,
  variant,
  ...props
}: {
  text?: string;
  className?: string;
  onClick?: () => void;
  size?: VariantProps<typeof buttonVariants>["size"];
  variant?: VariantProps<typeof buttonVariants>["variant"];
}) {
  const { back } = useRouter();
  const handleBack = () => (onClick ? onClick() : back());
  const buttonSize = size || (!!text ? size || "default" : "icon");
  const buttonVariant = variant || "outline";
  return (
    <Button
      onClick={handleBack}
      size={buttonSize}
      className={cn(className)}
      variant={buttonVariant}
      {...props}
    >
      <ArrowLeft />
      {text}
    </Button>
  );
}
