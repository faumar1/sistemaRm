import React from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";

class Clientes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientes: [], // Lista de clientes
      showModal: false, // Controle para exibir o modal
      modalType: "", // "adicionar" ou "editar"
      clienteAtual: {
        id: "",
        nome: "",
        email: "",
        cpf: "",
        contato: "",
        cep: "",
        numero: "",
        cidade: "",
        estado: "",
      },
    };
  }

  componentDidMount() {
    this.buscarClientes();
  }

  buscarClientes = () => {
    fetch("http://localhost:5001/api/clientes")
      .then((resposta) => resposta.json())
      .then((dados) => {
        this.setState({ clientes: dados });
      })
      .catch((erro) => console.error("Erro ao buscar clientes:", erro));
  };

  handleShowModal = (tipo, cliente = null) => {
    if (tipo === "editar" && cliente) {
      this.setState({ clienteAtual: { ...cliente }, modalType: tipo, showModal: true });
    } else if (tipo === "adicionar") {
      this.setState({
        clienteAtual: {
          id: "",
          nome: "",
          email: "",
          cpf: "",
          contato: "",
          cep: "",
          numero: "",
          cidade: "",
          estado: "",
        },
        modalType: tipo,
        showModal: true,
      });
    }
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      clienteAtual: { ...this.state.clienteAtual, [name]: value },
    });
  };

  handleSalvar = () => {
    const { modalType, clienteAtual } = this.state;
    if (!clienteAtual.nome || !clienteAtual.email || !clienteAtual.cpf) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    if (modalType === "adicionar") {
      fetch("http://localhost:5001/api/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clienteAtual),
      })
        .then(() => {
          this.buscarClientes();
          this.handleCloseModal();
        })
        .catch((erro) => console.error("Erro ao adicionar cliente:", erro));
    } else if (modalType === "editar") {
      fetch(`http://localhost:5001/api/clientes/${clienteAtual.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clienteAtual),
      })
        .then(() => {
          this.buscarClientes();
          this.handleCloseModal();
        })
        .catch((erro) => console.error("Erro ao editar cliente:", erro));
    }
  };

  handleExcluir = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      fetch(`http://localhost:5001/api/clientes/${id}`, { method: "DELETE" })
        .then(() => this.buscarClientes())
        .catch((erro) => console.error("Erro ao excluir cliente:", erro));
    }
  };

  render() {
    const { clientes, showModal, modalType, clienteAtual } = this.state;

    return (
      <div>
        <div className="mb-3">
          <Button variant="primary" onClick={() => this.handleShowModal("adicionar")}>
            Adicionar Cliente
          </Button>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Contato</th>
              <th>CEP</th>
              <th>Número</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.contato}</td>
                <td>{cliente.cep}</td>
                <td>{cliente.numero}</td>
                <td>{cliente.cidade}</td>
                <td>{cliente.estado}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => this.handleShowModal("editar", cliente)}
                  >
                    Editar
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => this.handleExcluir(cliente.id)}>
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal para Adicionar/Editar Cliente */}
        <Modal show={showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {modalType === "adicionar" ? "Adicionar Cliente" : "Editar Cliente"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={clienteAtual.nome}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={clienteAtual.email}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>CPF</Form.Label>
                <Form.Control
                  type="text"
                  name="cpf"
                  value={clienteAtual.cpf}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contato</Form.Label>
                <Form.Control
                  type="text"
                  name="contato"
                  value={clienteAtual.contato}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>CEP</Form.Label>
                <Form.Control
                  type="text"
                  name="cep"
                  value={clienteAtual.cep}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Número</Form.Label>
                <Form.Control
                  type="text"
                  name="numero"
                  value={clienteAtual.numero}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Cidade</Form.Label>
                <Form.Control
                  type="text"
                  name="cidade"
                  value={clienteAtual.cidade}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  type="text"
                  name="estado"
                  value={clienteAtual.estado}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={this.handleSalvar}>
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Clientes;
