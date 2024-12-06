import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Skeletons = ({ className }) => {
  return (
    <SkeletonTheme baseColor="#000101" highlightColor="#001D2B">
      <Skeleton style={{ width: "100%", height: "100%" }} className={className} />
    </SkeletonTheme>
  );
};

export default Skeletons;
