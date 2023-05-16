import './App.css';
// import ProtectedRoute from './ProtectedRoute';
import Registrati from './autenticazione/registrazione';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/registrati" element={<Registrati />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
