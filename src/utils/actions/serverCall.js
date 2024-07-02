const serverCall = async (URL, options = { method: "GET" }) => {
  return await fetch(URL, options);
};

const postRequest = async (URL, data = {}) => {
  return await serverCall(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const deleteRequest = async (URL) => {
  return await serverCall(URL, {
    method: "DELETE",
  });
};

export default serverCall;
export { postRequest, deleteRequest };
