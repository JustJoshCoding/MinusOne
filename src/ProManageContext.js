import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const ProManage = createContext();

const ProManageContext = ({ children }) => {

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    }); 
  }, []);

  return (
    <ProManage.Provider
      value={{
        alert,
        setAlert,
        user,
      }}
    >
      {children}
    </ProManage.Provider>
  );
};

export default ProManageContext;

export const ProManageState = () => {
  return useContext(ProManage);
};
