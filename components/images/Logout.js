import * as React from "react";
const SvgLogout = (props) => (
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
      d="M11.05 16.596V9.941A7.641 7.641 0 0 1 18.691 2.3h26.208a7.64 7.64 0 0 1 7.64 7.641v43.707a7.64 7.64 0 0 1-7.64 7.641H18.691a7.641 7.641 0 0 1-7.641-7.641v-6.079"
      style={{
        fill: "none",
        stroke: "#ff4f4f",
        strokeWidth: "4.17px",
      }}
    />
    <path
      d="M10.557 32H32"
      style={{
        fill: "none",
        stroke: "#ff4f4f",
        strokeWidth: "3.56px",
      }}
      transform="matrix(-1.26857 0 0 1.06462 50.693 -2.068)"
    />
    <path
      d="M0 64V0h64"
      style={{
        fill: "none",
        stroke: "#ff4f4f",
        strokeWidth: "18.7px",
      }}
      transform="matrix(.15752 .15752 .15752 -.15752 8.764 32)"
    />
  </svg>
);
export default SvgLogout;
