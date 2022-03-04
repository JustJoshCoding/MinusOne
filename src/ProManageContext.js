import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { getDocs, collection } from "firebase/firestore";

const ProManage = createContext();

// the context for the entire application
const ProManageContext = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [user, setUser] = useState(null);
  const [availIdeas, setAvailIdeas] = useState([]);
  console.log(availIdeas)
  // setting the user state to the user that is currently logged in
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    }); 
  }, []);

  // loading available ideas from the firestore database
  useEffect(() => {
    const ideaRef = collection(db, "Available Ideas");
    if (user) {
      const getAvailIdeas = async  () => {
        const data = await getDocs(ideaRef);
        if (data) {
          setAvailIdeas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        else {
          console.log("No Available Ideas, Please check back later");
        }
      };
      getAvailIdeas()
    }
  }, [user]);
  
  return (
    <ProManage.Provider
      value={{
        alert,
        setAlert,
        user,
        availIdeas,
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
