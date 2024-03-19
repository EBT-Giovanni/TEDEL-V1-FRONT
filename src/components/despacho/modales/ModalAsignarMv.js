import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../../config/config';
import axios from 'axios';

//COMPONENTES
import Tabla from '../../../components/Tabla';

//ICONS
import {MdAssignmentTurnedIn} from 'react-icons/md';

function ModalAsignarMv(props) {

    // ===============================================
    // SEGMENTO PARA MOSTRAR ORDENES PENDIENTES POR ASIGNAR MV
    // ===============================================

    const [data, setData] = useState([]);

    const [token, setToken] = useState('');

    //TRAER DATOS PARA MOSTRAR MOVIMIENTOS

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/ordenes/cerradas/disponibles/mv`,{
        
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

    const columns = [

        {
            name: 'Orden',
            selector: row => row.Orden,
            sortable: true
        },
        {
            name: 'Referencia',
            selector: row => row.referencia,
            sortable: true
        },
        {
            name: 'Operador',
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: 'Tractor',
            selector: row => row.numero_economico,
            sortable: true
        },
        {
            name: 'Caja',
            selector: row => row.numero,
            sortable: true,
            width: "100px"
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                
                <div className="input-group">
                    <button className="btn btn-outline-info" type="button" onClick={() => props.onClick(row.id, row.Orden)} data-bs-target="#modalAsignarMV" data-bs-toggle="modal" data-bs-dismiss="modal"><MdAssignmentTurnedIn/></button>
                </div>
                
            ),
            width: "50px"
            
        },

    ];

    // ===============================================
    // MODAL PARA ESCOGER Y ASIGNAR MOVIMIENTOS VACIOS
    // ===============================================

  return (

    <div>

        <div className="modal fade" id="modalMostrarMVSinAsignar" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

            <div className="modal-dialog modal-xl">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title" id="exampleModalLabel">Agregar Movimiento Vacio</h5>

                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                    </div>

                    <div className="modal-body">

                        <div className='row'>

                            {/* TABLA PARA VER REGISTROS */}
                                        
                            <Tabla columns = {columns} data = {data}/>

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

export default ModalAsignarMv