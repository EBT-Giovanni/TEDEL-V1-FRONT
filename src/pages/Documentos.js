import React, {useState, useEffect} from 'react';
import { baseURL } from '../config/config';
import {BsPencil} from 'react-icons/bs';
import {MdOutlineAddCircle} from 'react-icons/md';
import {RiDeleteBinFill} from 'react-icons/ri';
import axios from 'axios';
import Cookies from 'js-cookie';
import Tabla from '../components/Tabla';
import Swal from 'sweetalert2';
import DynamicForm from '../components/DynamicForm'; 

//URLS PARA CREAR Y EDITAR ESTATUS DE ORDENES

const urlCreate = baseURL+"api/documento/crear";

const urlEdit = baseURL+"api/documento/editar";

//DATOS PARA INICIAR EL FORMULARIO

const initialFormValues = [{

    tipo: ""

}];

//===================================================================

const Documentos = () => {

    //SET STATE PARA DATOS DE LA TABLA

    const [data, setData] = useState([]);

    //SET STATE PARA EL TOKEN

    const [token, setToken] = useState('');

    //SET STATE PARA LOS VALORES DLE FORMULARIO

    const [formValues, setFormValues] = useState(initialFormValues);

    //COLUMNAS PARA LA TABLA

    const columns = [

        {
            name: 'Documento',
            selector: row => row.tipo,
            sortable: true
        },
        {
            name: "",
            button: true,
            cell: (row) => (
              
                <div className="input-group">
                  <button className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#modalEditarDocumento"  type="button" onClick={(e) => handleEdit(row.id)}><BsPencil/></button>
                  <button className="btn btn-outline-danger" type="button" onClick={(e) => handleDelete(row.id)} ><RiDeleteBinFill/></button>
                </div>
             
            ),
            
        },

    ];

    const handleEdit = (id) => {

        axios.get(`${baseURL}api/documento/id/${id}`,{
  
            method: "GET",
            headers: {"access-token": token},
    
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                setFormValues(result.data.result);
                console.log(formValues)
            }
    
        })
        .catch(error => {
        
            console.log(error)
    
        })

    }

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
      
              axios.delete(`${baseURL}api/documento/delete/${id}`,{
        
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

    //USE EFFECT PARA TRAER LOS DATOS DE LA TABLA

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
      
        axios.get(`${baseURL}api/documentos`,{
      
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
    
    },[token])

    const formData = {

        tipo: {type: "input", inputType: "text", placeholder: "Ingrese el tipo de Documento", label: "Tipo de Documento", name: "tipo", col:"col-12 mb-4"},

    }

    return (

        <div>
            
            <h3 className='mb-4'>Tipos Documentos</h3>

            <button
                type='button'
                className='btn btn-primary'
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearDocumento">
                    <MdOutlineAddCircle/> Agregar Documento
            </button>

            <Tabla columns = {columns} data = {data}/>

            <DynamicForm 
                modalId="modalCrearDocumento" 
                modalSize=""
                headerTitle="Crear Documento" 
                formData={formData} 
                formValues={initialFormValues} 
                apiURL={urlCreate} 
                tieneImagenes = "NO"
                validar="crear"
            />

            <DynamicForm 
                modalId="modalEditarDocumento" 
                modalSize=""
                headerTitle="Editar Documento" 
                formData={formData} 
                formValues={formValues} 
                setFormValues={setFormValues} 
                apiURL={urlEdit} 
                tieneImagenes = "NO"
                validar="editar"
            />

        </div>

    );
}

export default Documentos;
