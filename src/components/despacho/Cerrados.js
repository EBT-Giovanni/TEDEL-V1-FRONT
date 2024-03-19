import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import axios from 'axios';

//COMPONENTES
import Tabla from '../../components/Tabla';
import GastosOrden from './GastosOrden';

//ICONS
import {FaInfoCircle} from 'react-icons/fa';
import {MdAttachMoney} from 'react-icons/md';

function Cerrados() {

    const [token, setToken] = useState('');

    // ===============================================
    // COLUMNAS PARA LA TABLA CERRADOS
    // ===============================================

    const columsCerrados = [

        {
            name: 'Orden',
            selector: row => row.id + " - " +row.nombre_comercial,
            sortable: true,
            width: "15%"
        },
        {
            name: 'Tractor',
            selector: row => row.camion,
            sortable: true,
            width: "10%"
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
            width: "11%"
        },
        {
            name: 'Fecha/Hora',
            selector: row => row.fecha_hora,
            sortable: true,
            width: "18%"
        },
        {
            name: 'Estado',
            selector: row => row.estatus,
            width: "10%"
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                
                <div className="input-group">
                    <button className="btn btn-outline-success" type="button" onClick={() => handleGastos(row.id, row.id + " - " +row.nombre_comercial)}><MdAttachMoney/></button>
                    <button className="btn btn-outline-info" type="button" data-bs-toggle="modal" data-bs-target="#modalInfoOrdenDespacho" onClick={() => showInfo(row.id)}><FaInfoCircle/></button>
                </div>
                
            ),
            width: "9% "
            
        },

    ];

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
    // SEGMENTO PARA DESPACHOS CERRADOS
    // ===============================================

    const [dataCerrados, setDataCerrados] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/despachos/cerrados`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success === true && result.data.result !== "Sin resultados")
            {

                setDataCerrados(result.data.result);

            }else{

                setDataCerrados([]);

            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

    // ===============================================
    // FUNCION PARA MOSTRAR INFO DE LA ORDEN CERRADA
    // ===============================================

    const [inputsInfo, setInputsInfo] = useState([]);

    const showInfo = (id) => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/orden/despacho/cerrado/${id}`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {

                setInputsInfo(result.data.result[0]);

            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })

    }

    // ===============================================

    return (

        <div>

            <Tabla columns = {columsCerrados} data = {dataCerrados}/>

            {/* TABLA PARA GASTOS DE ORDEN */}

            <GastosOrden idOrder={idOrden} idUser={idUser} header={title}/>

            {/* MODAL PARA VER INFO */}

            <div className="modal fade" id="modalInfoOrdenDespacho" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog modal-xl">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5 className="modal-title text-center" id="exampleModalLabel">Informacion de la Orden</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>

                        <div className="modal-body">

                            <div className='row'>

                            {
                                Object.entries(inputsInfo).map(([indice, valor]) => (

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">{indice}:</span>

                                        <input
                                            className='form-control'
                                            key={indice}
                                            type="text"
                                            readOnly={true}
                                            defaultValue={valor}
                                        />

                                    </div>

                                ))
                            }

                            </div>

                        </div>

                        <div className="modal-footer">

                        </div>

                    </div>

                </div>
                
            </div>

        </div>

    )

}

export default Cerrados