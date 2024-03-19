import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {RiFileExcel2Line} from 'react-icons/ri';
import {CgExport} from 'react-icons/cg';
import * as XLSX from 'xlsx';
import { baseURL } from '../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';

const ExportarOrdenesPlantas = () => {

    // ===============================================
    // EXPORTAR EXCEL
    // ===============================================

    const handleClick = () => {

        document.getElementById("btnAbrirReportePorPlanta").click();

    }

    // ===============================================
    // FUNCION PARA CAMBIAR VALORES
    // ===============================================

    const [data, setData] = useState({
        cliente: '',
        direccion: ''
    })

    const handleChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        setData({
            ...data,
            [name]: value
        })

    }

    // ===============================================
    // FUNCION PARA BUSCAR ORDENES POR DIRECCION
    // ===============================================

    const buscarReporte = async () => {

        const config = {
  
            headers: {"access-token": Cookies.get('jwtoken')},
    
        };

        const response = await axios.get(`${baseURL}api/get/ordenes/por/ruta/${data.direccion}`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            return response.data.result;

        }else{

            return 'error';

        }

    }

    // ===============================================
    // EXPORTAR EXCEL
    // ===============================================

    const excelExport = async () => {

        if(data.cliente === '' && data.direccion === ''){

            Swal.fire({
                icon: 'warning',
                title: 'No hay registros!',
            })

        }else{

            const ordenes = await buscarReporte();

            if(ordenes === 'error'){

                Swal.fire({
                    icon: 'warning',
                    title: 'No hay registros!',
                })

                return;

            }

            const filename = 'reporteOrdenes.xlsx';

            const worksheet = XLSX.utils.json_to_sheet(ordenes);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Tabla de datos');
            XLSX.writeFile(workbook, filename);

        }

    }

    // ===============================================
    // FUNCION PARA BUSCAR LOS DIRECCIONES POR CLIENTE
    // ===============================================

    const [direcciones, setDirecciones] = useState([]);

    const buscarDirecciones = (idCliente) => {

        axios.get(`${baseURL}api/direccion/cliente/${idCliente}`,{
        
            method: "GET",
            headers: {"access-token": Cookies.get('jwtoken')}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let client = result.data.result;

                client.unshift({id: "", nombre: "Seleccione una direccion"});
        
                setDirecciones(client);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })

    }

    useEffect(() => {

        if(data.cliente != 0){console.log("ENTRE")

            buscarDirecciones(data.cliente);

        }

    },[data.cliente])

    // ===============================================
    // FUNCION PARA BUSCAR LOS CLIENTES
    // ===============================================

    const [clientes, setClientes] = useState([]);

    const buscarClientes = () => {

        axios.get(`${baseURL}api/clientes`,{
        
            method: "GET",
            headers: {"access-token": Cookies.get('jwtoken')}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let client = result.data.result;

                client.unshift({id: "", nombre_comercial: "Seleccione el cliente"});
        
                setClientes(client);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })

    }

    useEffect(() => {

        buscarClientes();

    },[])

    // ===============================================

    return (

        <>

            <button 
                className='btn btn-outline-success'
                onClick={handleClick}
            >
                <RiFileExcel2Line/> 
                Ordenes Por Planta
            </button>

            {/* BOTON PARA ABRIR MODAL */}

            <button 
                id="btnAbrirReportePorPlanta"
                type="button" 
                style={{display: "none"}}
                data-bs-toggle="modal" 
                data-bs-target="#modalReportePorPlanta">
            </button>

            {/* MODAL PARA FILTRAR EXPORTACION */}

            <div className="modal fade" id="modalReportePorPlanta" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">Reporte Por Planta</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>

                        <div className="modal-body">

                            <div className='row'>

                                {/* CLIENTE */}

                                <div className='col-12'>

                                    <span className="badge text-bg-secondary mb-2">Cliente:</span>

                                    <select
                                        key="clienteRuta"
                                        name="cliente"
                                        className="form-select"
                                        onChange={handleChange}>

                                        {clientes.map((op) => (
                                            <option key={op.id} value={op.id}>{op.nombre_comercial}</option>
                                        ))}
                                        
                                    </select>

                                </div>

                                {/* DIRECCION */}

                                <div className='col-12 mt-3'>

                                    <span className="badge text-bg-secondary mb-2">Direccion:</span>

                                    <select
                                        key="clienteRuta"
                                        name="direccion"
                                        className="form-select"
                                        onChange={handleChange}>

                                        {direcciones.map((op) => (
                                            <option key={op.id} value={op.id}>{op.nombre} | {op.direccion}</option>
                                        ))}
                                        
                                    </select>

                                </div>

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button type="button" className='btn btn-primary float-end' onClick={excelExport}><CgExport/> Exportar</button>

                        </div>

                    </div>

                </div>

            </div>
        
        </>

    )

}

export default ExportarOrdenesPlantas