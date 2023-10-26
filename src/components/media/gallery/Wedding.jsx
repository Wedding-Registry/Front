import React from "react";
import { useMediaQuery } from "react-responsive";

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({
    query: "(max-width:768px)",
  });
  return <div>{isMobile && children}</div>;
};

const PC = ({ children }) => {
  const isPc = useMediaQuery({
    query: "(min-width:1200px) ",
  });
  return (
    <div style={isPc ? { height: "80%" } : { height: "" }}>
      {isPc && children}
    </div>
  );
};

export { Mobile, PC };
