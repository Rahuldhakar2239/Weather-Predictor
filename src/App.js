import React,{useState,useEffect} from 'react';
import {useWindowScroll} from 'react-use';
import { Footer } from './Components/Footer/Footer';
import { Home } from './Components/Home/Home';
import { Navbar } from './Components/Navbar/Navbar';
import './App.css';

function App() {
  const [word, setWord] = useState("Gwalior");
  const {y:pageYOffset} = useWindowScroll();
  const [navbar,setNavbar] = useState(false);

  useEffect(()=>{
    if(pageYOffset>1){
      setNavbar(true);
    }
    else{
      setNavbar(false);
    }
  },[pageYOffset]);

  return (
    <div className="app">
      {navbar?<Navbar color={"black"} wcolor={"white"} tcolor={"tomato"} changeWord={(word)=>setWord(word)}/>:<Navbar changeWord={(word)=>setWord(word)}/>}
      <Home city={word}/>
      <Footer />
    </div>
  );
}

export default App;