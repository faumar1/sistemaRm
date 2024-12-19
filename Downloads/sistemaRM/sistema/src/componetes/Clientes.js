import React from "react";
import { Table } from "react-bootstrap";

class Clientes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientes: [] // Armazena a lista de clientes
    };
  }

  componentDidMount() {
    // Requisição para o backend para buscar a lista de clientes
    fetch("http://localhost:5001/api/clientes")
      .then((resposta) => resposta.json())  // Convertendo a resposta para JSON
      .then((dados) => {
        this.setState({ clientes: dados });  // Atualizando o estado com os dados recebidos
      })
      .catch((erro) => {
        console.error("Erro ao buscar clientes:", erro); // Exibindo erros no console, se houver
      });
  }

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Cpf</th>
            <th>Contato</th>
            <th>Cep</th>
            <th>Número</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapeando os clientes para renderizar as linhas da tabela */}
          {this.state.clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.cpf}</td>
              <td>{cliente.contato}</td>
              <td>{cliente.cep}</td>
              <td>{cliente.numero}</td>
              <td>{cliente.cidade}</td>
              <td>{cliente.estado}</td>
              <td>Editar Excluir</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default Clientes;
