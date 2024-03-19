import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import axios from 'axios';

//COMPONENTES
import Tabla from '../../components/Tabla';

//ICONS
import {BsPencil, BsDownload} from 'react-icons/bs';
import {RiAddCircleFill} from 'react-icons/ri';
import {AiOutlineDollarCircle} from 'react-icons/ai';
import EditarMV from './EditarMV';

import EvidenciasMV from '../entregasOp/evidenciasMV';

const MvAsignados = () => {

    // ===============================================
    // FORM DATA PARA EDITAR MV
    // ===============================================

    const [formValues, setFormValues] = useState({
        rel_orden: "",
        movimiento: "",
        rel_destino: "",
        rel_origen: "",
        estado: "1",
    });

    // ===============================================
    // SEGMENTO PARA MOSTRAR MOVIMIENTOS VACIOS
    // ===============================================

    const [data, setData] = useState([]);

    const [token, setToken] = useState('');

    //TRAER DATOS PARA MOSTRAR MOVIMIENTOS

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/movimientos/vacios`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success === true && result.data.result !== "Sin resultados")
            {

                setData(result.data.result);

            }else{

                setData([]);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

    // ===============================================
    // COLUMNA PARA TABLAS
    // ===============================================

    const columns = [

        {
            name: 'MV',
            selector: row => row.movimiento,
            sortable: true,
            width: "8%"
        },
        {
            name: 'Operador',
            selector: row => row.operador,
            sortable: true,
            width: "15%"
        },
        {
            name: 'Tractor',
            selector: row => row.tractor,
            sortable: true,
            width: "10%"
        },
        {
            name: 'Origen',
            selector: row => row.origen,
            sortable: true,
            width: "23%"
        },
        {
            name: 'Destino',
            selector: row => row.destino,
            sortable: true,
            width: "23%"
        },
        {
            name: 'Estatus',
            selector: row => row.estatus,
            sortable: true,
            width: "10%"
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                
                <div className="input-group">

                    <button className="btn btn-outline-success" type="button" onClick={() => buscarEvidencias(row.id, row.movimiento)} ><AiOutlineDollarCircle/></button>

                    <button className="btn btn-outline-warning" type="button" data-bs-toggle="modal" data-bs-target="#modalEditarMV" onClick={() => buscarMovimiento(row.id)} ><BsPencil/></button>

                </div>
                
            ),
            width: "11%"
            
        },

    ];

    // ===============================================
    // SEGMENTO PARA EDITAR MOVIMIENTO
    // ===============================================

    const [title, setTitle] = useState('')

    const buscarMovimiento = async (id) => {

        const config = {

            headers: {"access-token": token},
    
        };
 
        const response = await axios.get(`${baseURL}api/movimientos/vacios/${id}`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){console.log(response.data.result[0])

            setFormValues(response.data.result[0]);

            setTitle(response.data.result[0]["movimiento"])

            document.getElementById("selectOrigenEditMV").value = response.data.result[0]["rel_ruta"];

            // document.getElementById("selectDestinoEditMV").value = response.data.result[0]["rel_destino"];

            document.getElementById("estadoSelectMV").value = response.data.result[0]["estado"];

        }

    }

    // ===============================================
    // SEGMENTO PARA ACTUALIZAR FORMULARIO
    // ===============================================

    const handleChange = (event) =>{

        const val = event.target.value;
        const name = event.target.name;

        setFormValues({ ...formValues, [name]: val });

    }

    // ===============================================
    // BUSCAR EVIDENCIAS DE MOVIMIENTOS VACIOS
    // ===============================================

    const [nombreMV, setNombreMV] = useState('');

    const [dataEvidencia, setDataEvidencia] = useState([]);

    const [idMovimiento, setIdMovimiento] = useState(0);

    const [perfil, setPerfil] = useState('');

    const buscarEvidencias = async (id, nombre) => {

        setIdMovimiento(id);

        setPerfil("Despachador");

        const config = {
  
            headers: {"access-token": token},
    
        };

        const response = await axios.get(`${baseURL}api/movimientos/vacios/evidencias/${id}`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setNombreMV(nombre)
            setDataEvidencia(response.data.result);

        }
        else{

            setDataEvidencia([])
            setNombreMV('')

        }

    }

    const columnsE = [

        {
            name: 'Descripcion',
            selector: row => row.descripcion,
            sortable: true,
            width: "60%"
        },
        {
            name: 'Monto',
            selector: row => "$ " + row.monto,
            sortable: true,
            width: "30%"
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                
                <div className="input-group">

                    <button className="btn btn-outline-warning" type="button" onClick={() => handleDownload(row.ruta)}><BsDownload/></button>

                </div>
                
            ),
            width: "10%"
            
        },

    ];

    // ===============================================
    // DESCARGAR EVIDENCIA DE ENTREGA
    // ===============================================

    const handleDownload = (ruta) => {

        let nombre = ruta.split("%");

        nombre = nombre[1];

        axios({
            url: `${baseURL}api/movimiento/vacio/evidencias/download`,
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

    //==============================================

    return (

        <div className='mt-4'>

            {/* TABLA PARA MOSTRAR MOVIMIENTOS ASIGNADOS */}

            <Tabla columns = {columns} data = {data}/>

            {/* SEGMENTO PARA MOSTRAR EVIDENCIAS DE MOVIMIENTOS VACIOS */}

            <h4 className='mt-4 text-center'>Gastos {nombreMV}</h4>

            {/* SI HAY RESULTADOS MOSTRAMOS LA TABLA */}

            <button 
                type="button" 
                className="btn btn-primary"
                data-bs-toggle="modal" 
                data-bs-target="#modalSubirEvidenciaMV">
                <RiAddCircleFill/> Agregar Evidencia
            </button>

            <Tabla columns = {columnsE} data = {dataEvidencia}/>

            {/* MODAL PARA EDITAR MV */}

            <EditarMV
                data={formValues}
                title={title}
                onChange={handleChange}
            />

            {/* MODAL PARA CREAR GASTOS DE ORDEN */}

            <EvidenciasMV 
                id={idMovimiento}
                perfil={perfil}
            />

        </div>

    );

}

export default MvAsignados;
