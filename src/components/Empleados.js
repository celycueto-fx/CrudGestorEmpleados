import React, { Component } from "react";
import './stilos.css';
import firebase from "../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import Menu from './Menu';
class Empleados extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEditar: false,
    form:{
      primerApellido: '',
      segundoApellido: '',
      primerNombre:'',
      otrosNombres:'',
      paisEmpleo:'',
      tipoId:'',
      numId:'',
      email:'',
      fechaI:'',
      estado:'',
      area:'',
      fechaR:''
    },
    id: 0
  };

  
  
  peticionGet = () => {
    firebase.child("empleados").on("value", (empleado) => {
      if (empleado.val() !== null) {
        this.setState({ ...this.state.data, data: empleado.val() });
      } else {
        this.setState({ data: [] });
      }
    });
  };

  peticionPost=()=>{
    firebase.child("empleados").push(this.state.form,
      error=>{
        if(error)console.log(error)
      });
      this.setState({modalInsertar: false});
  }

  peticionPut=()=>{
    firebase.child(`empleados/${this.state.id}`).set(
      this.state.form,
      error=>{
        if(error)console.log(error)
      });
      this.setState({modalEditar: false});
  }

  peticionDelete=()=>{
    if(window.confirm(`Estás seguro que deseas eliminar el empleado ${this.state.form && this.state.form.empleado}?`))
    {
    firebase.child(`empleados/${this.state.id}`).remove(
      error=>{
        if(error)console.log(error)
      });
    }
  }

  handleChange=e=>{
    this.setState({form:{
      ...this.state.form,
      [e.target.name]: e.target.value
    }})
    console.log(this.state.form);
  }

  seleccionarEmpleado=async(empleado, id, caso)=>{

    await this.setState({form: empleado, id: id});

    (caso==="Editar")?this.setState({modalEditar: true}):
    this.peticionDelete()

  }

  
  componentDidMount() {
    this.peticionGet();
  }
 
 
 
  render() {

    let fecha_actual = new Date();
    let anio = fecha_actual.getFullYear();
    let mes  = fecha_actual.getMonth();
    let dia  = fecha_actual.getDate();
    let dia_fecha = anio+'/'+mes+'/'+dia;
        
 
    return (
 
        <div><header> <Menu/></header>
      <center><h2>Registro de Empleados Cidenet</h2></center>  
      <div className="container">
       
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Primer Apellido:</th>
              <th>Primer Nombre:</th>
              <th>Num id: </th>   
              <th>pais: </th>    
              <th>Estado: </th>
              <th>Area: </th>
              <th>Editar Empleado</th>
              <th>Eliminar Empleado</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.data).map(i=>{
             // console.log(i);
              return <tr key={i}>
                <td>{this.state.data[i].primerApellido}</td>
                <td>{this.state.data[i].primerNombre}</td>
                <td>{this.state.data[i].numId}</td>
                <td>{this.state.data[i].paisEmpleo}</td>
                <td>{this.state.data[i].estado}</td>
                <td>{this.state.data[i].area}</td>
               <td>
                <button className="btn btn-primary" onClick={()=>this.seleccionarEmpleado(this.state.data[i], i, 'Editar')}>Editar</button> {"   "}</td>
                <td>
                  <button className="btn btn-danger" onClick={()=>this.seleccionarEmpleado(this.state.data[i], i, 'Eliminar')}>Eliminar</button>
                  </td>
              </tr>
              
            })}
          </tbody>
        </table>


        <Modal isOpen={this.state.modalInsertar}>
      <ModalHeader>Registrar Empleado</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Primer Apellido: </label>
          <br />
          <input type="text" className="form-control" name="primerApellido" onChange={this.handleChange}/>
          <br />
          <label>Segundo Apellido: </label>
          <br />
          <input type="text" className="form-control" name="segundoApellido" onChange={this.handleChange}/>
          <br />
          <label>Primer nombre: </label>
          <br />
          <input type="text" className="form-control" name="primerNombre" onChange={this.handleChange}/>
          <br />
          <label>Otros Nombres: </label>
          <input type="text" className="form-control" name="otrosNombres" onChange={this.handleChange}/>
          <br />
          <label>Pais de empleo: </label>
            <select className="form-control" name="paisEmpleo" onChange={this.handleChange}>
                            <option>Colombia</option>
                            <option>Estados Unidos</option>
             </select>
          <br />
          <label>Tipo de Identificacion: </label>
          <select  className="form-control"  
                 name="tipoId" onChange={this.handleChange}>
                          <option>Cedula de Extranjeria</option>
                          <option>Cedula de Ciudadania</option>
                          <option>Pasaporte</option>
                          <option>Permiso especial</option>
            </select>
          <br />
          <label>Numero identificacion: </label>
          <input type="text" className="form-control" name="numId" onChange={this.handleChange}/>
          <br />
          <label>Correo Electronico: </label>
          <input type="text" className="form-control" name="email" value={this.state.form.primerNombre+'.'+this.state.form.primerApellido+"@cedinet.com.co"} onChange={this.handleChange} disabled/>
          
          <br />
          <label>Estado: </label>
          <input type="text" className="form-control" value="Activo "name="estado" onChange={this.handleChange} disabled/>
          
          <br />
          <label>Area: </label>
          <select  className="form-control" className="form-control" name="area" onChange={this.handleChange}
                 name="area" onChange={this.handleChange}>
                          <option>Sistemas</option>
                          <option>Administracion</option>
                          <option>Pulicidad</option>
                          <option>Talento Humano</option>
            </select>
          <br />
          <label>Fecha de ingreso: </label>
          <input type="text" className="form-control" name="fechaI" onChange={this.handleChange}/>
          
          <br />
          <label>Fecha de Registro: </label>
          <input type="text" value={dia_fecha} className="form-control" name="fechaR" onChange={this.handleChange} disabled/>
        
        
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.peticionPost()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>this.setState({modalInsertar: false})}>Cancelar</button>
      </ModalFooter>
    </Modal>


    <Modal isOpen={this.state.modalEditar}>
      <ModalHeader>Editar Registro</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Primer Apellido: </label>
          <br />
          <input type="text" className="form-control" name="primerApellido" onChange={this.handleChange} value={this.state.form && this.state.form.primerApellido}/>
          <br />
          <label>Segundo Apellido: </label>
          <br />
          <input type="text" className="form-control" name="segundoApellido" onChange={this.handleChange} value={this.state.form && this.state.form.segundoApellido}/>
          <br />
          <label>Primer Nombre: </label>
          <br />
          <input type="text" className="form-control" name="primerNombre" onChange={this.handleChange} value={this.state.form && this.state.form.primerNombre}/>
          <br />
          <label>Otros Nombres: </label>
          <br />
          <input type="text" className="form-control" name="otrosNombres" onChange={this.handleChange} value={this.state.form && this.state.form.otrosNombres}/>
          <br />
          <label>Pais de empleo: </label>
          <br />
          <select className="form-control" name="paisEmpleo" onChange={this.handleChange}
           value={this.state.form && this.state.form.paisEmpleo}>
                            <option>Colombia</option>
                            <option>Estados Unidos</option>
             </select>
          <br />
          <br>
          <label>Tipo de identificacion: </label>
          </br>
          <select  className="form-control"  
                 name="tipoId" onChange={this.handleChange}
                 value={this.state.form && this.state.form.tipoId}>
                          <option>Cedula de Extranjeria</option>
                          <option>Cedula de Ciudadania</option>
                          <option>Pasaporte</option>
                          <option>Permiso especial</option>
            </select>
          <br />

          <label>Numero identificacion: </label>
          <input type="text" className="form-control" name="numId" onChange={this.handleChange}
          value={this.state.form && this.state.form.numId}/>
          <br />
          <label>Correo Electronico: </label>
          <input type="text" className="form-control" name="email" onChange={this.handleChange}
              value={this.state.form && this.state.form.email}/>
      
          <br />
          <label>Estado: </label>
          <input type="text" className="form-control" name="estado" onChange={this.handleChange}
          value={this.state.form && this.state.form.estado}/>
          <br />
          <label>Area: </label>
          <input type="text" className="form-control" name="area" onChange={this.handleChange}
          value={this.state.form && this.state.form.area} />
          
          <br />
          <label>Fecha de ingreso: </label>
          <input type="text" className="form-control" name="fechaI" onChange={this.handleChange}
           value={this.state.form && this.state.form.fechaI}/>
          
          <br />
          <label>Fecha de Registro: </label>
          <input type="text" className="form-control" name="fechaR" onChange={this.handleChange}
             value={this.state.form &&  this.state.form.fechaR}/>
     
          
    
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.peticionPut()}>Editar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>this.setState({modalEditar: false})}>Cancelar</button>
      </ModalFooter>
    </Modal>
    <br />
        <button className="btn btn-success" onClick={()=>this.setState({modalInsertar: true})}>Registrar Empleado </button>
        
        <br />
        <br />
      </div>
      </div>
    );
  }
}

export default Empleados;
