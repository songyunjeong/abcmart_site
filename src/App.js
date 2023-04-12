import { Container, Nav, Navbar } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <div className='App'>
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

      <div className='main-bg'></div>
    </div>
  );
}

export default App;
