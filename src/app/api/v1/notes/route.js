import serverResponse from "@/utils/actions/nextServerResponse";

export async function GET() {
  return serverResponse(
    {
      error: "Not Found",
    },
    {
      status: 404,
    }
  );
}
