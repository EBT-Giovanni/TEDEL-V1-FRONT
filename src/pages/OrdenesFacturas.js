import React, { useState, useEffect } from 'react';
import { baseURL } from '../config/config';
import {BsPencil} from 'react-icons/bs';
import {MdOutlineAddCircle} from 'react-icons/md';
import Cookies from 'js-cookie';
import axios from 'axios';
import Tabla from '../components/Tabla';
import Swal from 'sweetalert2';
import ModalCrearFactura from '../components/ordenes_facturas/ModalCrearFactura';
import ModalEditarFactura from '../components/ordenes_facturas/ModalEditarFactura';

const OrdenesFacturas = () => {

    const [token, setToken] = useState('');

    const [formValues, setFormValues] = useState({

        rel_orden: "",
        facturar: "",
        refactura: "",
    
    });

    // ===============================================
    // DATOS PARA LA TABLA DE CAJAS
    // ===============================================

    const [data, setData] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));

        buscarFacturas();

        buscarOrdenes();

    }, [token]);

    // FUNCION PARA BUSCAR TODAS LAS CAJAS

    const buscarFacturas = async () => {

        const config = {
  
            headers: {"access-token": token},
    
        };

        const response = await axios.get(`${baseURL}api/get/ordenes/facturas`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setData(response.data.result);

        }else{

            setData([]);

        }

    }

    // BUSCAR ORDENES

    const [ordenes, setOrdenes] = useState([]);

    const buscarOrdenes = async () => {

        const config = {
  
            headers: {"access-token": token},
    
        };

        const response = await axios.get(`${baseURL}api/ordenes`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setOrdenes(response.data.result)

        }else{

            setOrdenes([]);

        }

    }

    // ===============================================
    // COLUMNAS PARA LA TABLA DE CAJAS
    // ===============================================

    const columns = [

        {
            name: 'Orden',
            selector: row => `T-00${row.rel_orden}`,
            sortable: true
        },
        {
            name: 'Factura',
            selector: row => row.facturar,
            sortable: true
        },
        {
            name: 'Re Factura',
            selector: row => row.refactura,
            sortable: true
        },
        {
            name: "",
            button: true,
            cell: (row) => (
              
                <div className="input-group">

                  <button 
                    className="btn btn-outline-warning" 
                    data-bs-toggle="modal" 
                    data-bs-target="#modalEditarFactura" 
                    onClick={(e) => handleEdit(row.id)} type="button"
                    >
                        <BsPencil/>
                    </button>

                </div>
             
            ),
        },

    ];

    // ===============================================
    // SEGMENTO PARA EDITAR CAJAS
    // ===============================================

    const handleEdit = (id) => {

        axios.get(`${baseURL}api/get/ordenes/facturas/${id}`,{
  
            method: "GET",
            headers: {"access-token": token},
    
        })
        .then(result => {
    
            if(result.data.success == true)
            {

                let temp = result.data.result[0];

                document.getElementById("ordenFacturaNum").value = temp["rel_orden"];
                document.getElementById("facturaOrden").value = temp["facturar"];
                document.getElementById("refacturaOrden").value = temp["refactura"];

                setFormValues(temp);

            }
    
        })
        .catch(error => {
        
            console.log(error)
    
        })

    }

    // ===============================================
    // ACTUALIZAR FORMULARIO
    // ===============================================

    const handleChange = (event) => {

        const val = event.target.value;
        const name = event.target.name;

        setFormValues({ ...formValues, [name]: val });

    }

    return (

        <div>

            <h3 className='mb-4'>Facturas</h3>

            <button
                type='button'
                className='btn btn-primary'
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearFactura">
                    <MdOutlineAddCircle/> Agregar Factura
            </button>

            {/* TABLA */}

            <Tabla columns={columns} data={data} />

            {/* MODAL PARA CREAR FACTURA */}

            <ModalCrearFactura
                onChange = {handleChange}
                data = {formValues}
                ordenes={ordenes}
                refresh={buscarFacturas}
            />

            <ModalEditarFactura
                onChange = {handleChange}
                data = {formValues}
                ordenes={ordenes}
                refresh={buscarFacturas}
            />

        </div>

    )

}

export default OrdenesFacturas