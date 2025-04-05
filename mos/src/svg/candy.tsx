function CandySVG({ width, height }: { width?: number; height?: number }) {
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
        d="M8.644 11.416h-2.13a1.435 1.435 0 0 1-.714-2.68.78.78 0 0 0 .33-.878 1.44 1.44 0 0 1 1.728-1.729.78.78 0 0 0 .878-.33 1.435 1.435 0 0 1 2.68.714v2.132M17.974 15.203h2.131a1.435 1.435 0 0 1 .714 2.68.78.78 0 0 0-.33.878 1.44 1.44 0 0 1-1.728 1.729.78.78 0 0 0-.878.329 1.434 1.434 0 0 1-2.68-.714v-2.13"
      ></path>
      <circle
        cx="13.309"
        cy="13.309"
        r="5.031"
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
      ></circle>
    </svg>
  );
}

export default CandySVG;
