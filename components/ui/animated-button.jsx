import React from "react";
import { cn } from "@/lib/utils";

export const AnimatedButton = React.forwardRef(
  ({ children, className, innerClassName, onClick, asChild = false, ...props }, ref) => {
    const Comp = asChild ? "div" : "button";

    return (
      <Comp
        ref={ref}
        onClick={onClick}
        className={cn(
          "relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none group bg-theme-border/50",
          className
        )}
        {...props}
      >
        <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_85%,#3b82f6_100%)] group-hover:bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,#3b82f6_100%)] transition-colors duration-300 z-0" />
        
        <span className={cn(
          "relative z-10 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-bg text-fg px-6 py-2 transition-colors duration-300 group-hover:bg-bg-alt",
          innerClassName
        )}>
          {children}
        </span>
      </Comp>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";
