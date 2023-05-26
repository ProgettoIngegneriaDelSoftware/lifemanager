import './App.css';
// import ProtectedRoute from './ProtectedRoute';
import Registrati from './autenticazione/registrazione';
import Login from './autenticazione/login';
import Header from './components/Header';
import Footer from './components/Footer';

import Liste from './liste/liste';
import NuovaLista from './liste/nuovalista'
import Lista from './liste/lista';
import NuovoElemento from './liste/nuovoelemento'

import Ricette from './ricette/ricette'
import NuovaRicetta from './ricette/nuovaricetta'
import SingolaRicetta from './ricette/singolaricetta'

import Movimenti from './movimenti/movimenti';
import NuovoMovimento from './movimenti/nuovomovimento';
import VisualizzaMovimento from './movimenti/visualizzamovimento';
import EliminaMovimento from './movimenti/eliminamovimento';

import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Homepage from './components/Homepage';
import ModificaMovimento from './movimenti/modificamovimento';
import VisualizzaPerCategorie from './movimenti/visualizzapercategorie';
import Entrate from './movimenti/Entrate';
import Uscite from './movimenti/Uscite';


function App() {

  let userInfo = {
    id: '',
    email: '',
    token: '',
    message: 'hjjh'
  }

  const Layout = () => {
    return (
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
            <Route exact path="/homepage" element={<Homepage />} />
            <Route exact path="/liste" element={<Liste />} />
            <Route exact path="/nuovalista" element={<NuovaLista />} />
            <Route exact path="/liste/:nomelista" element={<Lista />} />
            <Route
              exact
              path="/:nomelista/nuovoelemento"
              element={<NuovoElemento />}
            />
            <Route exact path="/ricette" element={<Ricette />} />
            <Route exact path="/nuovaricetta" element={<NuovaRicetta />} />
            <Route
              exact
              path="/ricette/:nomericetta"
              element={<SingolaRicetta />}
            />
            <Route exact path="/movimenti" element={<Movimenti />} />
            <Route exact path="/NuovoMovimento" element={<NuovoMovimento />} />
            <Route path="/eliminamovimento/:id" element={<EliminaMovimento />} />
            <Route path="/visualizzamovimento/:id" element={<VisualizzaMovimento />} />
            <Route path="/modificamovimento/:id" element={<ModificaMovimento />} />
            <Route path="/visualizzapercategorie/:nome" element={<VisualizzaPerCategorie />} />
            <Route path="/Entrate" element={<Entrate />} />
            <Route path="/Uscite" element={<Uscite />} />

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
