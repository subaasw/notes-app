const serverResponse = (
  data = "",
  options = {
    status: 200,
  }
) => {
  return new Response(JSON.stringify(data), {
    status: options.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default serverResponse;
