import SmoothButtonBlackLeft from "./SmoothButtonBlackLayers/SmoothButtonBlackLeft";
import SmoothButtonBlackMiddle from "./SmoothButtonBlackLayers/SmoothButtonBlackMiddle";
import SmoothButtonBlackRight from "./SmoothButtonBlackLayers/SmoothButtonBlackRight";

export default function SmoothButtonBlackBackground() {
  return (
    <div className="flex">
      <SmoothButtonBlackLeft />
      <SmoothButtonBlackMiddle />
      <SmoothButtonBlackRight />
    </div>
  );
}
