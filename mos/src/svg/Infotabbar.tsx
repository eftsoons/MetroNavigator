function InfoTabBarSVG({ width, height }: { width?: number; height?: number }) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 1024 1024"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M512 0c282.77 0 512 229.23 512 512s-229.23 512-512 512c-282.77 0-512-229.23-512-512s229.23-512 512-512zM512 426.667c-23.564 0-42.667 19.103-42.667 42.667v0 298.667l0.287 4.976c2.465 21.22 20.499 37.691 42.38 37.691 23.564 0 42.667-19.103 42.667-42.667v0-298.667l-0.287-4.976c-2.465-21.22-20.499-37.691-42.38-37.691zM512 234.667c-35.346 0-64 28.654-64 64s28.654 64 64 64c35.346 0 64-28.654 64-64s-28.654-64-64-64z"
      ></path>
    </svg>
  );
}

export default InfoTabBarSVG;
