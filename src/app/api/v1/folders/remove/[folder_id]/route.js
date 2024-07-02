import { getServerSession } from "@/utils/supabase/server";
import serverResponse from "@/utils/actions/nextServerResponse";
import { TodoFolders, TodoNotes } from "@/utils/supabase/db/dbQuery";

export const dynamic = "force-dynamic";

export async function DELETE(request, { params }) {
  const folderId = params.folder_id;
  const folderQuery = new TodoFolders();
  const notesQuery = new TodoNotes();

  // Get the session
  const {
    data: { session },
  } = await getServerSession();

  const user_id = session.user.id;

  // Check if the user is authenticated
  if (!session.access_token) {
    return serverResponse(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const { data: folderOwnerQuery } = await folderQuery.select({
      params: "user_id",
      where: {
        name: "folder_id",
        value: folderId,
      },
    });

    if (
      folderOwnerQuery?.length === 0 ||
      folderOwnerQuery?.[0]?.user_id !== user_id
    ) {
      return serverResponse(
        {
          error: "Unauthorized user attempted to delete folder",
        },
        {
          status: 403,
        }
      );
    }

    // Step 1: Fetch all notes associated with the folder
    const { data: notes } = await notesQuery.fetch("id", {
      name: "folder_id",
      value: folderId,
    });

    // If authorized, perform the DELETE operation
    if (notes.length > 0) {
      await notesQuery.removeByFolderId(folderId);
    }

    // Step 3: Delete the folder
    const { data: result } = await folderQuery.remove(folderId);

    return serverResponse({
      success: true,
      deletedNotes: notesQuery.length,
      deletedFolder: result,
    });
  } catch (error) {
    return serverResponse(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
