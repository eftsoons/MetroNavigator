function BatterySVG({ width, height }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} fill="none" viewBox="0 0 26 26">
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M17.876 18.79H6.905a1.828 1.828 0 0 1-1.829-1.828V9.648c0-1.01.818-1.829 1.829-1.829h10.971c1.01 0 1.829.818 1.829 1.829v7.314c0 1.01-.818 1.829-1.829 1.829Z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="var(--primary-text)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="m12.665 16.048 1.371-2.743h-3.291l1.371-2.743M19.705 10.562h.927c.142 0 .281.033.409.097l.444.222c.31.155.506.472.506.817v3.213a.913.913 0 0 1-.506.818l-.444.222a.908.908 0 0 1-.41.097h-.926"
      ></path>
    </svg>
  );
}

export default BatterySVG;
