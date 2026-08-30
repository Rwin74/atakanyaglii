import { a, useSpring } from "@react-spring/web";
import { Trail } from "./TrailText";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [open, set] = useState();

  useEffect(() => {
    set(true);
  }, []);

  const [horizontal, api] = useSpring(() => ({ from: { transform: 'translateX(0%)' } }));

  const horizontalCallback = open => api.start({ transform: `translateX(${open ? '5%' : '0%'})` });
  return (
    <h2 className="w-full z-10 relative px-4 md:px-0 md:pl-6 font-semibold text-4xl sm:text-5xl md:text-[5rem] lg:text-[6.5rem] text-center md:text-left leading-[1.1]" style={{ letterSpacing: "-0.04em" }}>
      <Trail callback={horizontalCallback}>
        <a.div className="flex flex-col md:flex-row items-center md:justify-start md:flex-nowrap md:whitespace-nowrap" style={horizontal}>
          <div>Gerçek dünya&nbsp;</div>
          <div>zorlukları için&nbsp;</div>
        </a.div>
        <div className="flex flex-col md:flex-row items-center md:justify-start md:flex-nowrap md:whitespace-nowrap">
          <div>teknoloji inşa&nbsp;</div>
          <div>ediyorum.&nbsp;</div>
        </div>
      </Trail>
    </h2>
  );
};

export default Header;
