import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../config/config';
import axios from 'axios';
import moment from 'moment';
import * as XLSX from 'xlsx';

//ICONS
import {IoMdPersonAdd} from 'react-icons/io';
import {BsPencil, BsFillInfoCircleFill} from 'react-icons/bs';
import {AiOutlineIdcard} from 'react-icons/ai';
import {RiFileExcel2Line} from 'react-icons/ri';

//COMPONENTES
import Tabla from '../components/Tabla';
import CrearOperador from '../components/operador/modales/CrearOperador';
import EditarOperador from '../components/operador/modales/EditarOperador';
import Comentarios from '../components/operador/Comentarios';
import DocumentosOperador from '../components/operador/DocumentosOperador';
import DatosNomina from '../components/operador/DatosNomina';

//===================================================================

const Operadores = () => {

    const [token, setToken] = useState('');

    const [data, setData] = useState([]);

    // ===============================================
    // MOSTRAR LISTADO DE OPERADORES 
    // ===============================================

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
    
        axios.get(`${baseURL}api/operadores`,{
    
            method: "GET",
            headers: {"access-token": token}
    
        })
        .then(result => {

        if(result.data.success === true && result.data.result !== 'Sin resultados')
        {console.log(result.data.result)
            setData(result.data.result);
        }
        else{
            setData([])
        }

        })
        .catch(error => {
    
            console.log(error)
    
        })

    },[token])

    // ===============================================
    // COLUMNAS PARA LA TABLA DE OPERADORES
    // ===============================================

    const columns = [

        {
            name: 'CLAVE',
            selector: row => row.clave,
            sortable: true,
            width: "100px"
        },
        {
            name: 'NOMBRE',
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: 'TRACTOR',
            selector: row => row.tractor,
            sortable: true
        },
        {
            name: 'Fecha Ingreso',
            selector: row => row.fecha_ingreso !== null
            ?
            row.fecha_ingreso.split('T')[0]
            :
            'N/A'
        },
        {
            name: 'Fecha Baja',
            selector: row => row.fecha_baja !== null
            ?
            row.fecha_baja.split('T')[0]
            :
            'N/A'
         },
        {
            name: 'ESTADO',
            selector: row => row.estatus
        },
        {
            name: 'ESTADO',
            selector: row => row.activo === 1 ? 
                <button className='btn btn-success'>ACTIVO</button> :
                <button className='btn btn-danger'>INACTIVO</button>,
            width: "130px"
        },
        {
            name: "ACCIONES",
            button: true,
            cell: (row) => (
                
                <div className="input-group">
                    <button className="btn btn-outline-info" type="button" onClick={() => handleInfo(row.id, row.nombre)}><BsFillInfoCircleFill/></button>
                    <button className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#modalEditarOperador" onClick={() => handleEdit(row.id)} type="button"><BsPencil/></button>
                    <button className="btn btn-outline-primary" onClick={() => handleInfoNomina(row.id)} type="button"><AiOutlineIdcard/></button>
                </div>
            
            ),
            width: "125px"
        },
    
    ];

    // ===============================================
    // MOSTRAR DATOS DE NOMINA
    // ===============================================

    const [idOp, setIdOp] = useState(0);

    const handleInfoNomina = (id) => {

        setIdOp(id);

    }

    // ===============================================
    // MOSTRAR INFO DEL OPERADOR
    // ===============================================

    const [name, setName] = useState('');

    const [idOperador, setIDOperador] = useState(0);

    const handleInfo = (id, operador) => {

        setName(operador);

        setIDOperador(id);

    }

    // ===============================================
    // FORM DATA PARA MODAL
    // ===============================================

    const [formValues, setFormValues] = useState({

        clave: "",
        nombre: "",
        domicilio: "",
        telefono: "",
        celular: "",
        rel_estatus: "1",
        activo: "1",
        fecha_ingreso: "",
        fecha_baja: "",
        rel_tractor: ""

    })

    // ===============================================
    // BUSCAR DATOS PARA ACTUALIZAR OPERADOR
    // ===============================================

    const handleEdit = async (id) => {

        setToken(Cookies.get('jwtoken'));
  
        const config = {
  
          headers: {"access-token": token},
  
        };

        const response = await axios.get(`${baseURL}api/operador/${id}`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            const op = JSON.parse(JSON.stringify(response.data.result), (key, value) => {

                // Verificar si el valor es una fecha y, en caso afirmativo, formatearla usando moment.js
                if ((key === 'fecha_ingreso') && moment(value, moment.ISO_8601, true).isValid()) {
                    return moment(value).format('YYYY-MM-DD');
                }
                if ((key === 'fecha_baja') && moment(value, moment.ISO_8601, true).isValid()) {
                    return moment(value).format('YYYY-MM-DD');
                }
                // De lo contrario, devolver el valor sin modificar
                return value;

            });

            setFormValues(op[0])

            document.getElementById("selectTractorOp").value = op[0]["rel_tractor"];

            document.getElementById("selectActivoOp").value = op[0]["activo"];

        }

    };

    // ===============================================
    // ACTUALIZAR FORMULARIO
    // ===============================================

    const handleChange = (event) => {

        const val = event.target.value;
        const name = event.target.name;

        setFormValues({ ...formValues, [name]: val });

    }

    // ===============================================
    // DESCARGAR REPORTE OPERADORES
    // ===============================================

    const descargarReporte = () => {

        const filename = 'reporteOperadores.xlsx';

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Tabla de datos');
        XLSX.writeFile(workbook, filename);

    }

    //====================================================

    return (

        <div>

            <h3 className='mb-4'>Operadores</h3>

            {/* BOTON PARA ABRIL MODAL */}

            <button 
                type="button" 
                className="btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearOperador">
                <IoMdPersonAdd/> Agregar Operador
            </button>

            <button 
                type="button" 
                className="btn btn-primary" 
                style={{backgroundColor: 'green', marginLeft: '20px'}}
                onClick={() => descargarReporte()}
            >
                <RiFileExcel2Line/> Reporte Operadores
            </button>

            {/* TABLA PARA MOSTRAR OPERADORES */}

            <Tabla columns = {columns} data = {data}/>

            {/* MODAL PARA CREAR OPERADOR */}

            <CrearOperador 
                onChange = {handleChange}
                data = {formValues}
            />

            {/* MODAL PARA EDITAR OPERADOR */}

            <EditarOperador
                onChange = {handleChange}
                data = {formValues}
            />

            <h4 className='text-center mt-4'>{name}</h4>

            {/* TABS PARA COMENTARIOS Y DOCUMENTOS */}

            <ul className="nav nav-tabs nav-justified mt-4" id="myTab" role="tablist">

                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#opComent" type="button" role="tab" aria-controls="home" aria-selected="true"><p className="h5">Comentarios</p></button>
                </li>

                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#opDocs" type="button" role="tab" aria-controls="profile" aria-selected="false"><p className="h5">Documentos</p></button>
                </li>

            </ul>

            {/* ======================================================== */}

            <div className="tab-content" id="myTabContent">

                {/* COMENTARIOS */}

                <div className="tab-pane fade show active" id="opComent" role="tabpanel" aria-labelledby="home-tab">

                    <Comentarios idOperador={idOperador}/>

                </div>

                {/* DOCUMENTOS */}

                <div className="tab-pane fade" id="opDocs" role="tabpanel" aria-labelledby="profile-tab">

                    <DocumentosOperador idOperador={idOperador}/>

                </div>

            </div>

            {/* ======================================================== */}

            {/* SECCION PARA DATOS DE NOMINA */}

            <DatosNomina idOperador={idOp}/>

        </div>

    )

}

export default Operadores;
