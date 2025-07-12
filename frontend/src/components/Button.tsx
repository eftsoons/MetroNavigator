import { CSSProperties, MouseEventHandler, ReactNode } from "react";

function Button({
  children,
  onClick,
  className,
  href,
  style,
  disabled,
}: {
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  href?: string | false;
  style?: CSSProperties;
  disabled?: boolean;
}) {
  return href ? (
    <a href={href} target="_blank">
      <button
        onClick={onClick}
        className={
          className
            ? className
            : `w-full h-[40px] bg-[var(--primary-button)] text-[var(--primary-text)]! rounded-[10px]`
        }
        style={style}
        disabled={disabled}
      >
        {children}
      </button>
    </a>
  ) : (
    <button
      onClick={onClick}
      className={
        className
          ? className
          : `w-full h-[40px] bg-[var(--primary-button)] text-[var(--primary-text)]! rounded-[10px] ${className}`
      }
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
