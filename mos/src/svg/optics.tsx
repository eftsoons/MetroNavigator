function OpticsSVG({ width, height }: { width?: number; height?: number }) {
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
        d="M11.937 15.139a6.889 6.889 0 0 0-6.86 0"
      ></path>
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M9.65 7.275 8.832 7A1.83 1.83 0 0 0 6.467 8.34L5.165 14.2a3.66 3.66 0 0 0-.088.794v1.974a2.744 2.744 0 0 0 2.744 2.744h1.176c1.41 0 2.59-1.068 2.73-2.47l.21-2.103M16.968 7.275l.82-.274a1.83 1.83 0 0 1 2.364 1.339l1.302 5.86c.058.26.087.527.087.794v1.974a2.744 2.744 0 0 1-2.744 2.744h-1.175a2.744 2.744 0 0 1-2.73-2.47l-.21-2.103"
      ></path>
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M11.937 15.139c.813-.61 1.931-.61 2.744 0M21.541 15.139a6.889 6.889 0 0 0-6.86 0"
      ></path>
    </svg>
  );
}

export default OpticsSVG;
