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

const urlCreate = baseURL+"api/cat_ruta/crear";

const urlEdit = baseURL+"api/cat_ruta/editar";

//DATOS PARA INICIAR EL FORMULARIO

const initialFormValues = [{

    tipo: ""

}];

//=================================================================== 

const Rutas = () => {

    //SET STATE PARA DATOS DE LA TABLA

    const [data, setData] = useState([]);

    //SET STATE PARA EL TOKEN

    const [token, setToken] = useState('');

    //SET STATE PARA LOS VALORES DLE FORMULARIO

    const [formValues, setFormValues] = useState(initialFormValues);

    //COLUMNAS PARA LA TABLA

    const columns = [

        {
            name: 'ID',
            selector: row => row.id,
            sortable: true
        },
        {
            name: 'Estatus',
            selector: row => row.tipo,
            sortable: true
        },
        {
            name: "",
            button: true,
            cell: (row) => (
              
                <div className="input-group">
                  <button className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#modalEditarRuta"  type="button" onClick={(e) => handleEdit(row.id)}><BsPencil/></button>
                  <button className="btn btn-outline-danger" type="button" onClick={(e) => handleDelete(row.id)} ><RiDeleteBinFill/></button>
                </div>
             
            ),
            
        },

    ];

    const handleEdit = (id) => {

        axios.get(`${baseURL}api/cat_ruta/id/${id}`,{
  
            method: "GET",
            headers: {"access-token": token},
    
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                setFormValues(result.data.result);
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
      
              axios.delete(`${baseURL}api/cat_rutas/delete/${id}`,{
        
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
      
        axios.get(`${baseURL}api/cat_rutas`,{
      
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

        tipo: {type: "input", inputType: "text", placeholder: "Ingrese el tipo de ruta", label: "Tipo de Ruta", name: "tipo", col:"col-12 mb-4"},

    }

    return (

        <div>
            
            <h3 className='mb-4'>Tipos de Rutas</h3>

            <button
                type='button'
                className='btn btn-primary'
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearRuta">
                    <MdOutlineAddCircle/> Agregar Ruta
            </button>

            <Tabla columns = {columns} data = {data}/>

            <DynamicForm 
                modalId="modalCrearRuta" 
                modalSize=""
                headerTitle="Crear Ruta" 
                formData={formData} 
                formValues={initialFormValues} 
                apiURL={urlCreate} 
                tieneImagenes = "NO"
                validar="crear"
            />

            <DynamicForm 
                modalId="modalEditarRuta" 
                modalSize=""
                headerTitle="Editar Ruta" 
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

export default Rutas;
