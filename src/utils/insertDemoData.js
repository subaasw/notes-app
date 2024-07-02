"use server";

import { createClient, getServerSession } from "./supabase/server";
import { TodoFolders, TodoNotes } from "./supabase/db/dbQuery";
import {
  MY_WORK_SPACE_DATA,
  RANDOM_THOUGHTS,
  WORKSPACE_NOTES,
  RANDOM_NOTES,
} from "@/constant/sample-data";

export default async function insertDemoData() {
  const supabase = createClient();
  const userQuery = supabase.from("users");
  const folderQueryInstance = new TodoFolders();
  const notesQuery = new TodoNotes();

  const {
    data: { session },
  } = await getServerSession();

  const userId = session?.user?.id;

  const { data: currentUser } = await userQuery
    .select()
    .eq("google_id", userId)
    .maybeSingle();

  if (currentUser?.google_id) return;

  const { data: newUser } = await userQuery.insert({
    google_id: userId,
    user_name: session?.user?.user_metadata?.name,
    email: session?.user?.email,
  }).maybeSingle();

  const { data } = await folderQueryInstance.select({
    params: "folder_id",
    userId,
  });

  // if already has data then dont add
  if (Array.isArray(data) && data.length) return;

  const { data: myWorkspaceData } = await folderQueryInstance.insert(
    MY_WORK_SPACE_DATA,
    userId
  );
  const { data: randomThoughtsData } = await folderQueryInstance.insert(
    RANDOM_THOUGHTS,
    userId
  );

  await folderQueryInstance.insert("Efficient Endeavors", userId);
  await folderQueryInstance.insert("Productive Projects", userId);

  const myWorkspaceFolderId = myWorkspaceData.folder_id;
  const randomThoughtsFolderId = randomThoughtsData.folder_id;
  const workspaceNotes = WORKSPACE_NOTES;
  const randomNotes = RANDOM_NOTES;

  for (let note of WORKSPACE_NOTES) {
    note["folder_id"] = myWorkspaceFolderId;
  }

  for (let note of RANDOM_NOTES) {
    note["folder_id"] = randomThoughtsFolderId;
  }

  await notesQuery.insert(workspaceNotes);

  await notesQuery.insert(randomNotes);
}
