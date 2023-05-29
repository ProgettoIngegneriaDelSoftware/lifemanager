import "./App.css";
// import ProtectedRoute from './ProtectedRoute';
import Registrati from "./autenticazione/registrazione";
import Login from "./autenticazione/login";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Liste from "./liste/liste";
import NuovaLista from "./liste/nuovalista";
import Lista from "./liste/lista";
import NuovoElemento from "./liste/nuovoelemento";

import Ricette from "./ricette/ricette";
import NuovaRicetta from "./ricette/nuovaricetta";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Homepage from "./components/Homepage";
import SingolaRicetta from "./ricette/singolaricetta";
import ListaCarte from "./cartefedelta/listacarte";
import NuovaCarta from "./cartefedelta/nuovacarta";
import VisualizzaCarta from "./cartefedelta/visualizzacarta";
import ModificaCarta from "./cartefedelta/modificacarta";
import EliminaCarta from "./cartefedelta/eliminacarta";

function App() {
  const Layout = () => {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  };

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

            <Route
              exact
              path="/carte"
              element={<ListaCarte />}
            />
            <Route
              exact
              path="/nuovacarta"
              element={<NuovaCarta />}
            />

            <Route
              exact
              path="/visualizzacarta/:nome"
              element={<VisualizzaCarta />}
            />
            <Route
              exact
              path="/modificacarta/:nome"
              element={<ModificaCarta />}
            />
            <Route
              exact
              path="/eliminacarta/:nome"
              element={<EliminaCarta />}
            />

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
