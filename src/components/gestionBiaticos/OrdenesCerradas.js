import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import axios from 'axios';

// ICONOS
import {MdAttachMoney} from 'react-icons/md';

//COMPONENTES
import Tabla from '../../components/Tabla';

const OrdenesCerradas = () => {

    const [token, setToken] = useState('');

    // ===============================================
    // SEGMENTO PARA DESPACHOS CERRADOS
    // ===============================================

    const [data, setData] = useState([]);

    useEffect(() => {

        buscarOrdenesCerradas();
    
    },[token]);

    // FUNCION PARA BUSCAR ORDENES CERRADAS

    const buscarOrdenesCerradas = () => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/despachos/cerrados`,{
        
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

    }

    // ===============================================
    // COLUMNAS PARA LA TABLA CERRADOS
    // ===============================================

    const colums = [

        {
            name: 'Orden',
            selector: row => row.id + " - " +row.nombre_comercial,
            sortable: true,
            width: "30%"
        },
        {
            name: 'Operador',
            selector: row => row.operador,
            sortable: true,
            width: "30%"
        },
        {
            name: 'Estado',
            selector: row => row.estatus,
            width: "30%"
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                
                <div className="input-group">
                    <button className="btn btn-outline-success" type="button" onClick={() => handleGastos(row.id, row.id + " - " +row.nombre_comercial)}><MdAttachMoney/></button>
                </div>
                
            ),
            width: "10% "
            
        },

    ];

    // ===============================================
    // FUNCION PARA ASIGNAR GASTOS
    // ===============================================

    const handleGastos = (id, operador) => {



    }

    //=======================================================

    return (

        <div className='mt-4'>

            {/* TABLA DE ORDENES CERRADAS */}

            <Tabla columns = {colums} data = {data}/>

        </div>

    )

}

export default OrdenesCerradas