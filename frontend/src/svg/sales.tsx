function SalesSVG({ width, height }: { width?: number; height?: number }) {
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
        d="m10.84 11.275-.642-2.89H8.34"
      ></path>
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="m12.538 19.185-1.697-7.91h12.195c.614 0 1.07.566.942 1.166l-1.447 6.744a.963.963 0 0 1-.942.761h-8.11a.963.963 0 0 1-.94-.76Z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M21.917 23.439a.361.361 0 1 0 .363.361.363.363 0 0 0-.363-.361M13.622 23.439c-.2 0-.361.162-.36.361a.36.36 0 1 0 .722 0c0-.2-.162-.361-.362-.361"
      ></path>
    </svg>
  );
}

export default SalesSVG;
