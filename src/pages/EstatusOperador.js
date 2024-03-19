import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';

//COMPONENTES
import DynamicForm from '../components/DynamicForm';
import Tabla from '../components/Tabla';

//ICONS
import {BsPencil} from 'react-icons/bs';
import {RiDeleteBinFill} from 'react-icons/ri';
import {MdAddCircle} from 'react-icons/md';

const EstatusOperador = () => {

    //===================================================================

    // ===============================================
    // SEGMENTO PARA MOSTRAR ESTATUS
    // ===============================================

    const [data, setData] = useState([]);

    const [token, setToken] = useState('');

    //TRAER DATOS PARA MOSTRAR RUTAS

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/estatus/operadores`,{
        
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
            name: 'Estado',
            selector: row => row.estatus,
            sortable: true
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                
                <div className="input-group">
                    <button className="btn btn-outline-warning" type="button" data-bs-toggle="modal" data-bs-target="#modalEditarStatusOperador" onClick={() => handleEdit(row.id)}><BsPencil/></button>
                    <button className="btn btn-outline-danger" type="button" onClick={() => handleDelete(row.id)}><RiDeleteBinFill/></button>
                </div>
                
            ),
            width: "90px"
            
        },

    ];

    // ===============================================
    // SEGMENTO PARA CREAR ESTATUS
    // ===============================================

    //URL PARA CREAR RUTA

    const urlCreate = baseURL + "api/estatus/operador/crear";

    //VALORES PARA INICIAR EL FORMULARIO

    const initialFormValues = [{

        estatus: "",

    }];

    //DATOS PARA GENERAR EL FORMULARIO

    const formData = {

        estatus: {type: "input", inputType: "text", placeholder: "Ingrese el estatus", label: "Estatus", name: "estatus", col:"col-12 mb-4"},

    }

    // ===============================================
    // SEGMENTO PARA EDITAR RUTAS
    // ===============================================

    const [formValues, setFormValues] = useState(initialFormValues);

    const [urlEdit, setUrlEdit] = useState('');

    const handleEdit = (id) => {

        axios.get(`${baseURL}api/estatus/operador/id/${id}`,{
  
            method: "GET",
            headers: {"access-token": token},
    
        })
        .then(result => {
    
            if(result.data.success === true)
            {
                setFormValues(result.data.result);

                setUrlEdit(baseURL + "api/estatus/operador/editar");
            }
    
        })
        .catch(error => {
        
            console.log(error)
    
        })

    }

    // ===============================================
    // SEGMENTO PARA ELIMINAR ESTATUS
    // ===============================================

    const handleDelete = (id) => {

        Swal.fire({
            title: 'Estas seguro de borrar este estatus?',
            text: "Esta accion no podra ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
          }).then((result) => {
            if (result.isConfirmed) {
      
              axios.delete(`${baseURL}api/estatus/operador/delete/${id}`,{
        
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

    //===================================================================

    return (

        <div>

            <h3 className='mb-4'>Estatus Para Operador</h3>

            <button 
                type="button" 
                className="btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearStatusOperador">
                <MdAddCircle/> Agregar Estatus
            </button>

            <Tabla columns = {colums} data = {data}/>

            {/* MODAL PARA CREAR RUTA */}

            <DynamicForm 
                modalId="modalCrearStatusOperador" 
                modalSize=""
                headerTitle="Crear Estatus" 
                formData={formData} 
                formValues={initialFormValues} 
                apiURL={urlCreate} 
                tieneImagenes = "NO"
                validar="crear"
            />

            {/* MODAL PARA EDITAR RUTA */}

            <DynamicForm 
                modalId="modalEditarStatusOperador" 
                modalSize=""
                headerTitle="Editar Estatus" 
                formData={formData} 
                formValues={formValues} 
                apiURL={urlEdit} 
                tieneImagenes = "NO"
                validar="editar"
            />
            
        </div>
        
    );

}

export default EstatusOperador;
