import { useState } from 'react';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import './App.css';
import data from './data';

function App() {
  let [shoes] = useState(data);

  return (
    <div className='App'>
      <img
        src={process.env.PUBLIC_URL + '/imgs/logo.png'}
        alt='로고 이미지'
        className='logo-img'
      />

      <Navbar
        style={{ backgroundColor: '#ee1c25', fontWeight: 'bold' }}
        variant='dark'
      >
        <Container>
          <Nav className='me-auto'>
            <Nav.Link href='#brand'>BRAND</Nav.Link>
            <Nav.Link href='#men'>MEN</Nav.Link>
            <Nav.Link href='#women'>WOMEN</Nav.Link>
            <Nav.Link href='#kids'>KIDS</Nav.Link>
            <Nav.Link href='#sale'>SALE</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <img
        className='main-bg'
        src={process.env.PUBLIC_URL + '/imgs/bg.jpg'}
        alt='배경 이미지'
      ></img>

      <Container>
        <Row>
          {shoes.map((data, i) => {
            return (
              <Col sm>
                <img
                  src={`https://codingapple1.github.io/shop/shoes${i + 1}.jpg`}
                  alt='배경 이미지'
                  width='80%'
                />
                <h4>{shoes[i].title}</h4>
                <p>{shoes[i].content}</p>
                <p>{shoes[i].price.toLocaleString()}</p>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default App;
