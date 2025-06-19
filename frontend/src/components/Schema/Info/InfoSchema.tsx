import { station } from "@/type";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

function InfoSchema({ station }: { station: { station: station } }) {
  return (
    <>
      <TransformWrapper disablePadding>
        <TransformComponent
          wrapperClass="h-full! z-[1]"
          contentClass="h-full flex items-center"
        >
          <img src={station.station.schemes[0]} style={{ objectFit: "fill" }} />
        </TransformComponent>
      </TransformWrapper>
    </>
  );
}

export default InfoSchema;
