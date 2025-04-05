function CoffeeSVG({ width, height }: { width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      fill="currentColor"
      viewBox="0 0 26 26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M5.992 11.937h10.976c.505 0 .915.41.915.915v2.744a5.488 5.488 0 0 1-5.488 5.488h-1.83a5.488 5.488 0 0 1-5.488-5.488v-2.744c0-.505.41-.915.915-.915Z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M14.681 9.193a1.658 1.658 0 0 1 0-2.286c.61-.64.61-1.647 0-2.287M11.48 9.193a1.658 1.658 0 0 1 0-2.286c.61-.64.61-1.647 0-2.287M8.279 9.193a1.658 1.658 0 0 1 0-2.286c.61-.64.61-1.647 0-2.287M17.085 18.445l1.688-.386a3.563 3.563 0 0 0 2.768-3.473v0a2.648 2.648 0 0 0-2.648-2.649H16.51"
      ></path>
    </svg>
  );
}

export default CoffeeSVG;
