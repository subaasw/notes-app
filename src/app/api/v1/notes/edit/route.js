import serverResponse from "@/utils/actions/nextServerResponse";
import { getServerSession } from "@/utils/supabase/server";
import { TodoNotes } from "@/utils/supabase/db/dbQuery";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const notesQuery = new TodoNotes();
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
    const data = await request.json();
    const noteId = data.note_id;
    const noteTitle = data.note_title;
    const noteContent = data.note_content;

    // First, verify the note belongs to a folder owned by the authenticated user
    const { data: noteOwnerQuery } = await notesQuery.fetch(
      `folders( user_id ) `,
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
          error: "Unauthorized user attempted to edit note",
        },
        {
          status: 403,
        }
      );
    }

    // Perform the update operation
    const { data: updatedNote } = await notesQuery.query
      .update({
        note_title: noteTitle,
        note_content: noteContent,
      })
      .eq("id", noteId);

    return serverResponse({
      message: "Note successfully updated",
      updatedNote: updatedNote,
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
