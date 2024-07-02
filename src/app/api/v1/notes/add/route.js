import { getServerSession } from "@/utils/supabase/server";
import { TodoFolders, TodoNotes } from "@/utils/supabase/db/dbQuery";
import serverResponse from "@/utils/actions/nextServerResponse";

export const dynamic = "force-dynamic";

// Helper function to create a delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchNotes(folderId) {
  const notesQuery = new TodoNotes();
  const { data: result } = await notesQuery.fetch("*", {
    name: "folder_id",
    value: folderId,
  });

  return result;
}

export async function POST(request) {
  const folderQuery = new TodoFolders();
  const notesQuery = new TodoNotes();
  const data = await request.json();

  // Get the session
  const {
    data: { session },
  } = await getServerSession();

  const userId = session.user.id;

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
    // First, verify the folder belongs to the authenticated user
    const { data: folders } = await folderQuery.select({
      params: "user_id",
      where: {
        name: "folder_id",
        value: data.folder_id,
      },
    });

    if (folders?.length === 0 || folders?.[0].user_id !== userId) {
      return serverResponse(
        {
          error: "Unauthorized user attempted to add note",
        },
        {
          status: 403,
        }
      );
    }

    // Perform the insert operation
    await notesQuery.insert({
      folder_id: data.folder_id,
      note_title: data.note_title,
      note_content: data.note_content,
    });

    // Fetch notes with retry logic
    const result = await fetchNotes(data.folder_id);

    return serverResponse(
      {
        message: "Note successfully created",
        notes: result,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return serverResponse(
      {
        error: "Internal Server Error",
      },
      {
        status: 501,
      }
    );
  }
}
