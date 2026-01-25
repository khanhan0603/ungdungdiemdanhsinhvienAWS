/*import { createContext, useEffect, useState } from "react";
import { getInfo } from "../services/authService";

export const storeContext = createContext();

export const StoreProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getInfo()
        .then((res) => {
          setUserInfo(res);
        })
        .catch(() => {
          // Token hết hạn hoặc sai → logout tự động
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUserInfo(null);
        });
    }
  }, []);
useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    getInfo().then(setUserInfo);
  }
}, []);

  return (
    <storeContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </storeContext.Provider>
  );
};
*/