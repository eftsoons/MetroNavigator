function InvalidSVG({ width, height }: { width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12.444"
        cy="19.556"
        r="4.445"
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
      ></circle>
      <circle
        cx="12.444"
        cy="19.556"
        r="1.778"
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
      ></circle>
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M24 23.111h-1.43a.444.444 0 0 1-.432-.336l-1.357-5.428A1.778 1.778 0 0 0 19.056 16h-3.945M19.555 12.444h-8M17.778 16v-3.556M8.889 8h.889c.981 0 1.777.796 1.777 1.778v5.333M21.778 21.333h-5.26"
      ></path>
    </svg>
  );
}

export default InvalidSVG;
