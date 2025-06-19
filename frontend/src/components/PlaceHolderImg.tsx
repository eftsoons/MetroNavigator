import { useState, cloneElement, ReactElement } from "react";

function PlacHolderImg({
  children,
  Placeholder,
  className,
}: {
  children: ReactElement;
  Placeholder?: ReactElement;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return className ? (
    <div className={className}>
      {isLoading && Placeholder}
      {cloneElement(children, {
        onLoad: () => {
          setIsLoading(false);
        },
      })}
    </div>
  ) : (
    <>
      {isLoading && Placeholder}
      {cloneElement(children, {
        onLoad: () => {
          setIsLoading(false);
        },
      })}
    </>
  );
}

export default PlacHolderImg;
