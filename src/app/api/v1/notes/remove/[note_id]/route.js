import { getServerSession } from "@/utils/supabase/server";
import serverResponse from "@/utils/actions/nextServerResponse";
import { TodoNotes } from "@/utils/supabase/db/dbQuery";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

export async function DELETE(request, { params }) {
  const notesQuery = new TodoNotes();
  const noteId = params.note_id;
  // Get the session
  const {
    data: { session },
  } = await getServerSession();

  // Check if the user is authenticated
  if (!session.access_token) {
    return serverResponse(
      { error: "Unauthorized" },
      {
        status: 401,
      }
    );
  }

  const userId = session.user.id;

  try {
    const { data: noteOwnerQuery } = await notesQuery.fetch(
      `folders( user_id )`,
      {
        name: "id",
        value: noteId,
      }
    );

    if (
      noteOwnerQuery?.length === 0 ||
      noteOwnerQuery?.[0]?.folders?.user_id !== userId
    ) {
      return serverResponse(
        {
          error: "Unauthorized user attempted to delete note",
        },
        {
          status: 403,
        }
      );
    }

    // If authorized, perform the DELETE operation
    const { data: result } = await notesQuery.remove(noteId);
    return serverResponse({
      success: true,
      deletedRows: result,
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
