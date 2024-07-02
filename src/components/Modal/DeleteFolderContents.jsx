import SmoothButton from "@/components/SmoothButton/SmoothButton";
import SmoothButtonRed from "@/components/SmoothButton/SmoothButtonRed";
import { useOverlay } from "@/context/OverlayContext";
import Drawer from "@/components/Drawer/Drawer";
import NoteOptionsContents from "@/components/Drawer/NoteOptionsContents";
import { useAllNotes } from "@/context/AllNotesContext";
import FolderOptionsContents from "@/components/Drawer/FolderOptionsContents";
import { useFolders } from "@/context/FolderContext";

export default function DeleteFolderContents({ folderId, folderName }) {
  const { setOverlay, setIsOn } = useOverlay();
  const { deleteAFolder } = useFolders();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <span className="font-header text-32 font-500 leading-none">
          Are you sure you want to delete this folder?
        </span>
        You cannot undo this.
      </div>
      <div className="flex flex-col gap-3">
        <SmoothButtonRed
          text="Delete"
          functionToRun={() => {
            deleteAFolder(folderId);
            setIsOn(false);
          }}
        />
        <SmoothButton
          text="Cancel"
          functionToRun={() => {
            setOverlay(
              <Drawer>
                <FolderOptionsContents
                  folderId={folderId}
                  folderName={folderName}
                />
              </Drawer>
            );
          }}
        />
      </div>
    </div>
  );
}
