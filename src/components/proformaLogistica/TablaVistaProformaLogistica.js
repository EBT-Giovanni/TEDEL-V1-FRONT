import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import axios from 'axios';

//COMPONENTES
import Tabla from '../Tabla';

//ICONOS
import {GrDocumentPdf} from 'react-icons/gr';
import {FaHistory} from 'react-icons/fa';
import ModalViewPDFLogistica from './modales/ModalViewPDF';
import ModalHistorico from './modales/ModalHistorico';

const TablaVistaProformaLogistica = () => {

    const [token, setToken] = useState('');

    // ===============================================
    // SEGMENTO PARA TRAER PROFORMAS CREADAS
    // ===============================================

    const [data, setData] = useState([]);

    useEffect(() => {

        buscarProformas();
    
    },[token])

    // FUNCION PARA BUSCAR DATOS DE ORDENES PARA ASIGNAR PROFORMAS PENDIENTES

    const buscarProformas = async () => {

        setToken(Cookies.get('jwtoken'));

        const config = {

            headers: {
                "access-token": token
            },
    
        };

        const response = await axios.get(`${baseURL}api/get/proformasLogisticas`, config);
    
        if(response.data.success === true && response.data.result !== "Sin resultados"){
            
            setData(response.data.result);

        }else{

            setData([]);

        }

    }

    // ===============================================
    // COLUMNAS PARA LA TABLA
    // ===============================================

    const columns = [

        {
            name: 'Num. Orden',
            selector: row => row.rel_orden,
            sortable: true,
        },
        {
            name: 'Cliente',
            selector: row => row.cliente_nombre,
            sortable: true
        },
        {
            name: 'Tractor',
            selector: row => row.tractor_num_economico,
            sortable: true,
        },
        {
            name: 'Chofer',
            selector: row => row.operador_nombre,
            sortable: true,
        },
        {
            name: 'Caja',
            selector: row => row.remolque_num,
            sortable: true,
        },
        {
            name: "",
            button: true,
            cell: (row) => (
              
                <div className="input-group">
                    <button className='btn btn-outline-primary' type="button" data-bs-toggle="modal" data-bs-target="#modalHistoricoProformaLogistica" onClick={() => handleHistorico(row.rel_orden)}><FaHistory/></button>
                    <button className="btn btn-outline-info" type="button" data-bs-toggle="modal" data-bs-target="#modalPDFProformaLogistica" onClick={() => handlePDF(row.idProformaLogistica)}><GrDocumentPdf/></button>
                </div>
             
            ),
            
        },

    ];

    // ===============================================
    // FUNCION PARA GENERAR HISTORICO DE LA PROFORMA
    // ===============================================

    const [historico, setHistorico] = useState([]);

    const handleHistorico = async (id) => {

        setToken(Cookies.get('jwtoken'));

        const config = {

            headers: {
                "access-token": token
            },
    
        };

        const response = await axios.get(`${baseURL}api/get/historico/proforma/${id}`, config);
    
        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setHistorico(response.data.result);

        }else{

            setHistorico([]);

        }

    }

    // ===============================================
    // FUNCION PARA GENERAR PDF
    // ===============================================

    const [proforma, setProforma] = useState([]);

    const handlePDF = async (id) => {

        setToken(Cookies.get('jwtoken'));

        const config = {

            headers: {
                "access-token": token
            },
    
        };

        const response = await axios.get(`${baseURL}api/getproformaLogistica/${id}`, config);
            
        if(response.data.success === true && response.data.result !== "Sin resultados"){
            
            setProforma(response.data.result[0]);

        }else{

            setProforma([]);

        }

    }

    // ===============================================
    // TABLA
    // ===============================================

    return (

        <div>

            <Tabla columns = {columns} data = {data}/>

            <ModalViewPDFLogistica data={proforma}/>

            {/* <ModalHistorico data={historico}/> */}

        </div>
        
    )

}

export default TablaVistaProformaLogistica