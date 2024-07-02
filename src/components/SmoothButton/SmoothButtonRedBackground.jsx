import SmoothButtonRedLeft from "./SmoothButtonRedLayers/SmoothButtonRedLeft";
import SmoothButtonRedMiddle from "./SmoothButtonRedLayers/SmoothButtonRedMiddle";
import SmoothButtonRedRight from "./SmoothButtonRedLayers/SmoothButtonRedRight";

export default function SmoothButtonRedBackground() {
  return (
    <div className="flex">
      <SmoothButtonRedLeft />
      <SmoothButtonRedMiddle />
      <SmoothButtonRedRight />
    </div>
  );
}
