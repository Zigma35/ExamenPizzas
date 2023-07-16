import React, { useContext, useState } from 'react';
import { Button, Card, ListGroup, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Contexto from '../context/Contexto';

const PizzaCard = ({ pizza }) => {
  const { agregarAlCarrito } = useContext(Contexto);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  //Funcion para mostrar la pizza con su ID
  const navegarPizza = (id) => {
    navigate(`/pizza/${id}`);
  };

  // Función para setear el precio con formato CLP $x.xxx.xxx
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
  };

  // Funcion para el spinner
  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: '25vw', margin: '1em' }}>
        {loading ? (
          <div className="spinner-container justify-content-center mt-4">
            <Spinner animation="border" variant="success" />
          </div>
        ) : null}
        <Card.Img variant="top" src={pizza.img} onLoad={handleImageLoad} />
        <Card.Body>
          <Card.Title>
            <h1>{pizza.name}</h1>
          </Card.Title>
          <Card.Text></Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            <h5>
              Ingredientes:
              <br />
            </h5>
            <ul className={`ingrediente`}>
              {pizza.ingredients.map((ing, i) => {
                return <li key={i}>🍕 {ing} </li>;
              })}
            </ul>
          </ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <h1>{formatCurrency(pizza.price)}</h1>
          <br />
          <Button variant="info" className="text-white" onClick={() => navegarPizza(pizza.id)}>
            Ver mas 👀
          </Button>
          <Button variant="danger" style={{ marginLeft: '2em' }} onClick={() => agregarAlCarrito(pizza.id)}>
            Añadir 🛒
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PizzaCard;