import { useState, useEffect } from "react";

const SCROLL_THRESHOLD = 10;

const useScroll = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    setScrolled(window.scrollY > SCROLL_THRESHOLD);
  };

  useEffect(() => {
    setScrolled(window.scrollY > SCROLL_THRESHOLD);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return [scrolled];
};

export default useScroll;
