import * as React from "react";
const SvgCreate = (props) => (
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
      d="M64 14.917C64 6.678 57.322 0 49.083 0H14.917C6.678 0 0 6.678 0 14.917v34.166C0 57.322 6.678 64 14.917 64h34.166C57.322 64 64 57.322 64 49.083V14.917Z"
      style={{
        fill: "none",
        stroke: "#5a07ff",
        strokeWidth: "5.95px",
      }}
      transform="translate(2.875 2.875) scale(.91014)"
    />
    <path
      d="M32 16.431v30.727"
      style={{
        fill: "none",
        stroke: "#5a07ff",
        strokeWidth: "5.42px",
      }}
      transform="translate(0 .205)"
    />
    <path
      d="M32 16.431v30.727"
      style={{
        fill: "none",
        stroke: "#5a07ff",
        strokeWidth: "5.42px",
      }}
      transform="matrix(0 -1 1 0 .205 64)"
    />
  </svg>
);
export default SvgCreate;