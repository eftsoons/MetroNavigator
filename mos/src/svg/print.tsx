function PrintSVG({ width, height }: { width?: number; height?: number }) {
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
        d="M22.667 20.507v2.607a.882.882 0 0 1-1.089.861 26.77 26.77 0 0 0-11.157 0 .882.882 0 0 1-1.088-.861v-2.607"
      ></path>
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M16.822 9.94c1.544-1.001 3.287-1.656 5.108-1.92A1.79 1.79 0 0 1 24 9.778v9.814a.89.89 0 0 1-.857.878A12.741 12.741 0 0 0 16 23.11V11.446a1.805 1.805 0 0 1 .822-1.506ZM15.178 9.94a12.752 12.752 0 0 0-5.108-1.92A1.79 1.79 0 0 0 8 9.778v9.814a.89.89 0 0 0 .857.878A12.741 12.741 0 0 1 16 23.11V11.446a1.805 1.805 0 0 0-.822-1.506Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default PrintSVG;
