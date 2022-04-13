import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { getDocs, getDoc, collection, doc } from "firebase/firestore";

const ProManage = createContext();

// the context for the entire application
const ProManageContext = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  // global states used in the application
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [availIdeas, setAvailIdeas] = useState([]);
  const [groups, setGroups] = useState([]);
  const [groupInfo, setGroupInfo] = useState(null);
  const [timeline, setTimeline] = useState([]);

  const [currentAccProps, setCurrentAccProps] = useState([]);
  const [pendingProposals, setPendingProposals] = useState([]);
  const [students, setStudents] = useState([]);

  const [userInfo, setUserInfo] = useState({
    ID: "",
    email: "",
    firstname: "",
    groupName: "",
    initials: "",
    lastname: "",
    skills: []
  });

  // check if user is an admin and get user info
  const checkAdminStatus = async (newUser) => {
    const userRef = doc(db, "users", newUser?.uid);
    setLoading(true);
    const userSnap = await getDoc(userRef);
    setUserInfo(userSnap.data())
    setLoading(false);
    if (userSnap.data().isAdmin){
      setIsAdmin(true)
    }
  }

  useEffect(() => {
    var getGroupInfo = () => {
      const group = groups.find(group => group.groupName === userInfo.groupName);
      setGroupInfo(group);
    }
    getGroupInfo();
  }, [groups, userInfo, user])
  

  useEffect(() => {
    //database references
    const ideaRef = collection(db, "Available Ideas");
    const groupRef = collection(db, "Groups");
    const ideaRef2 = collection(db, "Current Proposals");
    const pendRef = collection(db, "Pending Proposals");
    const studsRef = collection(db, "users");

    // get all current students proposals
    const getAllStudentAccounts = async  () => {
      setLoading(true);
      const data = await getDocs(studsRef);
      if (data) {
        setStudents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      }
      else {
        console.log("No proposals pending");
      }
    };

    // get pending proposals
    const getPendingProposals = async  () => {
      setLoading(true);
      const data = await getDocs(pendRef);
      if (data) {
        setPendingProposals(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      }
      else {
        console.log("No proposals pending");
      }
    };

    // get current accepted proposals
    const getCurrAccepted = async  () => {
      setLoading(true);
      const data = await getDocs(ideaRef2);
      if (data) {
        setCurrentAccProps(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      }
      else {
        console.log("No accepted proposals");
      }
    };
    // get available ideas
    const getAvailIdeas = async  () => {
      setLoading(true);
      const data = await getDocs(ideaRef);
      if (data) {
        setAvailIdeas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      }
      else {
        console.log("No Available Ideas");
      }
    };
    // get all group info
    const getGroups = async  () => {
      const data = await getDocs(groupRef);
      if (data) {
        setGroups(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
      else {
        console.log("No Groups Available");
      }
    };

    getAvailIdeas();
    getGroups();
    getCurrAccepted();
    getPendingProposals();
    getAllStudentAccounts();
  }, [])

  useEffect(() => {
    
    const timelineRef = collection(db, "Timeline");

    const getTimeline = async  () => {
      const data = await getDocs(timelineRef);
      if (data) {
        setTimeline(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
      else {
        console.log("No Timeline Available");
      }
    };
    
  
    
    getTimeline();
  }, [])
  
 
  // setting the user state to the user that is currently logged in or null if no user
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
        groupInfo,
        timeline,

        loading,
        currentAccProps,
        pendingProposals,
        students

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
