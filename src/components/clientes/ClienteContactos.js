import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';

//COMPONENTES
import DynamicForm from '../../components/DynamicForm';
import Tabla from '../../components/Tabla';

//ICONS
import {BsPencil} from 'react-icons/bs';
import {RiDeleteBinFill} from 'react-icons/ri';
import {MdAddCircle} from 'react-icons/md';

//===================================================================

const ClienteContactos = (id) => {

    const idCliente = id.idCliente;

    // ===============================================
    // SEGMENTO PARA MOSTRAR CONTACTOS
    // ===============================================

    const [data, setData] = useState([]);

    const [columns, setColumns] = useState([]);

    const [token, setToken] = useState('');

    //TRAER DATOS PARA MOSTRAR CONTACTOS

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/contactos/cliente/${idCliente}`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success === true && result.data.result !== "Sin resultados")
            {
                setData(result.data.result);

                setColumns(colums)
            }else{

                setData([]);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[id]);

    //COLUMNAS PARA LOS COMENTARIOS

    const colums = [

        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Puesto',
            selector: row => row.puesto,
            sortable: true
        },
        {
            name: 'Telefono',
            selector: row => row.principal === 1 ? row.telefono1 : row.telefono2,
            sortable: true
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                
                <div className="input-group">
                    <button className="btn btn-outline-warning" type="button"  data-bs-toggle="modal" data-bs-target="#modalEditarContacto" onClick={() => handleEditContact(row.id)}><BsPencil/></button>
                    <button className="btn btn-outline-danger" type="button" onClick={() => handleDeleteContact(row.id)}><RiDeleteBinFill/></button>
                </div>
                
            ),
            width: "130px"
            
        },

    ]

    // ===============================================
    // SEGMENTO PARA CREAR CONTACTO
    // ===============================================

    //URL PARA CREAR CONTACTO

    const urlCreate = baseURL + "api/cliente/contacto/crear";

    //VALORES PARA INICIAR EL FORMULARIO

    const initialFormValues = [{

        rel_cliente: idCliente,
        nombre: "",
        puesto: "",
        email: "",
        telefono1: "",
        telefono2: "",
        principal: ""

    }]

    //ARRAY PARA TELEFONO PRINCIPAL

    const principal = [

        {id: "", val: "Seleccione el Telefono Principal"},
        {id: 1, val: "Telefono 1"},
        {id: 2, val: "Telefono 2"}

    ];

    //DATOS PARA GENERAR EL FORMULARIO

    const formData = {

        nombre: {type: "input", inputType: "text", placeholder: "Ingrese el nombre", label: "Nombre", name: "nombre", col:"col-12 mb-4"},

        puesto: {type: "input", inputType: "text", placeholder: "Ingrese el puesto", label: "Puesto", name: "puesto", col:"col-6 mb-4"},

        email: {type: "input", inputType: "email", placeholder: "Ingrese el correo", label: "Email", name: "email", col:"col-6 mb-4"},

        telefono1: {type: "input", inputType: "text", placeholder: "Ingrese el telefono", label: "Telefono 1", name: "telefono1", col:"col-6 mb-4"},

        telefono2: {type: "input", inputType: "text", placeholder: "Ingrese el telefono", label: "Telefono 2", name: "telefono2", col:"col-6 mb-4"},

        principal: {type: "select", label: "Telefono Principal", name: "principal", options: principal, id: "id", valor: "val", col:"col-6 mb-4"},

    }

    //VALIDAR Y MOSTRAR MODAL PARA CREAR CLIENTE

    const handleCreateContactClient = () => {

        if(initialFormValues[0]["rel_cliente"] === 0){

            Swal.fire({
                icon: 'warning',
                title: 'Seleccione un cliente para continuar!',
            })

        }else{

            document.getElementById("btnCrearContactoCliente").click();

        }

    }

    // ===============================================
    // SEGMENTO PARA EDITAR CONTACTO
    // ===============================================

    const [formValues, setFormValues] = useState(initialFormValues);

    const [urlEdit, setUrlEdit] = useState('');
    
    const handleEditContact = (id) => {

        axios.get(`${baseURL}api/contactos/cliente/id/${id}`,{
  
            method: "GET",
            headers: {"access-token": token},
    
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                setFormValues(result.data.result);

                setUrlEdit(baseURL + "api/cliente/contacto/editar");
            }
    
        })
        .catch(error => {
        
            console.log(error)
    
        })

    }

    // ===============================================
    // SEGMENTO PARA ELIMINAR CONTACTO
    // ===============================================

    const handleDeleteContact = (id) => {

        Swal.fire({
            title: 'Estas seguro de borrar este contacto?',
            text: "Esta accion no podra ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
          }).then((result) => {
            if (result.isConfirmed) {
      
              axios.delete(`${baseURL}api/cliente/contacto/delete/${id}`,{
        
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

    //===============================================================

    return (

        <div>

            <button 
                type="button" 
                className="btn btn-primary mt-4" 
                onClick={() => handleCreateContactClient()} >
                <MdAddCircle/> Agregar Contacto
            </button>

            <button 
                id="btnCrearContactoCliente"
                type="button" 
                style={{display: "none"}}
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearContactoCliente">
            </button>

            <Tabla columns = {columns} data = {data}/>

            {/* MODAL PARA CREAR COMENTARIO */}

            <DynamicForm 
                modalId="modalCrearContactoCliente" 
                modalSize="modal-lg"
                headerTitle="Crear Contacto" 
                formData={formData} 
                formValues={initialFormValues} 
                apiURL={urlCreate} 
                tieneImagenes = "NO"
                validar="crear"
            />

            {/* MODAL PARA EDITAR COMENTARIO */}

            <DynamicForm 
                modalId="modalEditarContacto" 
                modalSize="modal-lg"
                headerTitle="Editar Contacto" 
                formData={formData} 
                formValues={formValues} 
                apiURL={urlEdit} 
                tieneImagenes = "NO"
                validar="editar"
            />
            
        </div>

    );

}

export default ClienteContactos;
