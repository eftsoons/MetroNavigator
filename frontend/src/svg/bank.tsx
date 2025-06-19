function BankSVG({ width, height }: { width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 26 26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M18.791 4.16H7.82a2.743 2.743 0 0 0-2.743 2.743V21.53c0 .505.41.915.914.915H20.62c.504 0 .914-.41.914-.915V6.903a2.743 2.743 0 0 0-2.743-2.743Z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M17.878 14.217H8.735a.915.915 0 0 1-.914-.914V8.427c0-.505.41-.914.914-.914h9.143c.505 0 .915.41.915.914v4.876c0 .504-.41.914-.915.914Z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M7.821 16.96h.914M11.477 16.96h.915M15.136 16.96h3.657M7.821 19.703h.914M11.477 19.703h.915"
      ></path>
    </svg>
  );
}

export default BankSVG;
