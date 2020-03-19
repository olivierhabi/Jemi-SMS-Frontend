const getToken = () => {
  return localStorage.getItem("auth-token");
};

export default getToken;
