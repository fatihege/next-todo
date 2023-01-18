import * as React from "react";
const SvgEdit = (props) => (
  <svg
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeMiterlimit: 1.5,
    }}
    {...props}
  >
    <path
      d="M16.39 58.769 5.581 61.417a2.48 2.48 0 0 1-2.998-2.998L5.231 47.61 49.202 3.639a3.452 3.452 0 0 1 4.881 0l6.278 6.278a3.452 3.452 0 0 1 0 4.881L16.39 58.769ZM43.148 9.693l11.159 11.159"
      style={{
        fill: "none",
        stroke: "#5a07ff",
        strokeWidth: "5.52px",
      }}
      transform="matrix(.98046 0 0 .98046 .624 .626)"
    />
  </svg>
);
export default SvgEdit;
