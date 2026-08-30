import React from "react";
import { useSpring, animated } from "@react-spring/web";
import { AnimatedButton } from "../ui/animated-button";

// Same address used in `Contact` and `SiteFooter`. If any of these change,
// keep all three places in sync.
const EMAIL = "atakan7495@gmail.com";

// "LET'S TALK" was previously a non-interactive div. It now opens the user's
// mail client straight to the real contact email — which is also wired up
// in the contact section and the footer.
const LetsTalk = () => {
  const [springs, api] = useSpring(() => ({
    from: { x: 0 },
    x: -10,
  }));

  const [opacitySprings, opacityApi] = useSpring(() => ({
    opacity: 1,
    x: 0,
  }));

  const [opacitySpringsReverse, opacityApiReverse] = useSpring(() => ({
    opacity: 0,
    x: -10,
  }));

  return (
    <AnimatedButton
      onClick={() => window.location.href = `mailto:${EMAIL}`}
      className="h-12"
      onMouseEnter={() => {
        api.start({ x: 15 });
        opacityApi.start({ opacity: 0, x: 5 });
        opacityApiReverse.start({ opacity: 1, x: 3 });
      }}
      onMouseLeave={() => {
        api.start({ x: 0 });
        opacityApi.start({ opacity: 1, x: 0 });
        opacityApiReverse.start({ opacity: 0, x: -10 });
      }}
    >
      <div className="flex items-center text-xs tracking-[0.2em]">
        <animated.span style={opacitySpringsReverse} className="opacity-0 w-4">➔</animated.span>
        <animated.span style={springs}>İLETİŞİM &nbsp;</animated.span>
        <animated.span style={opacitySprings}>&nbsp;•</animated.span>
      </div>
    </AnimatedButton>
  );
};

export default LetsTalk;
