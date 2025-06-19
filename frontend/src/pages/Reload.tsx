import LogoSVG from "@/svg/logo";
import RotateVagon from "@/svg/RotateVagon";

function Reload() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="w-[40px] fill-(--primary-text)">
        <LogoSVG />
      </div>
      <div className="spinner w-[106px] h-[106px] absolute">
        <RotateVagon />
      </div>
    </div>
  );
}

export default Reload;
