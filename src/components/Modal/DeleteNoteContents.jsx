import SmoothButton from "@/components/SmoothButton/SmoothButton";
import SmoothButtonRed from "@/components/SmoothButton/SmoothButtonRed";
import { useOverlay } from "@/context/OverlayContext";
import Drawer from "@/components/Drawer/Drawer";
import NoteOptionsContents from "@/components/Drawer/NoteOptionsContents";
import { useAllNotes } from "@/context/AllNotesContext";
import { removeNote } from "@/utils/actions/notes";

export default function DeleteNoteContents({
  noteId,
  folderId,
  noteTitle,
  noteContent,
  lastSaved,
}) {
  const { isOn, setIsOn, setOverlay } = useOverlay();
  const { allNotesData, setallNotesData } = useAllNotes();

  // Function to fetch notes
  const deleteANote = async (noteId) => {
    try {
      await removeNote(noteId);
      const firstKey = Object.keys(allNotesData)[0];
      const arrayNotes = allNotesData[firstKey];

      const newNotesObj = {
        [firstKey]: arrayNotes.filter((curNote) => noteId !== curNote.id),
      };

      setallNotesData(newNotesObj);
      setIsOn(false);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <span className="font-header text-32 font-500 leading-none">
          Are you sure you want to delete this note?
        </span>
        You cannot undo this.
      </div>
      <div className="flex flex-col gap-3">
        <SmoothButtonRed
          text="Delete"
          functionToRun={() => {
            deleteANote(noteId);
          }}
        />
        <SmoothButton
          text="Cancel"
          functionToRun={() => {
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
          }}
        />
      </div>
    </div>
  );
}
