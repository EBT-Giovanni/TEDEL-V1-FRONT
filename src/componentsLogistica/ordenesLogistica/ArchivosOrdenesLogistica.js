import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';

//COMPONENTES
import Tabla from '../../components/Tabla';

//ICONS
import {BsPencil} from 'react-icons/bs';
import {RiDeleteBinFill} from 'react-icons/ri';
import {MdAddCircle} from 'react-icons/md';
import {FiDownload} from 'react-icons/fi';
import {FaTimesCircle, FaCheckCircle} from 'react-icons/fa';
import {AiOutlineFilePdf, AiOutlineCloudDownload} from 'react-icons/ai';
import CrearArchivoLogistica from './modales/CrearArchivoLogistica';

const ArchivosOrdenesLogistica = ({idOrden}) => {

    const [token, setToken] = useState('');

    //VALORES PARA EL FORMULARIO

    const [formValues, setFormValues] = useState({

        rel_orden: "",
        descripcion: "",
        ruta: ""

    });

    // ===============================================
    // DATOS PARA MOSTRAR ARCHIVOS
    // ===============================================

    const [data, setData] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));

        buscarFiles();
    
    },[idOrden]);

    // FUNCION PARA BUSCAR ARCHIVOS DE LA ORDEN

    const buscarFiles = async () => {

        if(idOrden !== 0){

            const config = {
  
                headers: {"access-token": token},
        
            };
    
            const response = await axios.get(`${baseURL}api/get/archivos/logistica/orden/${idOrden}`, config);
            
            console.log(response.data)
    
            if(response.data.success === true && response.data.result !== "Sin resultados"){
    
                setData(response.data.result)
    
            }else{
    
                setData([]);
    
            }

        }

    }

    // ===============================================
    // COLUMNAS PARA LA TABLA DE CAJAS
    // ===============================================

    const columns = [

        {
            name: 'Documento',
            selector: row => row.descripcion,
            sortable: true
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                
                <div className="input-group">

                    <button type="button" className='btn btn-outline-info' onClick={() => handleDownload(row.ruta)}><FiDownload/></button>

                    <button className="btn btn-outline-danger" type="button" onClick={() => handleDeleteFile(row.id, row.ruta)}><RiDeleteBinFill/></button>
                    
                </div>
            
            ),
        },

    ];

    // ===============================================
    // SEGMENTO PARA DESCARGAR ARCHIVO
    // ===============================================

    const handleDownload = (ruta) => {

        let nombre = ruta.split("%");

        nombre = nombre[1];

        axios({
            url: `${baseURL}api/download/archivo/logistica`,
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
    // SEGMENTO PARA VALIDAR MODAL
    // ===============================================

    const handleValidate = () => {

        if(idOrden === 0){

            Swal.fire({
                icon: 'warning',
                title: 'Seleccione una orden para continuar!',
            })

        }else{

            document.getElementById("btnCrearFileOrdenLogistica").click();

        }

    }

    // ===============================================
    // SEGMENTO PARA ELIMINAR ARCHIVO
    // ===============================================

    const handleDeleteFile = (id, ruta) => {

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
                    
                    fetch(`${baseURL}api/delete/archivo/orden/logistica/${id}`, {
                            
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
    
            }
        )

    } 

    // ===============================================
    // ACTUALIZAR VALORES
    // ===============================================

    const handleChange = (event) => {

        const val = event.target.value;
        const name = event.target.name;

        console.log(name)

        name === 'ruta'
        ?
        setFormValues({ ...formValues, ["ruta"]: event.target.files[0], ["rel_orden"]: idOrden})
        :
        setFormValues({ ...formValues, [name]: val})
        
    }

    return (

        <div className='mt-3'>

            {
                idOrden !== 0 
                ?
                <p className='h3 text-center'>Orden # {idOrden}</p>
                :
                null
            }

            {/* BOTONES PARA CREAR ARCHIVO DE ORDEN */}

            <button 
                type="button" 
                className="btn btn-primary mt-4" 
                onClick={() => handleValidate()}>
                <MdAddCircle/> Agregar Documento
            </button>

            <button 
                id="btnCrearFileOrdenLogistica"
                type="button" 
                style={{display: "none"}}
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearArchivoLogistica">
            </button>

            {/* TABLA DE ARCHIVOS */}

            <Tabla columns = {columns} data = {data}/>

            {/* MODAL PARA CREAR ARCHIVO */}

            <CrearArchivoLogistica
                data={formValues}
                refresh={buscarFiles}
                onChange={handleChange}
                setFormValues={setFormValues}
            />

        </div>

    )

}

export default ArchivosOrdenesLogistica