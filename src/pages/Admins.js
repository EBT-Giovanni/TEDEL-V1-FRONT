import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { baseURL } from '../config/config';
import Tabla from '../components/Tabla';
import DynamicForm from '../components/DynamicForm';
import {BsPencil} from 'react-icons/bs';
import {RiDeleteBinFill} from 'react-icons/ri';
import {IoMdPersonAdd} from 'react-icons/io';
import Swal from 'sweetalert2';
import moment from 'moment';


//URL PARA CREAR ADMIN

const urlCreate = baseURL+"api/admin/crear";

const urlEdit = baseURL+"api/admin/editar";

const initialFormValues = [{

  nombre: "",
  fechaCumple: "",
  usuario: "",
  passwordMD5: "",
  correoAdmin: "",
  idDpto: "",
  idPuesto: "",
  idSucursal: "",
  fechaIngreso: "",
  idEmpresa: ""
  // foto: []

}];



//===================================================================

function Admins() {

  //VARIABLES PARA RECIBIR EL TOKEN

  const [token, setToken] = useState('');

  const [data, setData] = useState([]);

  const [formValues, setFormValues] = useState(initialFormValues)

  // COLUMNAS DE LA TABLA

  const colums = [

  {
    name: 'ID',
    selector: row => row.idUser,
    sortable: true
  },
  {
    name: 'NOMBRE',
    selector: row => row.nombre,
    sortable: true
  },
  {
    name: 'USUARIO',
    selector: row => row.usuario,
    sortable: true
  },
  {
    name: 'CORREO',
    selector: row => row.correoAdmin,
    sortable: true
  },
  {
    name: 'DEPARTAMENTO',
    selector: row => row.nombreDpto,
    sortable: true
  },
  {
    name: "",
    button: true,
    cell: (row) => (
      
        <div className="input-group">
          <button className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#modalEditarAdmin" onClick={() => handleEdit(row.idUser)} type="button"><BsPencil/></button>
          <button className="btn btn-outline-danger" type="button" onClick={() => handleDelete(row.idUser)}><RiDeleteBinFill/></button>
        </div>
     
    ),
  },

]

  //FUNCION PARA BORRAR ADMIN

  const handleDelete = (id) => {

    Swal.fire({
      title: 'Estas seguro de borrar este registro?',
      text: "Esta accion no podra ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {

        axios.delete(`${baseURL}api/admin/delete/${id}`,{
  
          headers: {"access-token": token}
      
        })
        .then(result => {
    
          if(result.data.success == true)
          {

            Swal.fire({
              icon: 'success',
              title: 'Se ha eliminado correctamente!',
            })
            .then(() => {
    
              window.location.reload(false);
    
            })

          }
    
        })
        .catch(error => {
      
          console.log(error)
      
        })

      }

    })

  }

  //FUNCION PARA MOSTRAR MODAL AL EDITAR

  const handleEdit = (id) => {

    axios.get(`${baseURL}api/admin/id/${id}`,{
  
      method: "GET",
      headers: {"access-token": token},
  
    })
    .then(result => {

      if(result.data.success == true)
      {

        const admin = JSON.parse(JSON.stringify(result.data.result), (key, value) => {
          // Verificar si el valor es una fecha y, en caso afirmativo, formatearla usando moment.js
          if ((key === 'fechaCumple' || key === 'fechaIngreso') && moment(value, moment.ISO_8601, true).isValid()) {
            return moment(value).format('YYYY-MM-DD');
          }
          // De lo contrario, devolver el valor sin modificar
          return value;
        });

        //const update = [admin]
        setFormValues(admin)
      }

    })
    .catch(error => {
  
      console.log(error)
  
    })

  };

  //FUNCION PARA RECIBIR LOS DATOS

  useEffect(() => {

    setToken(Cookies.get('jwtoken'));
  
    axios.get(`${baseURL}api/admins`,{
  
      method: "GET",
      headers: {"access-token": token}
  
    })
    .then(result => {

      if(result.data.success == true)
      {
        setData(result.data.result);
      }

    })
    .catch(error => {
  
      console.log(error)
  
    })

  },[token])

  //TRAER TODOS LOS DEPARTAMENTOS

  const [departamentos, setDepartamentos] = useState('');

  useEffect(() => {

    axios.get(`${baseURL}api/departamentos`,{
  
      method: "GET",
      headers: {"access-token": token}
  
    })
    .then(result => {

      if(result.data.success == true)
      {
        setDepartamentos(result.data.result);
      }
      // else
      // {
      //   navigate('/')
      // }
  
    })
    .catch(error => {
  
      console.log(error)
  
    })

  }, [token])

  //TRAER TODOS LOS PUESTOS

  const [puestos, setPuestos] = useState('');

  useEffect(() => {

    axios.get(`${baseURL}api/puestos`,{
  
      method: "GET",
      headers: {"access-token": token}
  
    })
    .then(result => {

      if(result.data.success == true)
      {
        setPuestos(result.data.result);
      }
  
    })
    .catch(error => {
  
      console.log(error)
  
    })

  }, [token])

  //TRAER TODAS LAS SUCURSALES

  const [sucursales, setSucursales] = useState('');

  useEffect(() => {

    axios.get(`${baseURL}api/sucursales`,{
  
      method: "GET",
      headers: {"access-token": token}
  
    })
    .then(result => {

      if(result.data.success == true)
      {
        setSucursales(result.data.result);
      }
  
    })
    .catch(error => {
  
      console.log(error)
  
    })

  }, [token])

  //TRAER TODAS LAS SUCURSALES

  const [empresas, setEmpresas] = useState('');

  useEffect(() => {

    axios.get(`${baseURL}api/empresas`,{
  
      method: "GET",
      headers: {"access-token": token}
  
    })
    .then(result => {

      if(result.data.success == true)
      {
        setEmpresas(result.data.result);
      }
  
    })
    .catch(error => {
  
      console.log(error)
  
    })

  }, [token])

  //COLUMNAS PARA EL FORM DINAMICO

  const formData = {

    nombre: {type: "input", inputType: "text", placeholder: "Ingrese el nombre completo", label: "Nombre Completo", name: "nombre"},

    fechaCumple: {type: "input", inputType: "date", placeholder: "Ingrese fecha de cumpleaños", label: "Fecha cumpleaños", name: "fechaCumple"},

    usuario: {type: "input", inputType: "text", placeholder: "Ingrese el nombre de usuario", label: "Usuario", name: "usuario"},
    
    passwordMD5: {type: "input", inputType: "password", placeholder: "Ingrese la contraseña", label: "Contraseña", name: "passwordMD5"},

    correoAdmin: {type: "input", inputType: "email", placeholder: "Ingrese el correo electronicco", label: "Correo", name: "correoAdmin"},

    idDpto: {type: "select", label: "Departamento", name: "idDpto", options: departamentos, id: "idDpto", valor: "nombreDpto", label: "Seleccione un Departamento"},

    idPuesto: {type: "select", label: "Puesto", name: "idPuesto", options: puestos, id: "idPuesto", valor: "nombrePuesto", label: "Seleccione un Puesto"},

    idSucursal: {type: "select", label: "Sucursal", name: "idSucursal", options: sucursales, id: "idSucursal", valor: "Sucursal", label: "Seleccione una Sucursal"},

    fechaIngreso: {type: "input", inputType: "date", placeholder: "Ingrese fecha de ingreso", label: "Fecha ingreso", name: "fechaIngreso"},

    idEmpresa: {type: "select", label: "Empresa", name: "idEmpresa", options: empresas, id: "id", valor: "nombre", label: "Seleccione una Empresa"},

    // foto: { type: "file", label: "Foto", name:"foto"}

  };

  return (
    <div>

        <h3 className='mb-4'>Administradores</h3>

        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalCrearAdmin">
          <IoMdPersonAdd/> Agregar Admin
        </button>

        <Tabla columns = {colums} data = {data}/>

        <DynamicForm 
          modalId="modalCrearAdmin" 
          modalSize="modal-xl"
          headerTitle="Crear Administrador" 
          formData={formData} 
          formValues={formValues} 
          setFormValues={setFormValues} 
          apiURL={urlCreate} 
          validar="crear"
        />

        <DynamicForm 
          modalId="modalEditarAdmin" 
          modalSize="modal-xl"
          headerTitle="Editar Administrador" 
          formData={formData} 
          formValues={formValues} 
          setFormValues={setFormValues} 
          apiURL={urlEdit} 
          validar="editar"
        />

    </div>
  )

}

export default Admins