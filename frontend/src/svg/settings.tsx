function SettingsSVG({ width, height }: { width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m4.29 18.292 1.632.25a2.334 2.334 0 0 1 1.975 2.477l-.12 1.646c-.035.48.226.93.659 1.14l1.206.58c.433.21.95.131 1.303-.194l1.213-1.12a2.334 2.334 0 0 1 3.167 0l1.212 1.12c.354.326.87.404 1.303.195l1.21-.582c.43-.208.69-.659.656-1.137l-.12-1.648a2.334 2.334 0 0 1 1.975-2.477l1.63-.25c.476-.072.858-.428.966-.897l.297-1.304a1.169 1.169 0 0 0-.48-1.227l-1.36-.932a2.334 2.334 0 0 1-.705-3.088l.822-1.43c.24-.417.2-.938-.1-1.314l-.834-1.046c-.3-.376-.8-.531-1.26-.39l-1.577.483a2.335 2.335 0 0 1-2.856-1.374L15.5 4.24a1.171 1.171 0 0 0-1.092-.741l-1.337.003a1.171 1.171 0 0 0-1.088.747l-.59 1.514a2.333 2.333 0 0 1-2.86 1.384L6.89 6.644a1.171 1.171 0 0 0-1.262.392l-.829 1.048c-.3.379-.336.902-.092 1.318l.841 1.434a2.334 2.334 0 0 1-.694 3.106l-1.345.921a1.17 1.17 0 0 0-.48 1.227l.298 1.304c.106.47.489.826.964.898Z"
        clipRule="evenodd"
        fill="none"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15.976 11.802a3.162 3.162 0 1 1-4.471 4.47 3.162 3.162 0 0 1 4.471-4.47"
        fill="none"
      ></path>
    </svg>
  );
}

export default SettingsSVG;
