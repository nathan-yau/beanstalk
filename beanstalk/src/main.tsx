import ReactDOM from 'react-dom/client'
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from './container/Home/Home';
import 'bootstrap/dist/css/bootstrap.css';
import TopNav from './components/TopNav/TopNav';
import BottomNav from './components/BottomNav/BottomNav';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
  <TopNav></TopNav>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
  </BrowserRouter>
  <BottomNav></BottomNav>
  </>
)
