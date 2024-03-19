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

const urlCreate = baseURL+"api/licencias/crear";

const urlEdit = baseURL+"api/licencia/editar";

//DATOS PARA INICIAR EL FORMULARIO

const initialFormValues = [{

    tipo_licencia: ""

}];

//===================================================================

const Licencias = () => {

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
            name: 'Licencia',
            selector: row => row.tipo_licencia,
            sortable: true
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                
                <div className="input-group">
                    <button className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#modalEditarLicencia"  type="button" onClick={(e) => handleEdit(row.id)}><BsPencil/></button>
                    <button className="btn btn-outline-danger" type="button" onClick={(e) => handleDelete(row.id)} ><RiDeleteBinFill/></button>
                </div>
                
            ),
            
        },

    ];

    const handleEdit = (id) => {

        axios.get(`${baseURL}api/licencia/id/${id}`,{
  
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
      
              axios.delete(`${baseURL}api/licencia/delete/${id}`,{
        
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
        
        axios.get(`${baseURL}api/licencias`,{
        
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

        tipo_licencia: {type: "input", inputType: "text", placeholder: "Ingrese tipo de Licencia", label: "Estatus de Orden", name: "tipo_licencia", col:"col-12 mb-4"},

    }

    return (
        <div>
            
            <h3 className='mb-4'>Tipo Licencias</h3>

            <button
                type='button'
                className='btn btn-primary'
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearLicencia">
                    <MdOutlineAddCircle/> Agregar Licencia
            </button>

            <Tabla columns = {columns} data = {data}/>

            <DynamicForm 
                modalId="modalCrearLicencia" 
                modalSize=""
                headerTitle="Crear Licencia" 
                formData={formData} 
                formValues={initialFormValues} 
                apiURL={urlCreate} 
                tieneImagenes = "NO"
                validar="crear"
            />

            <DynamicForm 
                modalId="modalEditarLicencia" 
                modalSize=""
                headerTitle="Editar Licencia" 
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

export default Licencias;
