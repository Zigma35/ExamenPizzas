import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import Contexto from '../context/Contexto';
import { Link } from 'react-router-dom';

const BarraNav = () => {
  const { carrito, pizzas } = useContext(Contexto);
  const [total, setTotal] = useState(0);

  // Función para formatear el valor como dinero
  const formatCurrency = (value) => {
    return value.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
  };

  // Funcion para actualizar el total del carrito
  useEffect(() => {
    const calculateTotal = () => {
      let sum = 0;
      carrito.forEach((item) => {
        const pizza = pizzas.find((p) => p.id === item.id);
        sum += pizza.price * item.cantidad;
      });
      setTotal(sum);
    };

    calculateTotal();
  }, [carrito, pizzas]);

  return (
    <div>
      <Navbar className="bg-darkgreen" variant="dark">
        <Container>
          <Link to="/" className="navbar-brand">
            🍕 Pizzeria ¡Mamma Mia!
          </Link>
          
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Link to="/carrito" className="nav-link">
                🛒 {formatCurrency(total)}
              </Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default BarraNav;
