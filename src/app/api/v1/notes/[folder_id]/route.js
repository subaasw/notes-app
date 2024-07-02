import serverResponse from "@/utils/actions/nextServerResponse";
import { TodoFolders, TodoNotes } from "@/utils/supabase/db/dbQuery";
import { getServerSession } from "@/utils/supabase/server";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const folderInstance = new TodoFolders();
  const notesQuery = new TodoNotes();
  const folderId = params.folder_id;
  // Get the session
  const {
    data: { session },
  } = await getServerSession();

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
    const { data } = await folderInstance.select({
      params: "user_id",
      where: {
        name: "folder_id",
        value: folderId,
      },
    });

    if (!data.length) {
      return serverResponse(
        {
          notes: [],
        },
        {
          status: 403,
        }
      );
    }

    const { data: notesData } = await notesQuery.fetch("*", {
      name: "folder_id",
      value: folderId,
    });

    if (!notesData) {
      return serverResponse(
        {
          notes: [],
        },
        {
          status: 404,
        }
      );
    }

    return serverResponse({
      notes: notesData,
    });
  } catch (error) {
    return serverResponse(
      {
        error: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}
