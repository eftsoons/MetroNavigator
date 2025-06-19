import { ComponentProps, ReactNode, useEffect, useState } from "react";

import { Page as PageTop } from "@/components/PageTop";

function PageAnimation({
  open,
  children,
  backfunction,
  ...props
}: {
  open: boolean;
  children: ReactNode;
} & ComponentProps<typeof PageTop>) {
  const [openanim, setopenanim] = useState(false);

  useEffect(() => {
    if (open) {
      setopenanim(open);
    }
  }, [open]);

  return (
    openanim && (
      <PageTop
        open={open}
        backfunction={() => {
          if (backfunction) {
            backfunction();
          }
          setTimeout(() => setopenanim(false), 400);
        }}
        {...props}
      >
        {children}
      </PageTop>
    )
  );
}

export default PageAnimation;
