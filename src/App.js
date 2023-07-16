import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import Home from './views/Home';
import Pizza from './views/Pizza';
import Carrito from './views/Carrito';
import Contexto from './context/Contexto';
import BarraNav from './components/BarraNav';
import 'bootstrap/dist/css/bootstrap.min.css';





function App() {
  const [pizzas, setPizzas] = useState([]);
  const [total, setTotal] = useState(0);
  const [carrito, setCarrito] = useState([]);
  
  const agregarAlCarrito =(id) => {
    const index = carrito.findIndex((p) => p.id === id);
    if (index >= 0 ) {
      carrito[index].cantidad++;
      setCarrito ([...carrito]);
    } else {
      carrito.push({id:id, cantidad:1});
      setCarrito([...carrito]);
    }
  }
  const obtenerDatos = async () => {
    const res = await fetch('http://localhost:3000/pizzas.json');
    const datos = await res.json();
    setPizzas([...datos]);
  }
  
  useEffect(() => {
    obtenerDatos();
  }, [])
  

  return (
    <div className="App">
      <Contexto.Provider value={{pizzas, total, setTotal, agregarAlCarrito, setCarrito, carrito}}>
      <BrowserRouter>
      <BarraNav></BarraNav>   
        <Routes>
        <Route path="/" element={<Home></Home>} ></Route>
        <Route path="/pizza/:id" element={<Pizza></Pizza>} ></Route>
        <Route path="/carrito" element={<Carrito></Carrito>} ></Route>
        <Route path="*" element={<h1>Página invalida</h1>} ></Route>
      </Routes>
      </BrowserRouter>
      </Contexto.Provider>
    </div>
  );
}

export default App;
