import Drawer from "@/components/Drawer/Drawer";
import NoteOptionsContents from "@/components/Drawer/NoteOptionsContents";
import { useOverlay } from "@/context/OverlayContext";

export default function MoreOptionsDots({
  noteId,
  folderId,
  noteTitle,
  noteContent,
  lastSaved,
}) {
  const { isOn, setIsOn, setOverlay } = useOverlay();

  return (
    <div className="opacity-button-transition relative z-[10] cursor-pointer">
      <svg
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={(event) => {
          event.stopPropagation();
          setOverlay(
            <Drawer>
              <NoteOptionsContents
                noteId={noteId}
                folderId={folderId}
                noteTitle={noteTitle}
                noteContent={noteContent}
                lastSaved={lastSaved}
              />
            </Drawer>
          );
          setIsOn(!isOn);
        }}
      >
        <circle
          cx="5.90002"
          cy="13.5"
          r="1.90002"
          fill="rgb(var(--Brand-Black))"
        />
        <circle
          cx="13.5001"
          cy="13.5"
          r="1.90002"
          fill="rgb(var(--Brand-Black))"
        />
        <circle
          cx="21.1002"
          cy="13.5"
          r="1.90002"
          fill="rgb(var(--Brand-Black))"
        />
      </svg>
    </div>
  );
}
