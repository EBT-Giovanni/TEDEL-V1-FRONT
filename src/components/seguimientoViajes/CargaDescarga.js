import React, {useState, useEffect} from 'react';
import {BsCameraFill, BsCloudUploadFill} from 'react-icons/bs';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

import SubirFoto from '../evidenciasEntrega/SubirFoto';
import TomarFoto from '../evidenciasEntrega/TomarFoto';

const CargaDescarga = ({tiempos, idOrden, refresh}) => {

    const [token, setToken] = useState('');

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));

        buscarArchivos(idOrden);

    },[]);

    const [showMenu, setShowMenu] = useState(true);

    // ===============================================
    // CATALOGO DE COMPONENTES
    // ===============================================

    const views = {

        subir: SubirFoto,
        tomar: TomarFoto,

    }

    // ===============================================
    // OPCION DE COMPONENTE 
    // ===============================================

    const [opcion, setOpcion] = useState('subir');

    // ===============================================
    // COMPONENTE DINAMICO
    // ===============================================

    const ComponenteActual = views[opcion];

    // ===============================================
    // FUNCION PARA ESCOGER COMPONENTE
    // ===============================================

    const cambiarComponente = (op) => {

        setOpcion(op);
        setShowMenu(false);

    }

    // ===============================================
    // MOSTRAR MENU
    // ===============================================

    const resetMenu = () => {

        setShowMenu(true);

    }

    // ===============================================
    // FUNCION PARA BUSCAR ARCHIVOS DE LA ORDEN
    // ===============================================

    const [files, setFiles] = useState([]);

    const buscarArchivos = async (id) => {

        const config = {
            headers: {"access-token": token},
        };

        const response = await axios.get(`${baseURL}api/get/evidencia/entrega/orden/${id}`, config);console.log(response.data)

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setFiles(response.data.result);

        }

    }

    // ===============================================
    // FUNCION PARA FORMATEAR LA FECHA
    // ===============================================

    const formatoFecha = (date) => {

        // Crear un objeto Date a partir de la cadena original
        const fecha = new Date(date);

        // Extraer año, mes y día
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // El mes es 0-indexed, así que se suma 1
        const día = String(fecha.getDate()).padStart(2, '0');

        // Formatear la fecha en 'yyyy-mm-dd'
        const fechaFormateada = `${año}-${mes}-${día}`;

        return fechaFormateada;

    }

    // ===============================================
    // FUNCION PARA FINALIZAR LA ORDEN
    // ===============================================

    const finalizarViaje = () => {

        Swal.fire({
            title: 'Esta seguro de finalizar el viaje?',
            //text: "Esta accion no podra ser revertida!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, finalizar!'
          }).then((result) => {
            if (result.isConfirmed) {
      
                const url = `${baseURL}api/update/despacho/tiempo`;

                // Obtener la fecha actual
                const date = new Date();
                
                // Formatear la fecha como YYYY-MM-DD
                const formattedDate = date.toISOString().slice(0, 10);
                
                // Formatear la hora como HH:MM:SS
                const formattedTime = date.toTimeString().slice(0, 8);

                let data = {...tiempos}

                // FORMATEAR FECHA DE SALIDA

                data.fecha_inicio_transito = formatoFecha(data.fecha_inicio_transito);

                // FORMATEAMOS LA FECHA DE LLEGADA

                data.fecha_llegada_cliente = formatoFecha(data.fecha_llegada_cliente);

                data.fecha_carga_descarga = formattedDate;
                data.hora_carga_descarga = formattedTime;

                axios.put(url, data,{
        
                    headers: {
                        "access-token": Cookies.get('jwtoken')
                    } 
            
                })
                .then(result => {
            
                    if(result.data.success === true)
                    {

                        refresh(data.rel_despacho);
                
                    }
            
                })
                .catch(error => {
            
                    console.log(error)
            
                })
      
            }
            
        })

    }

    return (

        <>
    
            <button 
                className='btn btn-success mb-3'
                onClick={finalizarViaje}
            >
                Finalizar Viaje
            </button>

            <button 
                className='btn btn-primary'
                data-bs-toggle="modal" 
                data-bs-target="#modalSubirEvidenciaEntregaC"
                onClick={resetMenu}
            >
                Subir Evidencias
            </button>

            {
                files.length > 0 ? (
                    <ul className='mt-3'>
                    {files.map((file, index) => (
                        <li key={index}>{`Archivo #${index+1}`}</li>
                    ))}
                    </ul>
                ) : null
            }

            {/* MODAL PARA SUBIR EVIDENCIA */}

            <div className="modal fade" id="modalSubirEvidenciaEntregaC" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Subir Evidencia</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" id='cerrarModalEvidenciaEntrega2' aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        {
                            showMenu ? (

                            <div className="container">
                                <div className="row justify-content-center align-items-center">
                                    <div className="col-xs-12 mb-4">
                                        <div className="card" onClick={() => cambiarComponente('tomar')}>
                                            <div className="card-body text-center">
                                                <BsCameraFill size={50} /> {/* Ícono grande */}
                                                <h5 className="card-title mt-3">Tomar Foto</h5> {/* Título */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="card" onClick={() => cambiarComponente('subir')}>
                                            <div className="card-body text-center">
                                                <BsCloudUploadFill size={50} /> {/* Ícono grande */}
                                                <h5 className="card-title mt-3">Subir Foto</h5> {/* Título */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            )

                            : (

                                <ComponenteActual 
                                    idOrden={idOrden}
                                    refresh={buscarArchivos}
                                />

                            )
                        }

                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        {/* <button type="button" className="btn btn-primary"><FiUpload/> Subir Evidencia</button> */}
                    </div>
                    </div>
                </div>
            </div>

        </>

    )

}

export default CargaDescarga