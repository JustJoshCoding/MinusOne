import { makeStyles } from "@material-ui/core";
import Homepage from "./Pages/HomePage";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header";
import Alert from "./components/Alert";
import IdeaPage from "./Pages/IdeaPage";

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
        <Route path="/" component={Homepage} exact />
        <Route path="/idea" component={IdeaPage} exact />
      </div> 
      <Alert />
    </BrowserRouter>
  );
}

export default App;
