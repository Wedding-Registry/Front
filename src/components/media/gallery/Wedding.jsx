import React from "react";
import { useMediaQuery } from "react-responsive";

const Galaxy21Mobile = ({ children }) => {
  const isMobile = useMediaQuery({
    query: "(max-width:360px)",
  });
  return <div>{isMobile ? children : null}</div>;
};

const Galaxy21PlusMobile = ({ children }) => {
  const isMobile = useMediaQuery({
    query: "(max-width:384px)",
  });
  return <div>{isMobile ? children : null}</div>;
};

const Galaxy21UltraMobile = ({ children }) => {
  const isMobile = useMediaQuery({
    query: "(max-width:412px)",
  });
  return <div>{isMobile ? children : null}</div>;
};

const Iphone14Mobile = ({ children }) => {
  const isMobile = useMediaQuery({
    query: "(max-width:390px)",
  });
  return <div>{isMobile ? children : null}</div>;
};
const Iphone14PlusMobile = ({ children }) => {
  const isMobile = useMediaQuery({
    query: "(max-width:428px)",
  });
  return <div>{isMobile ? children : null}</div>;
};
const Iphone14ProMobile = ({ children }) => {
  const isMobile = useMediaQuery({
    query: "(max-width:393px)",
  });
  return <div>{isMobile ? children : null}</div>;
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

export {
  Galaxy21Mobile,
  PC,
  Galaxy21UltraMobile,
  Iphone14ProMobile,
  Iphone14PlusMobile,
  Iphone14Mobile,
  Galaxy21PlusMobile,
};
