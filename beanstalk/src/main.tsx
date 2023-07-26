import ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap4-toggle/css/bootstrap4-toggle.min.css';
import TopNav from './components/TopNav/TopNav';
import BottomNav from './components/BottomNav/BottomNav';
import Home from './container/Home/Home';
import Registration from './container/Registration/Registration';
import checkSessionStatus from './utils/SessionValidation';
import Login from './container/Login/Login'
import PreLoading from './container/PreLoading/PreLoading';
import Dashboard from './container/Dashboard/Dashboard';
import PageNotFound from './container/PageNotFound/PageNotFound';
import Logout from './container/Logout/Logout';

const App = () => {
  const [authorized, setAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [severFailed, setServerFailed] = useState(false);
  const [userData, setUserData] = useState(null);
  
  const autoUpdate = async () => {
    setInterval(async () => {
      console.log("auto update")
    }, 10000)
  }
  useEffect(() => {
    const cookies = document.cookie.split(';');
    var connectionValid = false;
    cookies.forEach(cookie => {
      const [name, value] = cookie.split('=').map(c => c.trim());
      if (name === 'connectionValid' && value === 'true') {
        connectionValid = true
        autoUpdate()
      }
    }
    );


    const fetchData = async () => {
      const result = await checkSessionStatus(setAuthorized, setUserData);

      if (result === 'failed') {
        setServerFailed(true);
      } else {
        if (window.location.pathname === '/' && !connectionValid) {
          const timeoutId = setTimeout(() => {
            setIsLoading(false);
          }, 2000);
          return () => {
            clearTimeout(timeoutId);
          }}
        setIsLoading(false)
      }
    } 


    fetchData();
  }, []);

  if (isLoading) {
    return <PreLoading serverFailed={severFailed}></PreLoading>
  } else if (isLoading) {
    return <></>
  }

  return (
    <>
    
    <TopNav authorized={authorized} userInfo={userData}></TopNav>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home authorized={authorized}/>} />
          <Route path="/register" element={<Registration authorized={authorized} />} />
          <Route path="/signin" element={<Login authorized={authorized} />} />
          <Route path="/dashboard" element={<Dashboard authorized={authorized} />} />
          <Route path="/logout" element={<Logout authorized={authorized} />} />
          <Route path='*' element={<PageNotFound />}/>
        </Routes>
        <div style={{height: "150px"}}></div>
    </BrowserRouter>
    <BottomNav authorized={authorized}></BottomNav>
    </>
  )

}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);