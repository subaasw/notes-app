import SelectFolderRive from "./SelectFolderRive";

export default function ChooseFolderOption({
  text,
  folderId,
  chosenFolder,
  setChosenFolder,
}) {
  return (
    <div
      className="flex items-center gap-2.5 cursor-pointer"
      onClick={() => {
        setChosenFolder(folderId);
      }}
    >
      <SelectFolderRive isSelected={folderId == chosenFolder} />
      <span className={"mt-1.5 " + (folderId == chosenFolder && "font-600")}>
        {text}
      </span>
    </div>
  );
}
