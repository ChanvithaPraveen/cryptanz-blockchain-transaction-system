import React from "react";
import Navbar from "./Navbar";
import Welcome from "./Welcome";
import Transactions from "./Transactions";
import Services from "./Services";
import Footer from "./Footer";

const Home = ()=>{
return(
    <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      <Welcome />
    </div>
      <Services />
      <Transactions />
      <Footer />
  </div>
)

}

export default Home;