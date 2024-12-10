// import { dividerClasses } from '@mui/material';
import { dividerClasses } from '@mui/material';
import './App.css';
import SignInWithGoogle from './components/Auth/SignInWithGoogle'
import Dashboard from './components/Pages/Dashboard'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './components/Pages/ProfilePage';
import SharePage from './components/Pages/SharePage';



function App() {
  return (
   
    <Router>
      <Routes>
        <Route path='/' element={ <SignInWithGoogle/>}/>
        <Route path='/Dashboard' element={ <Dashboard/> }/>
        <Route path='/ProfilePage' element={ <ProfilePage/> }/>
        <Route path='/SharePage' element={ <SharePage/> } />
        

      </Routes>
    </Router>
   
    
  );
}

export default App;
