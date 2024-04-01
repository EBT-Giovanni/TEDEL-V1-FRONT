import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';

//COMPONENTES
import DynamicForm from '../components/DynamicForm';
import Tabla from '../components/Tabla';
import ClienteComentarios from '../components/clientes/ClienteComentarios';
import ClienteContactos from '../components/clientes/ClienteContactos';
import ClienteDocumentos from '../components/clientes/ClienteDocumentos';

//ICONS
import {IoMdPersonAdd} from 'react-icons/io';
import {BsPencil} from 'react-icons/bs';
import {RiDeleteBinFill} from 'react-icons/ri';
import {HiOutlineEye} from 'react-icons/hi';
import ReporteClientes from '../components/clientes/ReporteClientes';


const Clientes = () => {

    // ===============================================
    // SEGMENTO PARA MOSTRAR INFO ADICIONAL DE LOS CLIENTES
    // ===============================================


    const [clientName, setClientName] = useState('');

    const [idClient, setIdClient] = useState(0);

    const handleClientesInfo = (id, name) => {

        setClientName(name);

        setIdClient(id);

    }

    // ===============================================
    // SEGMENTO PARA MOSTRAR CLIENTES
    // ===============================================

    const [data, setData] = useState([]);

    const [token, setToken] = useState('');

    //TRAER DATOS PARA MOSTRAR CLIENTES

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
      
        axios.get(`${baseURL}api/clientes`,{
      
          method: "GET",
          headers: {"access-token": token}
      
        })
        .then(result => {
    
          if(result.data.success === true && result.data.result !== "Sin resultados")
          {

            setData(result.data.result);

          }else{

            setData([]);

        }
    
        })
        .catch(error => {
      
          console.log(error)
      
        })
    
    },[token]);

    //COLUMNAS PARA LA TABLA

    const colums = [

        {
            name: 'Nombre',
            selector: row => row.nombre_comercial,
            sortable: true
        },
        {
            name: 'Razon Social',
            selector: row => row.razon_social,
            sortable: true
        },
        {
            name: 'Direccion',
            selector: row => row.direccion,
            sortable: true
        },
        {
            name: 'RFC',
            selector: row => row.rfc,
            sortable: true
        },
        {
            name: 'Estado',
            selector: row => row.activo === 1 ? 
            <button className='btn btn-success'>Activo</button> :
            <button className='btn btn-danger'>Inactivo</button>,
            width: "120px"
        },

        {
            name: "",
            button: true,
            cell: (row) => (
              
                <div className="input-group">
                    <button className='btn btn-outline-info' onClick={() => handleClientesInfo(row.id, row.nombre_comercial)}><HiOutlineEye/></button>
                    <button className="btn btn-outline-warning" type="button" onClick={() => handleEditClientes(row.id)} data-bs-toggle="modal" data-bs-target="#modalEditarCliente"><BsPencil/></button>
                    <button className="btn btn-outline-danger" type="button" onClick={() => handleDeleteCliente(row.id)}><RiDeleteBinFill/></button>
                </div>
             
            ),
            width: "130px"
            
        },

    ]

    // ===============================================
    // SEGMENTO PARA CREAR CLIENTES
    // ===============================================

    //URL PARA CREAR CLIENTE

    const urlCreate = baseURL + "api/cliente/crear";

    //VALORES INICIALES PARA EL FORMULARIO

    const initialFormValuesClientes = [{

        clave: "",
        razon_social: "",
        nombre_comercial: "",
        direccion: "",
        rfc: "",
        iva: "",
        activo: ""

    }]

    //ARREGLO PARA SELECT ACTIVO

    const activos = [

        {id: "", activo: "Seleccione el Estado"},
        {id: 1, activo: "Activo"},
        {id: 0, activo: "Inactivo"}

    ];

    //ARREGLO PARA SELECT ACTIVO

    const iva = [

        {id: "", activo: "Seleccione IVA para cliente"},
        {id: 0, activo: "Sin IVA"},
        {id: 8, activo: "8% IVA"},
        {id: 16, activo: "16% IVA"}

    ];

    // DATOS PARA GENERAR EL FORMULARIO

    const formDataClientes = {

        clave: {type: "input", inputType: "text", placeholder: "Ingrese clave", label: "Clave", name: "clave", col:"col-6 mb-4"},

        razon_social: {type: "input", inputType: "text", placeholder: "Ingrese razon social", label: "Razon Social", name: "razon_social", col:"col-6 mb-4"},

        nombre_comercial: {type: "input", inputType: "text", placeholder: "Ingrese nombre comercial", label: "Nombre Comercial", name: "nombre_comercial", col:"col-6 mb-4"},

        rfc: {type: "input", inputType: "text", placeholder: "Ingrese RFC", label: "RFC", name: "rfc", col:"col-6 mb-4"},

        direccion: {type: "input", inputType: "text", placeholder: "Ingrese direeccion", label: "Direccion", name: "direccion", col:"col-6 mb-4"},

        iva: {type: "select", label: "IVA", name: "iva", options: iva, id: "id", valor: "activo", col:"col-6 mb-4"},

        activo: {type: "select", label: "Estado", name: "activo", options: activos, id: "id", valor: "activo", col:"col-6 mb-4"},

    }

    // ===============================================
    // SEGMENTO PARA EDITAR CLIENTES
    // ===============================================

    const [formValues, setFormValues] = useState(initialFormValuesClientes);

    const [urlEditCliente, setUrlEditCliente] = useState('');

    const handleEditClientes = (id) => {

        axios.get(`${baseURL}api/cliente/${id}`,{
  
            method: "GET",
            headers: {"access-token": token},
    
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                setFormValues(result.data.result);

                setUrlEditCliente(baseURL + "api/cliente/update");
            }
    
        })
        .catch(error => {
        
            console.log(error)
    
        })

    }

    // ===============================================
    // SEGMENTO PARA ELIMINAR CLIENTES
    // ===============================================

    const handleDeleteCliente = (id) => {

        Swal.fire({
            title: 'Estas seguro de borrar este cliente?',
            text: "Esta accion no podra ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
          }).then((result) => {
            if (result.isConfirmed) {
      
              axios.delete(`${baseURL}api/cliente/delete/${id}`,{
        
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

    // ==============================================================================

    return (

        <div>

            <h3 className='mb-4'>Clientes</h3>

            <button 
                type="button" 
                className="btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearCliente">
                <IoMdPersonAdd/> Agregar Cliente
            </button>

            <ReporteClientes clientes={data} />

            {/* TABLA PARA MOSTRAR CLIENTES */}

            <Tabla columns = {colums} data = {data}/>

            {/* MODAL PARA CREAR CLIENTE */}

            <DynamicForm 
                modalId="modalCrearCliente" 
                modalSize="modal-xl"
                headerTitle="Alta Cliente" 
                formData={formDataClientes} 
                formValues={initialFormValuesClientes} 
                apiURL={urlCreate} 
                tieneImagenes = "NO"
                validar="crear"
            />

            {/* MODAL PARA EDITAR CLIENTE */}

            <DynamicForm 
                modalId="modalEditarCliente" 
                modalSize="modal-xl"
                headerTitle="Editar Cliente" 
                formData={formDataClientes} 
                formValues={formValues} 
                apiURL={urlEditCliente} 
                tieneImagenes = "NO"
                validar="editar"
            />

            <h3 className='text-center mt-4'>{clientName}</h3>

            <ul className="nav nav-tabs nav-justified mt-4" id="myTabClientes" role="tablist">

                <li className="nav-item" role="presentation">

                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#tabClientesComentarios" type="button" role="tab" aria-controls="home" aria-selected="true"><p class="h5">Comentarios</p></button>

                </li>

                <li className="nav-item" role="presentation">

                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#tabClientesContactos" type="button" role="tab" aria-controls="profile" aria-selected="false"><p class="h5">Contactos</p></button>

                </li>

                <li className="nav-item" role="presentation">

                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#tabClientesDoc" type="button" role="tab" aria-controls="contact" aria-selected="false"><p class="h5">Documentos</p></button>

                </li>

            </ul>

            <div className="tab-content" id="myTabContentClientes">

                <div className="tab-pane fade show active" id="tabClientesComentarios" role="tabpanel" aria-labelledby="home-tab">

                    <ClienteComentarios idCliente = {idClient}/>

                </div>

                <div className="tab-pane fade" id="tabClientesContactos" role="tabpanel" aria-labelledby="profile-tab">

                    <ClienteContactos idCliente = {idClient}/>

                </div>

                <div className="tab-pane fade" id="tabClientesDoc" role="tabpanel" aria-labelledby="contact-tab">

                    <ClienteDocumentos idCliente = {idClient}/>

                </div>

            </div>

        </div>

    );

}

export default Clientes;
