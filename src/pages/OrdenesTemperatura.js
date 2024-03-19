import React, { useState, useEffect, useTransition } from 'react'
import Cookies, { set } from 'js-cookie';
import { baseURL } from '../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';

//COMPONENTES
import Tabla from '../components/Tabla';
import OrdenDocumentos from '../components/ordenes/OrdenDocumentos';

//ICONS
import {BsPencil} from 'react-icons/bs';
import {TiCancel} from 'react-icons/ti';
import {MdAddCircle} from 'react-icons/md';
import {GrDocumentText} from 'react-icons/gr';
import {FiDownload} from 'react-icons/fi';
import AccesorialesDoc from '../components/ordenes/AccesorialesDoc';
import CrearOrden from '../components/ordenes/modales/CrearOrden';
import EditarOrden from '../components/ordenes/modales/EditarOrden';
import ConsultarOrden from '../components/ordenes/modales/ConsultarOrden';

const OrdenesTemperatura = () => {

    const [token, setToken] = useState('');

    // ===============================================
    // SEGMENTO PARA MOSTRAR ORDENES
    // ===============================================

    const [data, setData] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        buscarOrdenes();
    
    },[token]);

    // FUNCION PARA BUSCAR DATOS

    const buscarOrdenes = async () => {

        const config = {
  
            headers: {"access-token": token},
    
        };

        const response = await axios.get(`${baseURL}api/ordenes`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setData(response.data.result)

        }else{

            setData([]);

        }

    }

    // ===============================================
    // COLUMNAS PARA LA TABLA
    // ===============================================

    const colums = [

        {
            name: 'Orden',
            selector: row => row.id,
            sortable: true,
            width: "100px"
        },
        {
            name: 'Cliente',
            selector: row => row.nombre_comercial,
            sortable: true,
            width: "150px"
        },
        {
            name: 'Ruta',
            selector: row => row.ruta,
            sortable: true
        },
        {
            name: 'Tractor',
            selector: row => row.tractor,
            sortable: true
        },
        {
            name: 'Caja',
            selector: row => row.caja,
            sortable: true
        },
        {
            name: 'Referencia',
            selector: row => row.referencia,
            sortable: true,
            width: "170px"
        },
        {
            name: 'Estado Orden',
            selector: row => row.estatus,
            sortable: true,
            width: "130px"
        },
        {
            name: "",
            button: true,
            cell: (row) => (
              
                <div className="input-group">
                    <button className="btn btn-outline-warning" type="button" onClick={() => handleEdit(row.id)} ><BsPencil/></button>
                </div>
             
            ),
            width: "130px"
            
        },

    ]

    // ===============================================
    // MOSTRAR DATOS
    // ===============================================

    const [idOrden, setIdOren] = useState(0)

    const  handleEdit  = async (id) => {

        setIdOren(id);

        document.getElementById("btnAbrirConsultarDatos").click();

    }

    return (

        <div>

            <h3 className='mb-4'>Ordenes</h3>

            {/* TABLA PARA MOSTRAR ORDENES */}

            <Tabla columns = {colums} data = {data}/>

            {/* BOTON PARA ABRIR MODAL */}

            <ConsultarOrden
                idOrden={idOrden}
            />

            <button 
                id="btnAbrirConsultarDatos"
                style={{"display":"none"}}
                type="button"
                data-bs-toggle="modal" 
                data-bs-target="#modalDatosOrden"
            ></button>

        </div>

    )

}

export default OrdenesTemperatura