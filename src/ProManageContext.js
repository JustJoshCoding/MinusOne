import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { getDocs, getDoc, collection, doc, onSnapshot } from "firebase/firestore";

const ProManage = createContext();

// the context for the entire application
const ProManageContext = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [availIdeas, setAvailIdeas] = useState([]);
  const [groups, setGroups] = useState([]);
  const [userInfo, setUserInfo] = useState({
    ID: "",
    email: "",
    firstname: "",
    groupName: "",
    initials: "",
    lastname: "",
    skills: []
  });

  const checkAdminStatus = async (newUser) => {
    const userRef = doc(db, "users", newUser?.uid);
    const userSnap = await getDoc(userRef);
    setUserInfo(userSnap.data())
    if (userSnap.data().isAdmin){
      setIsAdmin(true)
    }
  }
 
  useEffect(() => {
    const groupRef = collection(db, "Groups");
    
    const getGroups = async  () => {
      const data = await getDocs(groupRef);
      if (data) {
        setGroups(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
      else {
        console.log("No Groups Available, Please check back later");
      }
    };
    getGroups()
    
  }, []);
  
  // setting the user state to the user that is currently logged in
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        checkAdminStatus(user);
        setUser(user);
      }
      else {
        setIsAdmin(false)
        setUser(null);
        setUserInfo({
          ID: "",
          email: "",
          firstname: "",
          groupName: "",
          initials: "",
          lastname: "",
          skills: []
        });
      }
    }); 
  }, []);

  // loading available ideas from the firestore database
  useEffect(() => {
    const ideaRef = collection(db, "Available Ideas");
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
  }, []);  

  return (
    <ProManage.Provider
      value={{
        alert,
        setAlert,
        user,
        userInfo,
        groups,
        setGroups,
        setAvailIdeas,
        availIdeas,
        isAdmin,
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
