import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';

//COMPONENTES
import Tabla from '../Tabla';

//ICONOS
import {BsFillCheckCircleFill} from 'react-icons/bs';

const TablaVistaProformasLogisticaAbiertas = () => {

    const [token, setToken] = useState('');

    // ===============================================
    // SEGMENTO PARA TRAER PROFORMAS ABIERTAS
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

        const response = await axios.get(`${baseURL}api/get/proformaslogistica/abiertas`, config);
    
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
            name: 'Orden',
            selector: row => row.rel_orden,
            sortable: true,
        },
        {
            name: 'Proveedor',
            selector: row => row.proveedor_nombre,
            sortable: true,
        },
        {
            name: 'Cliente',
            selector: row => row.cliente_nombre,
            sortable: true,
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
                  <button className="btn btn-outline-info" type="button" onClick={() => handleValidate(row.id)}><BsFillCheckCircleFill/></button>
                </div>
             
            ),
            
        },

    ];

    // ===============================================
    // VALIDAR SI SE VA A CERRAR LA PROFORMA
    // ===============================================

    const handleValidate = (id) => {

        setToken(Cookies.get('jwtoken'));

        Swal.fire({
            title: 'Estas seguro de cerrar este registro?',
            text: "Esta accion no podra ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, cerrar!'
            }).then((result) => {
    
                if(result.isConfirmed) {
                    cerrarProforma(id);

                }
    
            })

    }

    // ===============================================
    // FUNCION PARA CERRAR LA PROFORMA
    // ===============================================

    const cerrarProforma = (id) => {

        const data = { id: id};

        fetch(`${baseURL}api/cerrar/proformaLogistica`, {
                            
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
                "access-token": token
            },
            body: JSON.stringify(data),

        })
        .then((response) => response.json())
        .then((data) => {
            
            if(data.success === true){

                
                Swal.fire({
                icon: 'success',
                title: 'Se ha cerrado correctamente!',
                })
                .then(() => {
        
                    window.location.reload(false);
        
                })

            }

        })
        .catch((error) => {
            console.error("Error:", error);
        });

    }

    // ===============================================
    // TABLA PARA PROFORMAS ABIERTAS
    // ===============================================

    return (

        <div>

            <Tabla columns = {columns} data = {data}/>

        </div>

    )

}

export default TablaVistaProformasLogisticaAbiertas