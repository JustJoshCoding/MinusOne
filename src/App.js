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
import Submission from "./Pages/Submission.tsx";
import MyGroupPage from "./Pages/MyGroupPage";
import ViewGroupPage from "./Pages/ViewGroupPage";
import ViewProfilePage from "./Pages/ViewProfilePage";
import TimelineAdd from "./Pages/TimelineAdd";
import Dropzone from "./components/SubmissionBox2/Dropzone";
import IdeaProposal from "./components/IdeaComponents/IdeaProposal";
import SubmissionsPage from "./Pages/SubmissionsPage";
import ViewProposal from "./components/Submission/ViewProposal";
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
            path='/submission'
            element={<SubmissionsPage/>}
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
