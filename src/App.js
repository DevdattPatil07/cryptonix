import { makeStyles } from '@material-ui/core';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import CoinDetails from './Pages/CoinDetails';
import HomePage from './Pages/HomePage';

const useStyles = makeStyles(()=>({
  App:{
    backgroundColor: "#15161B",
    color: "white",
    minHeight: "100vh"
  }
}))


function App() {

  const classes = useStyles();
  return (
    <div className={classes.App}>
      <Header/>
      <Routes>
        <Route path='/' exact element={<HomePage/>}/>
        <Route path='/coin/:id' element={<CoinDetails/>}/>
      </Routes>
    </div>
  );
}

export default App;
