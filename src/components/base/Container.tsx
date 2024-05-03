import { cn } from "@/app/utils/cn";
import { HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export default function Container({
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <div className={cn("container mx-auto px-4", className)} {...rest}>
      {children}
    </div>
  );
}
