function FoodSVG({ width, height }: { width?: number; height?: number }) {
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
        d="M8.635 19.69h15.504c.475 0 .861.387.861.862v.862c0 .951-.771 1.722-1.723 1.722H9.497a1.723 1.723 0 0 1-1.724-1.722v-.862c0-.475.386-.861.862-.861ZM16.387 14.523H8.73a.913.913 0 0 1-.957-.861c0-2.855 3.857-5.168 8.614-5.168 4.757 0 8.613 2.313 8.613 5.168a.913.913 0 0 1-.957.861h-7.656Z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M8.204 17.107a4.308 4.308 0 0 1 3.273 0c1.049.43 2.225.43 3.273 0a4.308 4.308 0 0 1 3.273 0c1.049.43 2.225.43 3.273 0a4.308 4.308 0 0 1 3.273 0"
      ></path>
    </svg>
  );
}

export default FoodSVG;
