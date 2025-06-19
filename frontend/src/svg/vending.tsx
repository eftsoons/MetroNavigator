function VendingSVG({ width, height }: { width?: number; height?: number }) {
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
        d="M8.745 12.605v12.442M24.043 12.605v12.442M7.773 25.047H25"
      ></path>
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M24.043 12.605H8.73a.957.957 0 0 1-.957-.957V8.777c0-.528.429-.957.957-.957h15.313c.529 0 .957.428.957.957v2.871a.957.957 0 0 1-.957.957Z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="m20.224 18.204-.736 6a.953.953 0 0 1-.948.843h-4.306a.953.953 0 0 1-.948-.843l-.746-6"
      ></path>
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M19.736 18.347h-6.698a.957.957 0 0 1-.908-1.26l.319-.956a.958.958 0 0 1 .908-.655h6.06c.411 0 .777.264.907.655l.319.957a.956.956 0 0 1-.907 1.26v0Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default VendingSVG;
