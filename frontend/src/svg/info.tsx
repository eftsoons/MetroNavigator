function InfoSVG({ width, height }: { width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M16 24v0a8 8 0 0 1-8.001-8v0a8 8 0 0 1 8-8v0A8 8 0 0 1 24 16v0a8 8 0 0 1-8 8Z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M16 19.81V16h-.762M15.808 12.952a.19.19 0 1 0 .002.381.19.19 0 0 0-.002-.38"
      ></path>
    </svg>
  );
}

export default InfoSVG;
