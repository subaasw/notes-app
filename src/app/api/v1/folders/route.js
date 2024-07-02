import { getServerSession } from "@/utils/supabase/server";
import { TodoFolders } from "@/utils/supabase/db/dbQuery";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const folderQuery = new TodoFolders();

  // Get the session
  const {
    data: { session },
  } = await getServerSession();

  // Check if the user is authenticated
  if (!session?.access_token) {
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
    const dbFolders = await folderQuery.select({
      where: {
        name: "user_id",
        value: session.user.id,
      },
    });

    return new Response(JSON.stringify(dbFolders), {
      headers: {
        "Content-Type": "application/json",
      },
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
