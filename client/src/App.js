import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from './pages/main';
import Detail from './pages/Detail';


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route exact path="/detail" element={<Detail />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;