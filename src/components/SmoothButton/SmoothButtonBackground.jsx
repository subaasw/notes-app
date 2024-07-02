import SmoothButtonLeft from "./SmoothButtonLayers/SmoothButtonLeft";
import SmoothButtonMiddle from "./SmoothButtonLayers/SmoothButtonMiddle";
import SmoothButtonRight from "./SmoothButtonLayers/SmoothButtonRight";

export default function SmoothButtonBackground() {
  return (
    <div className="flex">
      <SmoothButtonLeft />
      <SmoothButtonMiddle />
      <SmoothButtonRight />
    </div>
  );
}
