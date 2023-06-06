import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Home from "./pages/Home";
import AddOrEdit from "./pages/AddOrEdit";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addEvent" element={<AddOrEdit />} />
          <Route path="/update/:id" element={<AddOrEdit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
