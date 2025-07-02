import './index.css';
import Home from "../src/components/Home";
import FeaturedProperty from "../src/components/FeaturedProperty";
import PropertyModel from "../src/components/PropertyModel";
import Contact from "../src/components/Contact";
import Footer from "../src/components/Footer";
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
