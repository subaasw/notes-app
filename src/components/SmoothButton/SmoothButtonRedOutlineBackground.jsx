import SmoothButtonRedOutlineLeft from "./SmoothButtonRedOutlineLayers/SmoothButtonRedOutlineLeft";
import SmoothButtonRedOutlineMiddle from "./SmoothButtonRedOutlineLayers/SmoothButtonRedOutlineMiddle";
import SmoothButtonRedOutlineRight from "./SmoothButtonRedOutlineLayers/SmoothButtonRedOutlineRight";

export default function SmoothButtonRedOutlineBackground() {
  return (
    <div className="flex">
      <SmoothButtonRedOutlineLeft />
      <SmoothButtonRedOutlineMiddle />
      <SmoothButtonRedOutlineRight />
    </div>
  );
}
