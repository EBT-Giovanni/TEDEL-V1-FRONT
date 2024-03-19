import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import axios from 'axios';

//COMPONENTES
import Tabla from '../../components/Tabla';

//ICONS
import {BsPencil} from 'react-icons/bs';
import {MdAttachMoney} from 'react-icons/md';
import {BiTime} from 'react-icons/bi';
import GastosOrden from './GastosOrden';
import ModalEditarDespacho from './modales/ModalEditarDespacho';
import ModalTiemposDespacho from './modales/ModalTiemposDespacho';

function Asigandos() {

    // ===============================================
    // DATOS INICIALES PARA FORMULARIO
    // ===============================================

    const [formValuesEdit, setFormValuesEdit] = useState({
        rel_orden: "",
        rel_estatus: "",
        rel_chofer_1: "",
        choferActual: "",
        nombreChofer: "",
        rel_user: "",
        idCaja: ""
    })

    const [token, setToken] = useState('');

    // ===============================================
    // COLUMNAS PARA TABLA
    // ===============================================

    const columsAsignados = [

        {
            name: 'Orden',
            selector: row => row.id + " - " +row.nombre_comercial,
            sortable: true,
            width: "10%"
        },
        {
            name: 'Temperatura',
            selector: row => row.temperaturas,
            sortable: true,
            width: "12%"
        },
        {
            name: 'Tractor',
            selector: row => row.camion,
            sortable: true,
            width: "12%"
        },
        {
            name: 'Caja',
            selector: row => row.caja,
            sortable: true,
            width: "10%"
        },
        {
            name: 'Operador',
            selector: row => row.operador,
            sortable: true,
            width: "17%"
        },
        {
            name: 'Referencia',
            selector: row => row.referencia,
            width: "10%"
        },
        {
            name: 'Fecha Cita',
            selector: row => row.fecha_recoleccion,
            sortable: true,
            width: "16%"
        },
        {
            name: 'Fecha Entrega',
            selector: row => row.fecha_entrega,
            sortable: true,
            width: "16%"
        },
        {
            name: 'Estado',
            selector: row => row.estatus,
            width: "11%"
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                
                <div className="input-group">
                    <button className="btn btn-outline-success" type="button" onClick={() => handleGastos(row.id, row.id + " - " +row.nombre_comercial)}><MdAttachMoney/></button>
                    <button className="btn btn-outline-warning" type="button" data-bs-toggle="modal" data-bs-target="#modalEditarDespacho" onClick={() => handleEdit(row.id)}><BsPencil/></button>
                    <button className="btn btn-outline-info" type="button" data-bs-toggle="modal" data-bs-target="#modalTiemposDespacho" onClick={() => buscarTiemposDeViaje(row.idDespacho)}><BiTime/></button>
                </div>
                
            ),
            width: "14% "
            
        },

    ];

    // ===============================================
    // SEGMENTO PARA DESPACHOS ASIGNADOS
    // ===============================================

    const [dataAsignados, setDataAsignados] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/despachos/asignados`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success === true && result.data.result !== "Sin resultados")
            {

                setDataAsignados(result.data.result);

            }else{

                setDataAsignados([]);

            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

    // ===============================================
    // MOSTRAR GASTOS DE VIAJE
    // ===============================================

    const [idOrden, setIdOrden] = useState(0);

    const [idUser, setIdUser] = useState(0);

    const [title, setTitle] = useState('');

    const handleGastos = (id, name) => {

        let user = Cookies.get('idUser');

        setIdUser(user)

        setIdOrden(id)

        setTitle(name)

    }

    // ===============================================
    // MOSTRAR TIEMPOS DE VIAJE
    // ===============================================

    const [idDespacho, setIdDespacho] = useState(0);

    const buscarTiemposDeViaje = (id) => {

        setIdDespacho(id)

    }

    // ===============================================
    // ACTUALIZAR DATOS DEL FORMULARIO
    // ===============================================

    const handleChange = (event) => {

        const val = event.target.value;
        const name = event.target.name;

        setFormValuesEdit({ ...formValuesEdit, [name]: val });

    };

    // ===============================================
    // EDITAR DESPACHO
    // ===============================================

    const handleEdit = (id) => {

        const buscarOrden = async () => {

            const config = {
  
                headers: {"access-token": token},
        
            };

            const response = await axios.get(`${baseURL}api/info/estado/despacho/${id}`, config);

            if(response.data.success === true && response.data.result !== "Sin resultados"){

                let formTemp = response.data.result[0];

                setFormValuesEdit({...formValuesEdit, ["rel_orden"]:formTemp["idOrden"], ["rel_chofer_1"]:formTemp["idChofer"], ["rel_estatus"]:formTemp["estatus"], ["choferActual"]:formTemp["idChofer"], ["nombreChofer"]:formTemp["chofer"], ["rel_user"]:Cookies.get('idUser'), ["idCaja"]:formTemp["idCaja"]})

            }

        }

        buscarOrden()

    }

    //===========================================================

    return (

        <div>

            {/* TABLA DE DESPACHOS ASIGNADOS */}

            <Tabla columns = {columsAsignados} data = {dataAsignados}/>

            {/* TABLA PARA GASTOS DE ORDEN */}

            <GastosOrden idOrder={idOrden} idUser={idUser} header={title}/> 

            {/* MODAL PARA EDITAR DESTINO */}

            <ModalEditarDespacho
                data={formValuesEdit}
                onChange={handleChange}
            />

            {/* MODAL PARA TIEMPOS DE DESPACHO */}

            <ModalTiemposDespacho
                idDespacho={idDespacho}
                disable={false}
            />

        </div>

    )

}

export default Asigandos