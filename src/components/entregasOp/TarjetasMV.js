import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';
import {AiFillDelete} from 'react-icons/ai';
import {RiAddCircleFill} from 'react-icons/ri';
import {FaRoad} from 'react-icons/fa';
import EvidenciasMV from './evidenciasMV';

function TarjetasMV() {

    // const [formValues, setFormValues] = useState({

    //     rel_mov: "",
    //     rel_op: "",
    //     descripcion: "",
    //     monto: "0",
    //     ruta: ""

    // })

    const [token, setToken] = useState('');

    const [tarjetas, setTarjetas] = useState([]);

    // ===============================================
    // BUSCAR MOVIMIENTO MV
    // ===============================================

    const [idMovimiento, setIdMovimiento] = useState(0)

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));

        const idUseer = Cookies.get('idUser');

        const fetch = async () => {

            const config = {
  
                headers: {"access-token": token},
        
            };

            const response = await axios.get(`${baseURL}api/movimientos/vacios/por/operador/${idUseer}`, config);

            if(response.data.success === true && response.data.result !== "Sin resultados"){

                const temp = response.data.result[0];

                //GUARDAMOS EL ID DEL DESPACHO

                setIdMovimiento(temp.id)
                
                //setFormValues({ ...formValues, rel_mov: temp.id, rel_op: idUseer });

                buscarFiles(temp.id, temp.movimiento, temp.origen, temp.destino);

            }else{


            }

        }
        
        fetch();
    
    },[token]);

    // ===============================================
    // BUSCAR ARCHIVOS DE LA ORDEN
    // ===============================================

    const buscarFiles = async (idMV, nombre, origen, destino) => {

        setToken(Cookies.get('jwtoken'));

        const config = {
  
            headers: {"access-token": token},
    
        };

        const response = await axios.get(`${baseURL}api/movimientos/vacios/evidencias/${idMV}`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            const temp = response.data.result;

            dibujarTarjeta(idMV, nombre, temp, origen, destino);

        }
        else{

            const temp = [];

            dibujarTarjeta(idMV, nombre, temp, origen, destino);

        }

    }

    // ===============================================
    // DIBUJAR TARJETA PARA VER MOVIMIENTO VACIO
    // ===============================================

    const dibujarTarjeta = (id, nombre, files, origen, destino) => {

        let ordenes = []

        const elemento = (

            <div className='col-12 col-lg-3 mb-4' key={id}>

                <div className="card text-center">

                    <div className="card-body">

                        <h5 className="card-title">{nombre}</h5>

                        <hr/>

                        <div className="card-text text-center">

                            <span>{origen}</span><br/>
                            <span>a</span><br/>
                            <span className='mt-3'>{destino}</span><br/><br/>

                            <b>Evidencia anexada:</b> <br/>
                            <div className='mt-3' style={{ display: "flex", justifyContent: "center" }}>
                                <ul>

                                    {

                                        files.map((item) => (

                                            <li key={item.id} className="mt-2">
                                                {item.descripcion}
                                                <button className='btn btn-danger btn-sm ms-2' onClick={() => handleDelete(item.id, item.ruta)}><AiFillDelete/></button>
                                            </li>

                                        ))

                                    }

                                </ul>
                            </div>
                        </div>

                        <button 
                            type="button" 
                            className="btn btn-primary mb-4"
                            data-bs-toggle="modal" 
                            data-bs-target="#modalSubirEvidenciaMV">
                            <RiAddCircleFill/> Agregar Documentos
                        </button>

                        <button 
                            type="button" 
                            className="btn btn-danger"
                            onClick={() => cerrarMv(id)}>
                            <FaRoad/> Cerrar Viaje
                        </button>

                    </div>

                </div>

            </div>

        )

        ordenes.push(elemento)

        setTarjetas(ordenes)

    }

    // ===============================================
    // SEGMENTO PARA ELIMINAR EVIDENCIA DE MV 
    // ===============================================

    const handleDelete = (id, path) => {
        
        Swal.fire({
            title: 'Estas seguro de borrar este registro?',
            text: "Esta accion no podra ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
            }).then((result) => {
    
                if(result.isConfirmed) {
    
                    const data = { path: path };
                    
                    fetch(`${baseURL}api/movimiento/vacio/evidencia/delete/${id}`, {
                            
                        method: "DELETE", // or 'PUT'
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
    // SEGMENTO PARA CERRAR MV 
    // ===============================================

    const cerrarMv = (id) => {

        Swal.fire({
            title: 'Estas seguro de cerrar este viaje?',
            text: "Esta accion no podra ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, cerrar!'
            }).then((result) => {
    
                if(result.isConfirmed) {
                    
                    fetch(`${baseURL}api/update/estado/movimiento/vacio/${id}`, {
                            
                        method: "PUT", // or 'PUT'
                        headers: {
                            "Content-Type": "application/json",
                            "access-token": token
                        }
    
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        
                        if(data.success === true){
    
                            
                            Swal.fire({
                                icon: 'success',
                                title: 'El viaje ha sido cerrado!',
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
    // SEGMENTO PARA CAMBIAR FORMDATA
    // ===============================================

    return (

        <div>

            <div className='row'>

                {tarjetas}

            </div>

            <EvidenciasMV 
                id={idMovimiento}
                perfil="operador"
            />

        </div>
        
    )

}

export default TarjetasMV