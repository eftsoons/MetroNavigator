function ErrorSVG({ width, height }: { width: number; height: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 23 23"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.75"
        y="0.75"
        width="21.5"
        height="21.5"
        rx="10.25"
        fill="var(--primary-bg)"
        stroke="var(--primary-text)"
        strokeWidth="1.5"
      ></rect>
      <path
        d="M11.5638 11.217V7"
        stroke="var(--primary-text)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M11.5627 14.6053C11.407 14.6053 11.2808 14.7315 11.2819 14.8871C11.2819 15.0427 11.4082 15.169 11.5638 15.169C11.7194 15.169 11.8457 15.0427 11.8457 14.8871C11.8457 14.7315 11.7194 14.6053 11.5627 14.6053"
        stroke="var(--primary-text)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}

export default ErrorSVG;
