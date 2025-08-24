import "./index.css";
import Home from "./components/Home";
import AdminPage from "./components/AdminPage";
import Upload from "./components/Upload";
import Login from "./components/Login";
import Contact from "./components/ContactComponent";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/upload" element={<Upload />} />
          <Route path="/admin-page" element={<AdminPage />} />
          <Route path="/admin/contact" element={<Footer />} />
          <Route path="/admin/contact" element={<Contact />} />
          <Route path="/admin/login" element={<Login />} />
        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
