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

const AccesorialesDoc = ({idOrder}) => {

    // ===============================================
    // SEGMENTO PARA MOSTRAR ACCESORIALES
    // ===============================================

    const [data, setData] = useState([]);

    const [columns, setColumns] = useState([]);

    const [token, setToken] = useState('');

    //TRAER DATOS PARA MOSTRAR COMENTARIOS

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/accesoriales/orden/${idOrder}`,{
        
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
    
    },[idOrder]);

    //COLUMNAS PARA LOS ACCESORIALES

    const colums = [

        {
            name: 'Concepto',
            selector: row => row.concepto,
            sortable: true
        },
        {
            name: 'Monto',
            selector: row => row.monto,
            sortable: true
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                
                <div className="input-group">
                    <button className="btn btn-outline-warning" type="button" onClick={() => handleEdit(row.id)} data-bs-toggle="modal" data-bs-target="#modalEditarAccesorial"><BsPencil/></button>
                    <button className="btn btn-outline-danger" type="button" onClick={() => handleDelete(row.id)}><RiDeleteBinFill/></button>
                </div>
                
            ),
            width: "130px"
            
        },

    ];

    // ===============================================
    // SEGMENTO PARA CREAR COMENTARIO
    // ===============================================

    //URL PARA CREAR COMENTARIO

    const urlCreate = baseURL + "api/accesorial/orden/crear";

    //VALORES PARA INICIAR FORMULARIO

    const initialFormValues = [{

        rel_orden: idOrder,
        concepto: "",
        monto: ""

    }];

    // DATOS PARA GENERAR EL FORMULARIO

    const formData = {

        concepto: {type: "input", inputType: "text", placeholder: "Ingrese el concepto", label: "Concepto", name: "concepto", col:"col-12 mb-4"},

        monto: {type: "input", inputType: "number", placeholder: "Ingrese el monto", label: "Monto", name: "monto", col:"col-12 mb-4"},

    }

    //VALIDAR Y MOSTRAR MODAL PARA CREAR CLIENTE

    const handleCreate = () => {

        if(initialFormValues[0]["rel_orden"] === 0){

            Swal.fire({
                icon: 'warning',
                title: 'Seleccione una orden para continuar!',
            })

        }else{

            document.getElementById("btnCrearAccesorialOrden").click();

        }

    }

    // ===============================================
    // SEGMENTO PARA EDITAR COMENTARIO
    // ===============================================

    const [formValues, setFormValues] = useState(initialFormValues);

    const [urlEdit, setUrlEdit] = useState('');

    const handleEdit = (id) => {

        axios.get(`${baseURL}api/accesorial/id/${id}`,{
  
            method: "GET",
            headers: {"access-token": token},
    
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                setFormValues(result.data.result);

                setUrlEdit(baseURL + "api/accesorial/orden/editar");
            }
    
        })
        .catch(error => {
        
            console.log(error)
    
        })

    }

    // ===============================================
    // SEGMENTO PARA ELIMINAR ACCESORIAL
    // ===============================================

    const handleDelete = (id) => {

        Swal.fire({
            title: 'Estas seguro de borrar este accesorial?',
            text: "Esta accion no podra ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
          }).then((result) => {
            if (result.isConfirmed) {
      
              axios.delete(`${baseURL}api/accesorial/orden/delete/${id}`,{
        
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

    return (

        <div>

            <button 
                type="button" 
                className="btn btn-primary mt-4" 
                onClick={() => handleCreate()}>
                <MdAddCircle/> Agregar Accesorial
            </button>

            <button 
                id="btnCrearAccesorialOrden"
                type="button" 
                style={{display: "none"}}
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearAccesorial">
            </button>

            <Tabla columns = {columns} data = {data}/>

            {/* MODAL PARA CREAR COMENTARIO */}

            <DynamicForm 
                modalId="modalCrearAccesorial" 
                modalSize=""
                headerTitle="Crear Accesorial" 
                formData={formData} 
                formValues={initialFormValues} 
                apiURL={urlCreate} 
                tieneImagenes = "NO"
                validar="crear"
            />

            {/* MODAL PARA EDITAR COMENTARIO */}

            <DynamicForm 
                modalId="modalEditarAccesorial" 
                modalSize=""
                headerTitle="Editar Accesorial" 
                formData={formData} 
                formValues={formValues} 
                apiURL={urlEdit} 
                tieneImagenes = "NO"
                validar="editar"
            />
            
        </div>

    );

}

export default AccesorialesDoc;
