import { cva, type VariantProps } from "class-variance-authority";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a3465d] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#8b3049] text-white shadow-[0_0_30px_rgba(132,43,67,0.24)] hover:bg-[#a3465d]",
        outline:
          "border border-white/15 bg-white/[0.035] text-white hover:border-white/30 hover:bg-white/[0.08]",
        ghost: "text-white/70 hover:bg-white/[0.07] hover:text-white",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-9 px-4 text-xs",
        icon: "size-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonVariants>;

export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
