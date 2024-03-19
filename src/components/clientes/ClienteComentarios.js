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


const ClienteComentarios = (id) => {

    const idCliente = id.idCliente;

    // ===============================================
    // SEGMENTO PARA MOSTRAR COMENTARIOS
    // ===============================================

    const [data, setData] = useState([]);

    const [columns, setColumns] = useState([]);

    const [token, setToken] = useState('');

    //TRAER DATOS PARA MOSTRAR COMENTARIOS

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/comentarios/cliente/${idCliente}`,{
        
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
            name: 'Comentario',
            selector: row => row.comentario,
            sortable: true
        },
        {
            name: "",
            button: true,
            cell: (row) => (
              
                <div className="input-group">
                    <button className="btn btn-outline-warning" type="button" onClick={() => handleEditComentario(row.id)} data-bs-toggle="modal" data-bs-target="#modalEditarComentario"><BsPencil/></button>
                    <button className="btn btn-outline-danger" type="button" onClick={() => handleDeleteClient(row.id)}><RiDeleteBinFill/></button>
                </div>
             
            ),
            width: "130px"
            
        },

    ];

    // ===============================================
    // SEGMENTO PARA CREAR COMENTARIO
    // ===============================================

    //URL PARA CREAR COMENTARIO

    const urlCreate = baseURL + "api/cliente/comentario/crear";

    //VALORES PARA INICIAR FORMULARIO

    const initialFormValues = [{

        rel_cliente: idCliente,
        comentario: ""

    }]

    // DATOS PARA GENERAR EL FORMULARIO

    const formData = {

        comentario: {type: "input", inputType: "text", placeholder: "Ingrese el comentario", label: "Comentario", name: "comentario", col:"col-12 mb-4"},

    }

    //VALIDAR Y MOSTRAR MODAL PARA CREAR CLIENTE

    const handleCreateComentClient = () => {

        if(initialFormValues[0]["rel_cliente"] === 0){

            Swal.fire({
                icon: 'warning',
                title: 'Seleccione un cliente para continuar!',
            })

        }else{

            document.getElementById("btnCrearComentarioCliente").click();

        }

    }

    // ===============================================
    // SEGMENTO PARA EDITAR COMENTARIO
    // ===============================================

    const [formValues, setFormValues] = useState(initialFormValues);

    const [urlEditComent, setUrlEditComent] = useState('');

    const handleEditComentario = (id) => {

        axios.get(`${baseURL}api/comentarios/cliente/id/${id}`,{
  
            method: "GET",
            headers: {"access-token": token},
    
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                setFormValues(result.data.result);

                setUrlEditComent(baseURL + "api/cliente/comentario/editar");
            }
    
        })
        .catch(error => {
        
            console.log(error)
    
        })

    }

    // ===============================================
    // SEGMENTO PARA ELIMINAR COMENTARIO
    // ===============================================

    const handleDeleteClient = (id) => {

        Swal.fire({
            title: 'Estas seguro de borrar este comentario?',
            text: "Esta accion no podra ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
          }).then((result) => {
            if (result.isConfirmed) {
      
              axios.delete(`${baseURL}api/cliente/comentario/delete/${id}`,{
        
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

    return (

        <div>

            <button 
                type="button" 
                className="btn btn-primary mt-4" 
                onClick={() => handleCreateComentClient()}>
                <MdAddCircle/> Agregar Comentario
            </button>

            <button 
                id="btnCrearComentarioCliente"
                type="button" 
                style={{display: "none"}}
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearComentarioCliente">
            </button>

            <Tabla columns = {columns} data = {data}/>

            {/* MODAL PARA CREAR COMENTARIO */}

            <DynamicForm 
                modalId="modalCrearComentarioCliente" 
                modalSize="modal-lg"
                headerTitle="Crear Comentario" 
                formData={formData} 
                formValues={initialFormValues} 
                apiURL={urlCreate} 
                tieneImagenes = "NO"
                validar="crear"
            />

            {/* MODAL PARA EDITAR COMENTARIO */}

            <DynamicForm 
                modalId="modalEditarComentario" 
                modalSize="modal-lg"
                headerTitle="Editar Comentario" 
                formData={formData} 
                formValues={formValues} 
                apiURL={urlEditComent} 
                tieneImagenes = "NO"
                validar="editar"
            />
            
        </div>

    );

}

export default ClienteComentarios;
