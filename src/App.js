import Header from './Components/Header'
import HomePage from './Pages/HomePage'
import CoinPage from "./Pages/CoinPage";
import './App.css';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import {makeStyles} from "@material-ui/core";
import Alert from "./Components/Alert";


function App() {
//materialUI make styles here.
    const useStyles = makeStyles(()=>({
        App: {
            backgroundColor: "#14161a",
            color: 'white',
            minHeight: "100vh"
        },
    }));

//use made styles
    const classes = useStyles();

  return (
    <BrowserRouter>
        <div className={classes.App}>
              <Header />
                  <Routes>
                    <Route path = '/' element = {<HomePage/>}/>
                    <Route path = '/coins/:id' element={<CoinPage/>}/>
                  </Routes>
        </div>
        <Alert open = {false}/>
    </BrowserRouter>
  );
}

export default App;
