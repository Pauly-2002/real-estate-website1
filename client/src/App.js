import "./index.css";
import Home from "./components/Home";
import AdminPage from "./components/AdminPage";
import Upload from "./components/Upload";
import FeaturedProperty from "./components/FeaturedProperty";
import PropertyModel from "./components/PropertyModel";
import Login from "./components/Login";
import Contact from "./components/ContactComponent";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [selectedProperty, setSelectedProperty] = useState(null);

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
          <Route
            path="/admin/featuredproperty"
            element={
              <FeaturedProperty setSelectedProperty={setSelectedProperty} />
            }
          />
        </Routes>
      </Router>
      {selectedProperty && (
        <PropertyModel
          properties={[selectedProperty]}
          onClose={() => setSelectedProperty(null)}
        />
      )}
      {/* <FeaturedProperty setSelectedProperty={setSelectedProperty} />
      <Contact />
      <Footer /> */}
    </div>
  );
}

export default App;
