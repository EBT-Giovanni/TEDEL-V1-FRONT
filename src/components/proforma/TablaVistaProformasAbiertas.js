import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';

//COMPONENTES
import Tabla from '../../components/Tabla';

//ICONOS
import {BsFillCheckCircleFill} from 'react-icons/bs';

const TablaVistaProformasAbiertas = () => {

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

        const response = await axios.get(`${baseURL}api/get/proformas/abiertas`, config);
    
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
            selector: row => row.cliente,
            sortable: true,
        },
        {
            name: 'Tractor',
            selector: row => row.tractor_no_economico,
            sortable: true,
        },
        {
            name: 'Chofer',
            selector: row => row.operador_nombre,
            sortable: true,
        },
        {
            name: 'Caja',
            selector: row => row.caja_numero,
            sortable: true,
        },
        {
            name: "",
            button: true,
            cell: (row) => (
              
                <div className="input-group">
                  <button className="btn btn-outline-info" type="button" onClick={() => handleValidate(row.id, row.rel_orden)}><BsFillCheckCircleFill/></button>
                </div>
             
            ),
            
        },

    ];

    // ===============================================
    // VALIDAR SI SE VA A CERRAR LA PROFORMA
    // ===============================================

    const handleValidate = (id, orden) => {

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

                    cerrarProforma(id, orden);

                }
    
            })

    }

    // ===============================================
    // FUNCION PARA CERRAR LA PROFORMA
    // ===============================================

    const cerrarProforma = (id, orden) => {

        const data = { id: id, orden: orden};

        fetch(`${baseURL}api/cerrar/proforma`, {
                            
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

export default TablaVistaProformasAbiertas