import ReactDOM from 'react-dom/client'
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import TopNav from './components/TopNav/TopNav';
import BottomNav from './components/BottomNav/BottomNav';
import { Title } from './components/TopNav/TopNav.styles';
import Home from './container/Home/Home';
import Registration from './container/Registration/Registration';

const screenWidth = window.innerWidth;

const authorized = false;

if (screenWidth >= 400) {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <>
    <TopNav authorized={authorized}></TopNav>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
    </BrowserRouter>
    <BottomNav authorized={authorized}></BottomNav>
    </>
  )
} else {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <>
    <TopNav authorized={authorized}></TopNav>
    <Title className='my-5 text-center mx-5'>Sorry, this site is not supported on this mobile device.</Title>
    <Title className='my-5 text-center mx-5'>Please visit on a mobile device with a screen width of at least 400px.</Title>
    <BottomNav authorized={authorized}></BottomNav> 
    </>
  )
}