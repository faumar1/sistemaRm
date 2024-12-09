import React from "react"
import {Table} from "react-bootstrap"
import { render } from "react-dom";
class Clientes extends React.Component{
    
    constructor(props){
    super(props);

    this.state = {
         Clientes: []
                
        }   
    }
    componentDidMount(){
        fetch("https://localhost:5001/api/clientes")
        .then(resposta => resposta.json())
        .then(dados => {
            this.setState({Clientes : dados})
        })
    }
componentWillUnmount(){
    
}
  
    render(){
        return(
            <Table> 
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Cpf</th>
                        <th>contato</th>
                        <th>cep</th>
                        <th>numero</th>
                        <th>cidade</th>
                        <th>estado</th>
                        <th>Oppção</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.Clientes.map((Clientes) =>
                        <tr>
                            <td>{Clientes.nome}</td>
                            <td>{Clientes.email}</td>
                            <td>{Clientes.Cpf}</td>
                            <td>{Clientes.contato}</td>
                            <td>{Clientes.cep}</td>
                            <td>{Clientes.numero}</td>
                            <td>{Clientes.cidade}</td>
                            <td>{Clientes.estado}</td>
                            <td> Editar Excluir </td>
                        </tr>
                        )
                    }
                            
                </tbody>

                </Table>                
    )
    }
}

  export default Clientes;