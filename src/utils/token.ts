export const saveTokenToStorage = (token = "") => {
  localStorage.setItem("token", token);
};

export const saveTokenToCache = (token = "", client: any) => {
  client.writeData({ data: { token: token } });
};

export const saveToken = (token = "", client: any) => {
  saveTokenToStorage(token);
  if (client) {
    saveTokenToCache(token, client);
  }
};

export const getToken = () => localStorage.getItem("token");
