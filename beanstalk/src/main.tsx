import ReactDOM from 'react-dom/client'
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from './container/Home/Home';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
  </BrowserRouter>
  </>
)
