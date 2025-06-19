function FlowersSVG({ width, height }: { width?: number; height?: number }) {
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
        d="M17.876 21.141c-.757-.914-1.75-1.371-2.743-1.371.993 0 1.986-.457 2.743-1.372M11.476 16.901v5.547h3.657V16.9M15.133 19.769h-3.657M20.108 11.894a2.78 2.78 0 0 0 .461-.367l1.878-1.88a3.628 3.628 0 0 0-2.821-1.056 3.632 3.632 0 0 0-1.057-2.822L16.69 7.647a2.734 2.734 0 0 0-.433 3.295"
      ></path>
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="m20.245 13.612-4.564 3.043c-.301.2-.654.307-1.015.307H11.94c-.36 0-.714-.107-1.014-.307l-4.564-3.043a.926.926 0 0 1-.195-1.353 3.942 3.942 0 0 1 3.093-1.496c.383 0 .757.077 1.111.182a3.963 3.963 0 0 1 2.932-1.294c1.158 0 2.203.498 2.94 1.294a3.865 3.865 0 0 1 1.113-.182 3.94 3.94 0 0 1 3.084 1.496.928.928 0 0 1-.196 1.353v0Z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M14.95 10.011a2.73 2.73 0 0 0 1.11-2.192V5.163a3.629 3.629 0 0 0-2.743 1.248 3.632 3.632 0 0 0-2.742-1.248v2.656a2.73 2.73 0 0 0 1.098 2.183"
      ></path>
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M6.501 11.894a2.78 2.78 0 0 1-.461-.367l-1.878-1.88a3.628 3.628 0 0 1 2.821-1.056A3.632 3.632 0 0 1 8.04 5.769l1.878 1.878a2.734 2.734 0 0 1 .433 3.295"
      ></path>
    </svg>
  );
}

export default FlowersSVG;
