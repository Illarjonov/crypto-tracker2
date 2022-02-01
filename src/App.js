import Header from './Components/Header'
import HomePage from './Pages/HomePage'
import CoinPage from "./Pages/CoinPage";
import './App.css';
import {Route, Routes, useParams} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import {makeStyles} from "@material-ui/core";


function App() {
  let {id} = useParams();
//materialUI make styles here
    const useStyles = makeStyles(()=>({
        App: {
            backgroundColor: "#14161a",
            color: 'white',
            minHeight: "100vh"
        },

    }))
//use made styles
    const classes = useStyles();


//may be replace  *as Router }
  return (
    <BrowserRouter>
        <div className={classes.App}>
          <Header />

              <Routes>
                <Route path = '/' element = {<HomePage/>}/>
                <Route path = '/coins/:id' element={<CoinPage/>}/>
              </Routes>

        </div>
    </BrowserRouter>
  );
}

export default App;
