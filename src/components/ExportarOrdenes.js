import React, { useState, useEffect } from 'react'
import {RiFileExcel2Line} from 'react-icons/ri';
import {CgExport} from 'react-icons/cg';
import Cookies from 'js-cookie';
import axios from 'axios';
import { baseURL } from '../config/config';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

const ExportarOrdenes = () => {

    const [token, setToken] = useState('');

    const [data, setData] = useState([]);

    // ===============================================
    // FUNCION PARA ABRIR MODAL
    // ===============================================

    const handleClick = () => {

        document.getElementById("btnAbrirFiltroOrden").click();

    }

    // ===============================================
    // FUNCION PARA ESCOGER FILTRO
    // ===============================================

    const handleChange = (event) => {

        const val = event.target.value;

        console.log(val)

        if(val !== ""){

            setToken(Cookies.get('jwtoken'));
    
            axios.get(`${baseURL}api/get/reporte/ordenes/${val}`,{
          
              method: "GET",
              headers: {"access-token": token}
          
            })
            .then(result => {
        
                if(result.data.success === true && result.data.result !== "Sin resultados")
                {        

                    const temp = [];
                    
                    // Agregar encabezados al arreglo data
                    const encabezados = Object.keys(result.data.result[0]);
                    
                    temp.push(encabezados);
                    
                    // Agregar valores al arreglo data

                    result.data.result.forEach(objeto => {

                        const valores = Object.values(objeto);
                        temp.push(valores);

                    });

                    setData(temp);
        
                }else{

                    setData([]);
        
                }
        
            })
            .catch(error => {
          
              console.log(error)
          
            })

        }else{

            setData([]);

        }

    }

    // ===============================================
    // EXPORTAR EXCEL
    // ===============================================

    const excelExport = () => {

        if(data.length === 0){

            Swal.fire({
                icon: 'warning',
                title: 'No hay registros!',
            })

        }else{

            const filename = 'reporteOrdenes.xlsx';

            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Tabla de datos');
            XLSX.writeFile(workbook, filename);

        }

    }

    // ===============================================
    // TRAER ESTATUS PARA EDITAR DESPACHO
    // ===============================================

    const [status, setStatus] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/estatusOrdenes`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let des = result.data.result;

                des.unshift({id: "Todo", estatus: "Todos los Registros"});
                des.unshift({id: "", estatus: "Seleccione Estado"});
        
                setStatus(des);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

    // ===============================================
    // RETURN
    // ===============================================

    return (

        <>

            <button 
                className='btn btn-outline-success'
                onClick={handleClick}
            >
                <RiFileExcel2Line/> 
                Reporte Ordenes
            </button>

            {/* BOTON PARA ABRIR MODAL */}

            <button 
                id="btnAbrirFiltroOrden"
                type="button" 
                style={{display: "none"}}
                data-bs-toggle="modal" 
                data-bs-target="#modalFiltrarReporte">
            </button>

            {/* MODAL PARA FILTRAR EXPORTACION */}

            <div className="modal fade" id="modalFiltrarReporte" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">Reporte de Ordenes</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>

                        <div className="modal-body">

                            <div className='row'>

                                {/* TRACTOR */}

                                <div className='col-12'>

                                    <span className="badge text-bg-secondary mb-2">Filtrar por:</span>

                                    <select
                                        key="rel_tractorOperador"
                                        name="rel_tractor"
                                        className="form-select"
                                        onChange={handleChange}>

                                        <option value={'2023'}>{'2023'}</option>
                                        <option value={'2024'}>{'2024'}</option>

                                        {status.map((op) => (
                                            <option key={op.id} value={op.id}>{op.estatus}</option>
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

export default ExportarOrdenes