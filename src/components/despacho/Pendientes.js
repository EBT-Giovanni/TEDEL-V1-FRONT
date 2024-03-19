import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import axios from 'axios';

//COMPONENTES
import Tabla from '../../components/Tabla';

//ICONS
import {MdAssignmentTurnedIn} from 'react-icons/md';
import ModalAsignarDespacho from './modales/ModalAsignarDespacho';

function Pendientes() {

    // ===============================================
    // SEGMENTO PARA DESPACHOS PENDIENTES
    // ===============================================

    const [data, setData] = useState([]);

    const [token, setToken] = useState('');

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/despachos/pendientes`,{
        
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
    // COLUMNAS PARA LA TABLA
    // ===============================================

    const columsPendientes = [

        {
            name: 'Orden',
            selector: row => row.id,
            sortable: true,
            width: "100px"
        },
        {
            name: 'Temperaturas',
            selector: row => row.temperaturas,
            sortable: true,
            width: "100px"
        },
        {
            name: 'Cliente',
            selector: row => row.nombre_comercial,
            sortable: true,
            width: "140px"
        },
        {
            name: 'Ruta',
            selector: row => row.ruta,
            sortable: true
        },
        {
            name: 'Referencia',
            selector: row => row.referencia,
            sortable: true,
            width: "140px"
        },
        {
            name: 'Fecha Recoleccion',
            selector: row => row.fecha_recoleccion,
            width: "160px"
        },
        {
            name: 'Fecha Entrega',
            selector: row => row.fecha_entrega,
            width: "160px"
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                
                <div className="input-group">
                    <button className="btn btn-outline-primary" type="button" data-bs-toggle="modal" data-bs-target="#modalCrearDespacho" onClick={() => updateModal(row.id, row.nombre_comercial, row.caja)}><MdAssignmentTurnedIn/></button>
                </div>
                
            ),
            width: "90px"
            
        },

    ];

    // ===============================================
    // VALORES INICIALES PARA EL FORMULARIO
    // ===============================================

    const [formValues, setFormValues] = useState({

        rel_orden: "",
        rel_chofer_1: "",
        rel_chofer_2: "",
        fecha_salida: "",
        hora_salida: "",
        dobleOp: ""

    });

    // ===============================================
    // FUNCION PARA CAMBIAR HEADER DE MODAL
    // ===============================================

    const [modalHeader, setModalHeader] = useState('')

    const updateModal = (id, cliente, caja) => {

        let title = id + " - "+cliente;
        
        setModalHeader(title);

        setCajas(caja)

        setFormValues({ ...formValues, ["rel_orden"]: id })

    }

    // ===============================================
    // ORDENES PARA DESPACHO
    // ===============================================

    const [ordenes, setOrdenes] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/ordenes/abiertas`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let status = result.data.result;

                status.unshift({id: "", ordenCliente: "Seleccione la orden"});
        
                setOrdenes(status);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);
    
    // ===============================================
    // TRACTORES PARA DESPACHO
    // =============================================== 
    
    const [tractores, setTractores] = useState('');

    const mostrarTractor = async (id) => {

        axios.get(`${baseURL}api/operador/${id}`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let temp = result.data.result[0]["tractor"];

                setTractores(temp);

            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })

    }
    
    // ===============================================
    // OPERADORES PARA DESPACHO
    // ===============================================  
    
    const [operadores, setOperadores] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/operadores/activos`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success === true && result.data.result !== "Sin resultados")
            {

                let status = result.data.result;

                status.unshift({id: "0", nombre: "Sin operador"});

                status.unshift({id: "", nombre: "Seleccione un operador"});
        
                setOperadores(status);

            }else{

                setOperadores([{id: "", nombre: "No hay Operadores disponibles"}]);

            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);
    
    // ===============================================
    // CAJAS PARA DESPACHO
    // ===============================================  
    
    const [cajas, setCajas] = useState('');

    // ===============================================
    // ACTUALIZAR FORMULARIO
    // ===============================================

    const handleChange = (event) => {

        const val = event.target.value;
        const name = event.target.name;

        setFormValues({ ...formValues, [name]: val });

        if(name === "rel_chofer_1" && val !== ""){

            mostrarTractor(val);

        }

    }

    // ===============================================

    return (

        <div>

            {/* TABLA PARA MOSTRAR ORDENES PENDIENTES */}

            <div className='mt-4'>

                <Tabla columns = {columsPendientes} data = {data}/>

            </div>

            {/* MODAL PARA CREAR DESPACHO */}

            <ModalAsignarDespacho
                data={formValues}
                onChange={handleChange}
                operadores={operadores}
                cajas={cajas}
                tractores={tractores}
                header={modalHeader}
            />

        </div>

    )

}

export default Pendientes
