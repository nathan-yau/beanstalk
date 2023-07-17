import ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap4-toggle/css/bootstrap4-toggle.min.css';
import TopNav from './components/TopNav/TopNav';
import BottomNav from './components/BottomNav/BottomNav';
import { Title } from './components/TopNav/TopNav.styles';
import Home from './container/Home/Home';
import Registration from './container/Registration/Registration';
import checkSessionStatus from './utils/SessionValidation';
import Login from './container/Login/Login'
import PreLoading from './container/PreLoading/PreLoading';
import Dashboard from './container/Dashboard/Dashboard';

const App = () => {
  const screenWidth = window.innerWidth;
  const [authorized, setAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [severFailed, setServerFailed] = useState(false);
  const [connectionValid, setConnectionValid] = useState(false);
  const rootElement = document.getElementById("root")

  useEffect(() => {
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
      const [name, value] = cookie.split('=').map(c => c.trim());
      if (name === 'connectionValid') {
        setConnectionValid(value === 'true');
      }
    });

    const fetchData = async () => {
      const result = await checkSessionStatus(setAuthorized);
      if (result === 'failed') {
        setServerFailed(true);
      } else {
        if (window.location.pathname === '/') {
          const timeoutId = setTimeout(() => {
            setIsLoading(false);
            rootElement ? rootElement.style.height = '110vh': null;
          }, 2000);
          return () => {
            clearTimeout(timeoutId);
          }}
        setIsLoading(false)
      }
    } 


    fetchData();
  }, []);

  if (isLoading && window.location.pathname === '/') {
    rootElement ? rootElement.style.height = '100vh': null;
    return <PreLoading serverFailed={severFailed}></PreLoading>
  } else if (isLoading) {
    return <></>
  }


  if (screenWidth >= 380) {
    return (
      <>
      <TopNav authorized={authorized}></TopNav>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home authorized={authorized}/>} />
            <Route path="/register" element={<Registration authorized={authorized} />} />
            <Route path="/signin" element={<Login authorized={authorized} />} />
            <Route path="/dashboard" element={<Dashboard authorized={authorized} />} />
          </Routes>
      </BrowserRouter>
      <BottomNav authorized={authorized}></BottomNav>
      </>
    )
  } else {
    return (
      <>
      <TopNav authorized={authorized}></TopNav>
      <Title className='text-center mx-5'>Sorry, this site is not supported on this mobile device.</Title>
      <Title className='my-3 text-center mx-5'>Please visit on a mobile device with a screen width of at least 400px.</Title>
      <BottomNav authorized={authorized}></BottomNav> 
      </>
    )
  }

}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);