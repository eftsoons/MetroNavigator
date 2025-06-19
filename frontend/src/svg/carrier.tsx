function CarrierSVG({ width, height }: { width?: number; height?: number }) {
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
        d="M12.607 16.177h7.558v5.878h-7.558z"
      ></path>
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M22.446 12.054 18.83 8.437a1.889 1.889 0 0 0-1.336-.553h-5.831a1.89 1.89 0 0 0-1.89 1.89V23a1.89 1.89 0 0 0 1.89 1.89h9.447A1.89 1.89 0 0 0 23 23v-9.61c0-.501-.2-.982-.554-1.336Z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M12.607 18.695h2.53M15.137 22.055v-3.36M17.646 16.177v5.878"
      ></path>
    </svg>
  );
}

export default CarrierSVG;
