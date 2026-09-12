import { useState } from "react";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

export function DisplayCard({
  className,
  icon = <Quote className="size-4 text-[var(--color-accent)]" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  titleClassName = "text-white",
}) {
  return (
    <div
      className={cn(
        "relative flex h-auto min-h-[13rem] w-[20rem] sm:w-[22rem] md:w-[28rem] -skew-y-[6deg] select-none flex-col justify-between rounded-2xl border border-white/10 bg-[#0d1527]/90 backdrop-blur-md px-6 py-5 transition-all duration-500 shadow-2xl hover:border-white/20 hover:bg-[#111a30]",
        className
      )}
    >
      {/* Top Header: Icon + Title */}
      <div className="flex items-center gap-3">
        <span className="relative flex items-center justify-center rounded-xl bg-white/10 p-2.5 text-white shadow-inner">
          {icon}
        </span>
        <p className={cn("text-base md:text-lg font-semibold text-white tracking-tight leading-snug", titleClassName)}>
          {title}
        </p>
      </div>

      {/* Description text with proper line-height and typography */}
      <p className="whitespace-normal text-sm md:text-[15px] leading-relaxed text-zinc-300 my-4 relative z-10 font-normal">
        {description}
      </p>

      {/* Bottom Category/Service Tag */}
      <div className="flex items-center justify-between pt-2 border-t border-white/10">
        <span className="text-[11px] font-mono tracking-widest text-[var(--color-accent)] font-semibold uppercase">
          {date}
        </span>
      </div>
    </div>
  );
}

export default function DisplayCards({ cards }) {
  const displayCards = cards || [];
  const [activeCard, setActiveCard] = useState(displayCards.length - 1);

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 transition-all duration-700 w-full max-w-[100vw] overflow-x-hidden md:overflow-visible py-16 pr-4 md:pr-10">
      <style dangerouslySetInnerHTML={{__html: `
        .dc-card {
          --tx: 22px;
          --ty: 18px;
          --pop: 18px;
        }
        @media (min-width: 768px) {
          .dc-card {
            --tx: 56px;
            --ty: 36px;
            --pop: 36px;
          }
        }
      `}} />
      {displayCards.map((cardProps, index) => {
        const isActive = activeCard === index;
        
        const style = {
          transform: `translate(calc(${index} * var(--tx)), calc(${index} * var(--ty) - ${isActive ? 'var(--pop)' : '0px'}))`,
          zIndex: isActive ? 100 : index,
        };

        const overlayClass = isActive 
          ? "grayscale-0 shadow-2xl scale-[1.02]" 
          : "grayscale-[90%] opacity-70 hover:opacity-100 hover:grayscale-0 before:absolute before:inset-0 before:rounded-2xl before:bg-[#050b14]/50 before:transition-opacity before:duration-500 before:z-10";

        return (
          <div 
            key={index} 
            className={`dc-card [grid-area:stack] transition-all duration-500 ease-out cursor-pointer ${overlayClass}`}
            style={style}
            onClick={() => setActiveCard(index)}
          >
            <DisplayCard 
              {...cardProps} 
              className="w-[18rem] sm:w-[20rem] md:w-[28rem] min-h-[13rem] md:min-h-[12rem] px-5 py-5 md:px-6 md:py-6" 
            />
          </div>
        );
      })}
    </div>
  );
}
