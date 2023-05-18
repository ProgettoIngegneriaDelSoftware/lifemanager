import './App.css';
// import ProtectedRoute from './ProtectedRoute';
import Registrati from './autenticazione/registrazione';
import Login from './autenticazione/login';
import Header from './components/Header';
import Footer from './components/Footer';

import Liste from './liste/liste';

import { BrowserRouter as Router, Routes, Route , Outlet} from 'react-router-dom';
import Homepage from './components/Homepage';

function App() {

  const Layout = () =>{
    return(
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    )
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Layout />}>
            <Route exact path="/registrati" element={<Registrati />} />
            <Route exact path="/" element={<Login />} />
            <Route exact path="/homepage/:username" element={<Homepage />} />
            <Route exact path="/liste" element={<Liste />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
