function ToiletSVG({ width, height }: { width?: number; height?: number }) {
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
        d="M4.163 11.48v0c0-.758.614-1.372 1.372-1.372h3.658c.253 0 .458.205.458.457v1.83a.457.457 0 0 1-.458.457H5.535a1.372 1.372 0 0 1-1.372-1.372Z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M13.31 11.48v8.232c0 1.01.818 1.83 1.829 1.83h4.573a1.83 1.83 0 0 0 1.83-1.83V11.48c0-3.031-1.639-5.488-3.66-5.488H9.652"
      ></path>
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M6.11 10.108c.403-2.36 1.84-4.116 3.54-4.116 2.022 0 3.66 2.46 3.66 5.488 0 3.028-1.638 5.488-3.66 5.488-1.7 0-3.137-1.756-3.54-4.116"
      ></path>
    </svg>
  );
}

export default ToiletSVG;
