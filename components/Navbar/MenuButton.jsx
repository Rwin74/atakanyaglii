import React, { useRef, useState, useEffect } from "react";
import { a, useSpring } from "@react-spring/web";
import { AnimatedButton } from "../ui/animated-button";
import Menu from "./Menu";

const MenuButton = () => {
  const [isOpen, open] = useState(false);
  const offset = 10;

  const [dots, dotsApi] = useSpring(() => ({
    from: { transform: `rotate(0deg)` },
  }));

  const handleMouseEnter = () => {
    dotsApi.start({ transform: `rotate(90deg)` });
  };
  const handleMouseLeave = () => {
    if (!isOpen) {
      dotsApi.start({ transform: `rotate(0deg)` });
    }
  };

  const [menu, menuApi] = useSpring(() => ({
    from: { y: offset, opacity: 1 },
  }));

  const [close, closeApi] = useSpring(() => ({
    from: { y: offset, opacity: 0 },
  }));

  const handleClick = () => {
    menuApi.stop();
    closeApi.stop();
      menuApi.start({
        y: !isOpen ? -offset : offset,
        opacity: !isOpen ? 0 : 1,
      });

      closeApi.start({
        y: !isOpen ? -offset : offset,
        opacity: !isOpen ? 1 : 0,
      });
  };

  const ref = useRef();

  // Close the menu and play the dots/menu/close springs back to their
  // resting state. Used both for outside-clicks and when an item inside the
  // menu is activated, so the dropdown disappears as soon as the user has
  // committed to a destination.
  const closeMenu = () => {
    if (!isOpen) return;
    open(false);
    dotsApi.start({ transform: `rotate(0deg)` });
    handleClick();
  };

  const handleWindowClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      closeMenu();
    }
  };

  return (
    <>
      <Menu
        open={isOpen}
        onOutsideClick={handleWindowClick}
        onClose={closeMenu}
      />
      <AnimatedButton
        className="mx-2 h-12"
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          open(!isOpen);
          handleClick();
        }}
      >
        <div className="flex flex-col h-6 items-center justify-center -mb-1">
          <a.div style={menu}>MENÜ&nbsp;&nbsp;</a.div>
          <a.div style={close}>KAPAT&nbsp;&nbsp;</a.div>
        </div>
        <a.div style={dots}>•&nbsp;•</a.div>
      </AnimatedButton>
    </>
  );
};

export default MenuButton;
