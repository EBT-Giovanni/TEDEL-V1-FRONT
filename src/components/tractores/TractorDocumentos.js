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
import {FiDownload} from 'react-icons/fi';

//===================================================================

const TractorDocumentos = (id) => {

    const idTractor = id.idTractor;

    // ===============================================
    // SEGMENTO PARA MOSTRAR COMENTARIOS
    // ===============================================

    const [data, setData] = useState([]);

    const [columns, setColumns] = useState([]);

    const [token, setToken] = useState('');

    //TRAER DATOS PARA MOSTRAR ARCHIVOS

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/tractor/archivos/${idTractor}`,{
        
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

    //COLUMNAS PARA LOS ARCHIVOS

    const colums = [

        {
            name: 'Documento',
            selector: row => row.documento,
            sortable: true
        },
        {
            name: 'Tipo',
            selector: row => row.rel_tipo,
            sortable: true
        },
        {
            name: 'Descargar',
            selector: row => <button className='btn btn-outline-info' onClick={() => handleDownload(row.ruta)}><FiDownload/></button>,
            sortable: true
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                
                <div className="input-group">
                    <button className="btn btn-outline-warning" type="button" onClick={() => handleEdit(row.id)} data-bs-toggle="modal" data-bs-target="#modalEditarArchivoTractor"><BsPencil/></button>
                    <button className="btn btn-outline-danger" type="button" onClick={() => handleDelete(row.id, row.ruta)}><RiDeleteBinFill/></button>
                </div>
                
            ),
            width: "130px"
            
        },

    ];

    // ===============================================
    // SEGMENTO PARA DESCARGAR ARCHIVO
    // ===============================================

    const handleDownload = (ruta) => {

        let nombre = ruta.split("%");

        nombre = nombre[1];

        axios({
            url: `${baseURL}api/tractor/download/file`,
            method: 'POST',
            headers: {
                "access-token": token
            } ,
            responseType: 'blob',
            data: {
                rutaArchivo: ruta
            }
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', nombre);
            document.body.appendChild(link);
            link.click();
        });

    }

    // ===============================================
    // SEGMENTO PARA CREAR ARCHIVO
    // ===============================================

    //URL PARA CRAER ARCHIVO

    const urlCreate = baseURL + "api/tractor/archivo/crear";

    //VALORES PARA INICIAR EL FORMULARIO

    const initialFormValues = [{

        rel_tractor: idTractor,
        rel_tipo: "",
        documento: "",
        ruta: ""

    }];

    //TRAER TIPOS DE DOCUMENTOS 

    const [documents, setDocuments] = useState('');

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/documentos`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let doc = result.data.result;

                doc.unshift({id: "", tipo: "Seleccione el tipo de documento"});
        
                setDocuments(doc);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

    //DATOS PARA GENERAR EL FORMULARIO

    const formData = {

        rel_tipo: {type: "select", label: "Tipo / Documento", name: "rel_tipo", col:"col-12 mb-4", options: documents, id: "id", valor: "tipo", label: "Seleccione tipo"},

        documento: { type: "input", inputType: "text", placeholder: "Ingrese nombre documento", label: "Nombre Doc", name: "documento", col:"col-12 mb-4" },

        ruta: { type: "file", label: "Archivo", name:"ruta", col:"col-12 mb-4" }

    }

    // ===============================================
    // SEGMENTO PARA EDITAR ARCHIVO
    // ===============================================

    const [formValues, setFormValues] = useState(initialFormValues);

    const [urlEdit, setUrlEdit] = useState('');

    const handleEdit = (id) => {

        axios.get(`${baseURL}api/tractor/archivo/id/${id}`,{
  
            method: "GET",
            headers: {"access-token": token},
    
        })
        .then(result => {
    
            if(result.data.success == true)
            {

                let formTemp = result.data.result;
      
                formTemp[0]["archivoActual"] = formTemp[0]["ruta"];

                setFormValues(formTemp);

                setUrlEdit(baseURL + "api/tractor/archivo/editar");
            }
    
        })
        .catch(error => {
        
            console.log(error)
    
        })

    }

    // ===============================================
    // SEGMENTO PARA ELIMINAR ARCHIVO
    // ===============================================

    const handleDelete = (id, ruta) => {

        Swal.fire({
            title: 'Estas seguro de borrar este archivo?',
            text: "Esta accion no podra ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
            }).then((result) => {
    
                if(result.isConfirmed) {
    
                    const data = { path: ruta };
                    
                    fetch(`${baseURL}api/tractor/archivo/delete/${id}`, {
                            
                        method: "DELETE", 
                        headers: {
                            "Content-Type": "application/json",
                            "access-token": token
                        },
                        body: JSON.stringify(data),
    
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        
                        if(data.success === true){
    
                            
                            Swal.fire({
                            icon: 'success',
                            title: 'Se ha eliminado correctamente!',
                            })
                            .then(() => {
                    
                                window.location.reload(false);
                    
                            })
    
                        }
    
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
    
                }
    
            })

    }

    // ===============================================
    // SEGMENTO PARA VALIDAR MODAL
    // ===============================================

    const handleValidate = () => {

        if(initialFormValues[0]["rel_tractor"] === 0){

            Swal.fire({
                icon: 'warning',
                title: 'Seleccione un tractor para continuar!',
            })

        }else{

            document.getElementById("btnCrearArchivoTractor").click();

        }

    }

    //===================================================================

    return (

        <div>
            
            <button 
                type="button" 
                className="btn btn-primary mt-4"
                onClick={() => handleValidate()} >
                <MdAddCircle/> Agregar Documentos
            </button>

            <button 
                id="btnCrearArchivoTractor"
                type="button" 
                style={{display: "none"}}
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearArchivoTractor">
            </button>

            <Tabla columns = {columns} data = {data}/>

            {/* MODAL PARA CREAR COMENTARIO */}

            <DynamicForm 
                modalId="modalCrearArchivoTractor" 
                modalSize="modal-lg"
                headerTitle="Crear Archivo" 
                formData={formData} 
                formValues={initialFormValues} 
                apiURL={urlCreate} 
                tieneImagenes = "SI"
                validar="crear"
            />

            {/* MODAL PARA EDITAR ARCHIVO */}

            <DynamicForm 
                modalId="modalEditarArchivoTractor" 
                modalSize="modal-lg"
                headerTitle="Editar Archivo" 
                formData={formData} 
                formValues={formValues} 
                apiURL={urlEdit} 
                tieneImagenes = "SI"
                validar="editar"
            />

        </div>

    );

}

export default TractorDocumentos;
