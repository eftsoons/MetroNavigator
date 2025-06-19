function TheatreSVG({ width, height }: { width?: number; height?: number }) {
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
        d="M15.133 10.562h1.181c.426 0 .846.1 1.227.29l.535.267c.467.233.857.595 1.125 1.042l2.332 3.887M12.39 18.79H6.905a1.829 1.829 0 0 1-1.829-1.828V6.905c0-1.01.819-1.829 1.829-1.829h6.4c1.01 0 1.828.819 1.828 1.829v8.228"
      ></path>
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="m16.962 21.533-2.516-.967a3.657 3.657 0 0 1-1.789-1.476L9.87 14.626a1.462 1.462 0 0 1 .206-1.807v0a1.462 1.462 0 0 1 2.12.056l2.03 2.258h1.822"
      ></path>
    </svg>
  );
}

export default TheatreSVG;
