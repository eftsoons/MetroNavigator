function ParkingSVG({ width, height }: { width?: number; height?: number }) {
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
        d="M21.415 22.71h-3.447v.432a.862.862 0 0 1-.862.861h-.862a.862.862 0 0 1-.861-.861v-1.508c0-.833.675-1.509 1.508-1.509h5.6c.834 0 1.509.676 1.509 1.509v1.508a.862.862 0 0 1-.862.861h-.862a.862.862 0 0 1-.861-.861v-.431Z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="m16.364 20.225.496-2.117a1.293 1.293 0 0 1 1.259-.999h3.145c.6 0 1.122.414 1.259.999l.495 2.117M16.45 19.8l-1.067-.536M22.932 19.8 24 19.264M12.798 11.94v3.877M12.797 11.94h1.358a1.228 1.228 0 0 1 1.228 1.227v0c0 .678-.55 1.228-1.228 1.228h-1.358"
      ></path>
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M19.691 13.683a6.048 6.048 0 0 0-1.767-4.28h0l-.02-.02a6.042 6.042 0 0 0-8.51 8.58l2.585 2.593"
      ></path>
    </svg>
  );
}

export default ParkingSVG;
