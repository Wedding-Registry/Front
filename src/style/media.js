import { css } from "styled-components";

const sizes = {
  desktop: 1200,
  mobile: 600,
};

const media = Object.entries(sizes).reduce((acc, [key, value]) => {
  return {
    ...acc,
    [key]: (first, ...interpolations) => css`
      @media (max-width: ${value}px) {
        ${css(first, ...interpolations)}
      }
    `,
  };
}, {});

export { media };
