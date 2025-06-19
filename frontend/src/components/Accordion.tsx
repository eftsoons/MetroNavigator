import Arrow from "@/svg/arrow";
import { ReactNode, useRef, useState } from "react";

function Accordion({
  children,
  title,
  icon,
}: {
  children: ReactNode;
  title: string;
  icon?: string;
}) {
  const blockopenheight = useRef<HTMLDivElement | null>(null);

  const [open, setopen] = useState(false);

  return (
    <>
      <div
        className="flex items-center gap-[10px] cursor-pointer"
        onClick={() => setopen(!open)}
      >
        {icon && (
          <img className="h-[20px] w-[20px] object-contain" src={icon} />
        )}
        <span className="flex items-center justify-between w-full">
          {title}
          <div
            style={{
              transform: open ? "rotate(180deg)" : "",
            }}
            className="h-[15px] w-[15px] duration-250 fill-[var(--primary-muted-color)]"
          >
            <Arrow />
          </div>
        </span>
      </div>
      <div
        ref={blockopenheight}
        className="duration-250 h-full overflow-hidden"
        style={{
          height: open ? `${blockopenheight.current?.scrollHeight}px` : "0",
        }}
      >
        {children}
      </div>
    </>
  );
}

export default Accordion;
