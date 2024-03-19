import React, { useEffect, useState } from 'react';
import { baseURL } from '../../config/config';
import Cookies from 'js-cookie';
import axios from 'axios';
import Tabla from '../../components/Tabla';
import { BsHandIndexThumb } from "react-icons/bs";

const TablaMcleod = ({ handleSelect }) => {

    // ===============================================
    // FUNCION PARA BUSCAR ORDENES DE MCLEOD 
    // ===============================================

    const [data, setData] = useState([])

    const buscarOrdenesMcLeod = async () => {

        setLoading(true);

        const config = {
    
            headers: {"access-token": Cookies.get('jwtoken')},
    
        };

        const response = await axios.get(`${baseURL}api/get/ordenes/mcleod`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setLoading(false);

            setData(response.data.result);

        }else{

            setData([]);

            setLoading(false);

        }

    }

    // ===============================================
    // ESTADO PARA BUSCAR ALERTAS
    // ===============================================

    const [loading, setLoading] = useState(false)

    // ===============================================
    // DCOLUMNAS PARA LA TABLA
    // ===============================================

    const columns = [

        {
            name: 'Mcleod Order',
            selector: row => row.id,
            sortable: true,
            width: "30%"
        },
        {
            name: 'Customer',
            selector: row => row.customer.name,
            sortable: true,
            width: "50%"
        },
        {
            name: "",
            button: true,
            cell: (row) => (
              
                <button 
                    className="btn btn-outline-info" 
                    type="button"
                    onClick={() => handleSelect(row.id)}
                >
                    <BsHandIndexThumb/>
                </button>
             
            ),
            width: "20%"
            
        },

    ];

    // ===============================================
    // LLAMAR FUNCIONES
    // ===============================================

    useEffect(() => {

        buscarOrdenesMcLeod();

    },[])

    return (

        <div>

            

            {/* <div class="alert alert-warning" role="alert">
                A simple warning alert—check it out!
            </div> */}

            {
                loading 
                ? 
                (
                    <div className="alert alert-warning" role="alert">
                        Buscando Datos ...
                    </div>
                )
                :
                (
                    <Tabla columns={columns} data={data} />
                )
            }

        </div>

    )

}

export default TablaMcleod