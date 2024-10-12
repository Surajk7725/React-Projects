import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Landing from './components/landing';
import Login from './components/login';
import Register from './components/register';
import Forgot from './components/forgot';
import Home from './components/home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/forget-password" element={<Forgot />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
