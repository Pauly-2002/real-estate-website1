import './index.css';
import Home from "./components/Home";
import FeaturedProperty from "./components/FeaturedProperty";
import PropertyModel from "./components/PropertyModel";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useState } from 'react';

function App() {

  const [selectedProperty, setSelectedProperty]= useState(null);

  return (
    <div className="App">
     <Home/>

     <FeaturedProperty setSelectedProperty={setSelectedProperty} />
     {
      selectedProperty&& (
        <PropertyModel properties={[selectedProperty]} onClose={()=> setSelectedProperty(null)} />
      )
     }
     <Contact />
     <Footer />
    </div>
  );
}

export default App;
