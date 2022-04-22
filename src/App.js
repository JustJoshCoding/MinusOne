import { makeStyles } from "@material-ui/core";
import Groups from "./Pages/Groups";
import GroupAdd from "./Pages/GroupAdd";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Alert from "./components/Alert";
import IdeaPage from "./Pages/IdeaPage";
import ProfilePage from "./Pages/ProfilePage";
import Registration from "./components/Authentication/Registration";
import Dashboard from "./Pages/Dashboard";
import Submission from "./components/Submission/Submission.tsx";
import MyGroupPage from "./Pages/MyGroupPage";
import ViewGroupPage from "./Pages/ViewGroupPage";
import ViewProfilePage from "./Pages/ViewProfilePage";
import TimelineAdd from "./components/Dashboard/Timeline/TimelineAdd";
import IdeaProposal from "./components/IdeaComponents/IdeaProposal";
import Inbox from "./Pages/InboxPage";
import ViewProposal from "./components/Inbox/ViewProposal";
import StudentsPage from "./Pages/StudentsPage";


const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));


function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
       <div className={classes.App}>
       <Header />
        <Routes>
        <Route
            path='/submission'
            element={<Submission/>}
          />
          <Route
            path='/ideas'
            element={<IdeaPage/>}
          />
          <Route
            path='/groups'
            element={<Groups/>}
          />
          <Route
            path='/groupadd'
            element={<GroupAdd/>}
          />
          <Route
            path='/profile'
            element={<ProfilePage/>}
          />
          <Route
            path='/registration'
            element={<Registration/>}
          />
          <Route
            path='/dashboard'
            element={<Dashboard/>}
          />
          <Route
            path='/mygroup'
            element={<MyGroupPage/>}
          />
          <Route
            path='/group/:id'
            element={<ViewGroupPage/>}
          />
          <Route
            path='/userprofile/:id'
            element={<ViewProfilePage/>}
          />
          <Route
            path='/timelineadd'
            element={<TimelineAdd/>}
          />
          <Route
            path='/ideaproposal/:id'
            element={<IdeaProposal/>}
          />
          <Route
            path='/inbox'
            element={<Inbox/>}
          />
          <Route
            path='/studentproposal/:id'
            element={<ViewProposal/>}
          />
          <Route
            path='/students'
            element={<StudentsPage/>}

          />
        </Routes>
      </div>
      <Alert />
    </BrowserRouter>


  );
}

export default App;
