import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Contexto from '../context/Contexto';
import { Button, Card } from 'react-bootstrap';


const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
};

const Pizza = () => {
  const { id } = useParams();
  const { pizzas } = useContext(Contexto);
  const pizza = pizzas.find((p) => p.id === id);
  const { agregarAlCarrito } = useContext(Contexto);
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: '45vw', margin: '1em' }}>
        <Card.Img variant="left" src={pizza.img} />
        <Card.Body>
          <Card.Title><h1> {pizza.name} </h1></Card.Title>
          <Card.Text>
            {pizza.desc}
          </Card.Text>
          <ul className={`ingrediente`}>
            <h2>Ingredientes:</h2>
            {pizza.ingredients.map((ing, i) => {
              return <li key={i}>🍕 {ing} </li>;
            })}
            <div>
            <h3 className="d-flex justify-content-center">Precio: <br />
            </h3>
            <h2 className="d-flex justify-content-center">
              {formatCurrency(pizza.price)}
            </h2>
            </div>
          </ul>
          <Button variant="danger" style={{ marginLeft: '2em' }} onClick={() => agregarAlCarrito(pizza.id)}>
            Añadir 🛒
          </Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Pizza