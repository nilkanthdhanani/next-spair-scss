import { useState, useEffect } from "react";

const useDeviceWidth = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  const handleResize = () => setIsDesktop(window.innerWidth > 767);

  useEffect(() => {
    setIsDesktop(window.innerWidth > 767);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return [isDesktop];
};

export default useDeviceWidth;
