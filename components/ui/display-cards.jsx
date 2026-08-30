import { useState } from "react";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

export function DisplayCard({
  className,
  icon = <Quote className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
}) {
  return (
    <div
      className={cn(
        "relative flex h-auto min-h-[12rem] w-[22rem] md:w-[28rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 border-white/10 bg-[#111]/80 backdrop-blur-sm px-6 py-5 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-[var(--color-bg)] after:to-transparent after:content-[''] hover:border-white/20 hover:bg-[#1a1a1a] [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-white/5 p-2">
          {icon}
        </span>
        <p className={cn("text-lg font-medium text-white", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-normal text-sm md:text-base text-white/70 my-4 relative z-10">{description}</p>
      <p className="text-xs text-white/40">{date}</p>
    </div>
  );
}

export default function DisplayCards({ cards }) {
  const displayCards = cards || [];
  const [activeCard, setActiveCard] = useState(displayCards.length - 1);

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 transition-all duration-700 w-full max-w-[100vw] overflow-x-hidden md:overflow-visible py-20 pr-10">
      {displayCards.map((cardProps, index) => {
        const isActive = activeCard === index;
        
        // Exact original translation logic (but dynamic for N cards)
        const translateX = index * 64; // translate-x-16 is 4rem (64px)
        const translateY = index * 40; // translate-y-10 is 2.5rem (40px)
        
        // Active card pops up slightly
        const currentTranslateY = isActive ? translateY - 40 : translateY;
        
        const style = {
          transform: `translate(${translateX}px, ${currentTranslateY}px)`,
          zIndex: isActive ? 100 : index,
        };

        const overlayClass = isActive 
          ? "grayscale-0" 
          : "grayscale-[100%] before:absolute before:inset-0 before:rounded-xl before:bg-[var(--color-bg)]/50 hover:before:opacity-0 before:transition-opacity before:duration-700 before:z-10";

        return (
          <div 
            key={index} 
            className={`[grid-area:stack] transition-all duration-700 ease-out cursor-pointer ${overlayClass}`}
            style={style}
            onClick={() => setActiveCard(index)}
          >
            <DisplayCard {...cardProps} />
          </div>
        );
      })}
    </div>
  );
}
