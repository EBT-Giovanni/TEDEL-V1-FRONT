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

const TractorPlacas = (id) => {

    const idTractor = id.idTractor;

    // ===============================================
    // SEGMENTO PARA MOSTRAR COMENTARIOS
    // ===============================================

    const [data, setData] = useState([]);

    const [columns, setColumns] = useState([]);

    const [token, setToken] = useState('');

    //TRAER DATOS PARA MOSTRAR PLACAS 

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/tractor/placas/${idTractor}`,{
        
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

    //COLUMNAS PARA LAS PLACAS

    const colums = [

        {
            name: 'Placa',
            selector: row => row.placa,
            sortable: true
        },
        {
            name: 'Estado',
            selector: row => row.vigente === 1 ? 
            <button className='btn btn-success'>Vigente</button> :
            <button className='btn btn-danger'>Expiro</button>,
            sortable: true
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                
                <div className="input-group">
                    <button className="btn btn-outline-warning" type="button" onClick={() => handleEdit(row.id)} data-bs-toggle="modal" data-bs-target="#modalEditarPlacaTractor"><BsPencil/></button>
                    <button className="btn btn-outline-danger" type="button" onClick={() => handleDelete(row.id)}><RiDeleteBinFill/></button>
                </div>
                
            ),
            width: "130px"
            
        },

    ];

    // ===============================================
    // SEGMENTO PARA CREAR PLACA
    // ===============================================

    //URL PARA CREAR PLACA

    const urlCreate = baseURL + "api/tractor/placas/crear";

    //VALORES PARA INICIAR FORMULARIO

    const initialFormValues = [{

        rel_tractor: idTractor,
        placa: "",
        vigente: ""

    }];

    //ARREGLO PARA SELECT 

    const estado = [

        {id: "", estado: "Seleccione el Estado"},
        {id: 1, estado: "Vigente"},
        {id: 0, estado: "Expiro"}

    ];

    // DATOS PARA GENERAR EL FORMULARIO

    const formData = {

        placa: {type: "input", inputType: "text", placeholder: "Ingrese numero de placa", label: "Placa", name: "placa", col:"col-12 mb-4"},

        vigente: {type: "select", label: "Estado", name: "vigente", options: estado, id: "id", valor: "estado", col:"col-12 mb-4"},

    }

    // ===============================================
    // SEGMENTO PARA EDITAR PLACA
    // ===============================================

    const [formValues, setFormValues] = useState(initialFormValues);

    const [urlEdit, setUrlEdit] = useState('');

    const handleEdit = (id) => {

        axios.get(`${baseURL}api/tractor/placas/id/${id}`,{
  
            method: "GET",
            headers: {"access-token": token},
    
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                setFormValues(result.data.result);

                setUrlEdit(baseURL + "api/tractor/placas/editar");
            }
    
        })
        .catch(error => {
        
            console.log(error)
    
        })

    }

    // ===============================================
    // SEGMENTO PARA ELIMINAR PLACAS
    // ===============================================

    const handleDelete = (id) => {

        Swal.fire({
            title: 'Estas seguro de borrar estas placas?',
            text: "Esta accion no podra ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
          }).then((result) => {
            if (result.isConfirmed) {
      
              axios.delete(`${baseURL}api/tractor/placas/delete/${id}`,{
        
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

    // ===============================================
    // SEGMENTO PARA VALIDAR Y MOSTRAR MODAL
    // ===============================================

    const handleValidate = () => {

        if(initialFormValues[0]["rel_tractor"] === 0){

            Swal.fire({
                icon: 'warning',
                title: 'Seleccione un tractor para continuar!',
            })

        }else{

            document.getElementById("btnCrearPlacaTractor").click();

        }

    }

    // ===============================================================

    return (

        <div>
            
            <button 
                type="button" 
                className="btn btn-primary mt-4"
                onClick={() => handleValidate()} >
                <MdAddCircle/> Agregar Placas
            </button>

            <button 
                id="btnCrearPlacaTractor"
                type="button" 
                style={{display: "none"}}
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearPlacasTractor">
            </button>
            
            <Tabla columns = {columns} data = {data}/>

            {/* MODAL PARA CREAR COMENTARIO */}

            <DynamicForm 
                modalId="modalCrearPlacasTractor" 
                modalSize="modal-lg"
                headerTitle="Crear Placas" 
                formData={formData} 
                formValues={initialFormValues} 
                apiURL={urlCreate} 
                tieneImagenes = "NO"
                validar="crear"
            />

            {/* MODAL PARA EDITAR COMENTARIO */}

            <DynamicForm 
                modalId="modalEditarPlacaTractor" 
                modalSize="modal-lg"
                headerTitle="Editar Placas" 
                formData={formData} 
                formValues={formValues} 
                apiURL={urlEdit} 
                tieneImagenes = "NO"
                validar="editar"
            />

        </div>

    );

}

export default TractorPlacas;
