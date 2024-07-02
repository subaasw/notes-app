import SmoothButton from "../SmoothButton/SmoothButton";
import DrawerOption from "./DrawerOption";
import { useOverlay } from "@/context/OverlayContext";
import Drawer from "./Drawer";
import ShareNoteContents from "./ShareNoteContents";
import Modal from "@/components/Modal/Modal";
import DeleteNoteContents from "@/components/Modal/DeleteNoteContents";
import MoveNoteContents from "./MoveNoteContents";
import EditNoteContents from "./PostingContents/EditNoteContents";
import ShareNoteIcon from "../Icons/ShareNoteIcon";
import MoveNoteIcon from "../Icons/MoveNoteIcon";
import EditNoteIcon from "../Icons/EditNoteIcon";
import TrashNoteIcon from "../Icons/TrashNoteIcon";

export default function NoteOptionsContents({
  noteId,
  folderId,
  noteTitle,
  noteContent,
  lastSaved,
}) {
  const { isOn, setIsOn, setOverlay } = useOverlay();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <DrawerOption
          icon={<ShareNoteIcon />}
          text="Share Note"
          functionToRun={() => {
            setOverlay(
              <Drawer>
                <ShareNoteContents
                  noteId={noteId}
                  folderId={folderId}
                  noteTitle={noteTitle}
                  noteContent={noteContent}
                  lastSaved={lastSaved}
                />
              </Drawer>
            );
          }}
        />
        <DrawerOption
          icon={<MoveNoteIcon />}
          text="Move Note"
          functionToRun={() => {
            setOverlay(
              <Drawer>
                <MoveNoteContents
                  noteId={noteId}
                  folderId={folderId}
                  noteTitle={noteTitle}
                  noteContent={noteContent}
                  lastSaved={lastSaved}
                />
              </Drawer>
            );
          }}
        />
        <DrawerOption
          icon={<EditNoteIcon />}
          text="Edit Note"
          functionToRun={() => {
            setOverlay(
              <Drawer>
                <EditNoteContents
                  noteId={noteId}
                  folderId={folderId}
                  noteTitle={noteTitle}
                  noteContent={noteContent}
                  lastSaved={lastSaved}
                  variant={"edit-note"}
                />
              </Drawer>
            );
          }}
        />
        <DrawerOption
          icon={<TrashNoteIcon />}
          text="Delete Note"
          color="rgb(var(--Brand-Red))"
          functionToRun={() => {
            setOverlay(
              <Modal>
                <DeleteNoteContents
                  noteId={noteId}
                  folderId={folderId}
                  noteTitle={noteTitle}
                  noteContent={noteContent}
                  lastSaved={lastSaved}
                />
              </Modal>
            );
          }}
        />
      </div>
      <SmoothButton
        text="Cancel"
        functionToRun={() => {
          setIsOn(!isOn);
        }}
      />
    </div>
  );
}
