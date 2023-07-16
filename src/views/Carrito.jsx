import React, { useContext, useEffect, useState } from 'react';
import Contexto from '../context/Contexto';
import { Container, Table, Button, ButtonGroup } from 'react-bootstrap';

const Carrito = () => {
  const { carrito, setCarrito, pizzas } = useContext(Contexto);
  const [total, setTotal] = useState(0);

  // Incrementa la cantidad de productos por id
  const handleIncrement = (id) => {
    const updatedCarrito = carrito.map((p) => {
      if (p.id === id) {
        return { ...p, cantidad: p.cantidad + 1 };
      }
      return p;
    });
    setCarrito(updatedCarrito);
  };

  // Decrementa la cantidad de productos por id
  const handleDecrement = (id) => {
    const updatedCarrito = carrito.map((p) => {
      if (p.id === id && p.cantidad > 0) {
        return { ...p, cantidad: p.cantidad - 1 };
      }
      return p;
    });
    setCarrito(updatedCarrito);
  };

  // Calcular el total cuando el carrito cambie por id
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

  // Setea el valor en formato de pesos
  const formatCurrency = (value) => {
    return value.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
  };

  return (
    <div>
      <Container>
        <Table unbordered>
          <tbody>
            {carrito.map((item) => {
              const pizza = pizzas.find((p) => p.id === item.id);
              return (
                <tr key={item.id}>
                  <td>
                    <img src={pizza.img} alt={pizza.name} style={{ width: '50px', height: '50px' }} />
                  </td>
                  <td>{pizza.name}</td>
                  <td>
                    <ButtonGroup>
                      <Button variant="danger" onClick={() => handleDecrement(item.id)}>
                        -
                      </Button>
                      <Button variant="light" disabled>
                        {item.cantidad}
                      </Button>
                      <Button variant="primary" onClick={() => handleIncrement(item.id)}>
                        +
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <p>Total: {formatCurrency(total)}</p>
        <Button variant="primary">Comprar</Button>
      </Container>
    </div>
  );
};

export default Carrito;
