import './App.css';
// import ProtectedRoute from './ProtectedRoute';
import Registrati from './autenticazione/registrazione';
import Login from './autenticazione/login';
import Header from './components/Header';
import Footer from './components/Footer';

import Liste from './liste/liste';

import { BrowserRouter as Router, Routes, Route , Outlet} from 'react-router-dom';
import Homepage from './components/Homepage';
import Context from './components/Context';

function App() {

  let userInfo={
    id: '',
    email: '',
    token: '',
    message: ''
  }

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
      <Context.Provider value={userInfo}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Layout />}>
              <Route exact path="/registrati" element={<Registrati />} />
              <Route exact path="/" element={<Login />} />
              <Route exact path="/homepage" element={<Homepage />} />
            <Route exact path="/liste" element={<Liste />} />
            </Route>
          </Routes>
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
