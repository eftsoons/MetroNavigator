import { ReactNode } from "react";

function Button({
  children,
  onClick,
  className,
}: {
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full h-[40px] bg-[var(--primary-button)] text-[var(--primary-text)]! rounded-[10px] ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
