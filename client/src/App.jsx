import { Navbar, Welcome, Footer, Services, Transactions } from "./components";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Login from './Components/Login'
import Home from "./Components/Home";

const App = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      {/* <Navbar />
      <Welcome /> */}
    </div>
      {/* <Services />
      <Transactions />
      <Footer /> */}
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/transactions" element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  </div>
);

export default App;
