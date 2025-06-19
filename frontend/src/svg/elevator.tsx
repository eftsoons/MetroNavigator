function ElevatorSVG({ width, height }: { width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      fill="currentColor"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M8.193 8.624h16.376M7.762 24.138H25M16.38 24.138V8.624M24.138 8.624v15.514M13.795 16.849l-1.256 1.256-1.33-1.33M12.54 18.105v-3.448M8.624 24.138V8.624M18.967 15.913l1.256-1.256 1.33 1.33M20.223 14.657v3.448"
      ></path>
    </svg>
  );
}

export default ElevatorSVG;
