import React, { useContext } from 'react';
import Contexto from '../context/Contexto';
import { Card, Col, Row } from 'react-bootstrap';
import PizzaCard from '../components/PizzaCard';

const Home = () => {
  const { pizzas } = useContext(Contexto);

  return (
    <div>
      {/* Este div es el banner */}
      <div>
      <Card className="bananer" style={{ borderRadius: '0' }}>
          <Card.Header style={{ color: 'white' }}>
            <h1>¡Pizzería Mamma Mia!</h1>
            <p>¡Tenemos las mejores pizzas que podrás encontrar!</p>
          </Card.Header>
          <Card.Body>
            <Card.Title></Card.Title>
          </Card.Body>
        </Card>
      <br />
      </div>

      <Row>
        {pizzas.map((p, i) => {
          return <Col key={i}><PizzaCard pizza={p} /></Col>
        })}
      </Row>
    </div>
  );
}

export default Home;