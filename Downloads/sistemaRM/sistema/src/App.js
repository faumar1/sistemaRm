import './App.css';
import Home from './componetes/Home';
import Clientes from './componetes/Clientes';
import Agendamento from './componetes/Agendamento';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <h1>Sistema RM</h1>
      <BrowserRouter>
        <Navbar bg="primary" data-bs-theme="dark">
          <Container>
            <Navbar.Brand as={Link} to="/Home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/Home">Home</Nav.Link>
              <Nav.Link as={Link} to="/Clientes">Clientes</Nav.Link>
              <Nav.Link as={Link} to="/Agendamento">Agendamento</Nav.Link>
             
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Clientes" element={<Clientes />} />
          <Route path="/Agendamento" element={<Agendamento />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
