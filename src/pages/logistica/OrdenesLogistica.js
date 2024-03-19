import React, { useState, useEffect } from 'react';
import { baseURL } from '../../config/config';
import Cookies from 'js-cookie';
import axios from 'axios';
import Tabla from '../../components/Tabla';
import Swal from 'sweetalert2';
import { pdf } from '@react-pdf/renderer';

//ICONS
import {BsPencil} from 'react-icons/bs';
import {TiCancel} from 'react-icons/ti';
import {MdOutlineAddCircle} from 'react-icons/md';
import {FaRegFilePdf} from 'react-icons/fa';
import {AiFillFileText} from 'react-icons/ai';

//COMPONENTES
import ModalCrearOrdenLogistica from '../../componentsLogistica/ordenesLogistica/ModalCrearOrdenLogistica';
import ModalEditarOrdenLogistica from '../../componentsLogistica/ordenesLogistica/ModalEditarOrdenLogistica';
import ArchivosOrdenesLogistica from '../../componentsLogistica/ordenesLogistica/ArchivosOrdenesLogistica';
import ExcelOrdenesLogistica from '../../componentsLogistica/ordenesLogistica/ExcelOrdenesLogistica';
import CiLogistica from '../../componentsLogistica/ordenesLogistica/CiLogistica';
import TablaMcleod from '../../componentsLogistica/ordenesLogistica/TablaMcleod';

const OrdenesLogistica = () => {

    const [token, setToken] = useState('');

    const [formValues, setFormValues] = useState({
        
        rel_cliente: "",
        rel_proveedor: "",
        rel_ruta: "",
        impo_expo: "",
        referencia: "",
        rel_caja: "",
        fecha_recoleccion: "",
        hora_recoleccion: "",
        fecha_entrega: "",
        hora_entrega: "",
        temperatura_1: "",
        temperatura_2: "",
        bol: "",
        commodity: "",
        peso: "",
        pallets: "",
        cases: "",
        moneda: "",
        tarifa: "",
        factura_microsip: "",
        refactura: "",
        orden_mcleod: ""
    
    });

    // ===============================================
    // DATOS PARA LA TABLA 
    // ===============================================

    const [data, setData] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));

        buscarOrdenes()

    }, [token]);

    // FUNCION PARA BUSCAR TODAS LAS CAJAS

    const buscarOrdenes = async () => {

        const config = {
    
            headers: {"access-token": token},
    
        };

        const response = await axios.get(`${baseURL}api/get/ordenes/logistica`, config);

        console.log(response)

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            

            setData(response.data.result);

        }else{

            setData([]);

        }

    }

    // ===============================================
    // DCOLUMNAS PARA LA TABLA
    // ===============================================

    const columns = [

        {
            name: 'Orden',
            selector: row => row.id,
            cell: (row) => ( `L-${lpad(row.id, 5, "0")}` ),
            sortable: true,
            width: "10%"
        },
        {
            name: 'McLeod',
            cell: (row) => (

                row.orden_mcleod !== null ? row.orden_mcleod : '-'
             
            ),
            sortable: true,
            width: "10%"
        },
        {
            name: 'Cliente',
            selector: row => row.nombre_comercial,
            sortable: true,
            width: "15%"
        },
        {
            name: 'Proveedor',
            selector: row => row.proveedor,
            sortable: true,
            width: "15%"
        },
        {
            name: 'Caja',
            selector: row => row.caja,
            sortable: true,
            width: "10%"
        },
        {
            name: 'Referencia',
            selector: row => row.referencia,
            sortable: true,
            width: "15%"
        },
        {
            name: "BOL",
            cell: (row) => (

                row.bol !== null ? row.bol : '-'
             
            ),
            width: "10%"
        },
        {
            name: "Factura",
            cell: (row) => (

                row.factura_microsip !== null ? row.factura_microsip : 'Pendiente'
             
            ),
            width: "10%"
        },
        {
            name: "Refactura",
            cell: (row) => (

                row.refactura !== null ? row.refactura : 'Pendiente'
             
            ),
            width: "10%"
        },
        {
            name: 'Tarifa',
            cell: (row) => (

                '$'+row.tarifa
             
            ),
            sortable: true,
            width: "10%"
        },
        {
            name: 'Ruta',
            selector: row => row.rutaDescripcion,
            sortable: true,
            width: "30%"
        },
        {
            name: 'Estado Orden',
            selector: row => row.rel_estatus_orden,
            sortable: true,
            width: "10%"
        },
        {
            name: "Recoleccion",
            cell: (row) => (

                `${row.fecha_recoleccion.split('T')[0]} ${row.hora_recoleccion}`
             
            ),
            width: "10%"
        },
        {
            name: "Entrega",
            cell: (row) => (

                `${row.fecha_entrega.split('T')[0]} ${row.hora_entrega}`
             
            ),
            width: "15%"
        },
        {
            name: "",
            button: true,
            cell: (row) => (
              
                <div className="input-group">

                    <button className="btn btn-outline-warning" type="button" data-bs-toggle="modal" data-bs-target="#modalEditarOrdenLogistica" onClick={() => handleEdit(row.id)} ><BsPencil/></button>

                    <button className="btn btn-outline-info" type="button" onClick={() => openPDFInNewTab(row.id)} ><FaRegFilePdf/></button>

                    <button className="btn btn-outline-primary" type="button" onClick={() => setIdOrder(row.id)} ><AiFillFileText/></button>

                    <button className="btn btn-outline-danger" type="button" onClick={() => handleDelete(row.id, row.rel_caja, row.rel_tractor, row.rel_chofer_1, row.rel_chofer_2, row.rel_orden)}><TiCancel/></button>  

                </div>
             
            ),
            width: "10%"
            
        },

    ];

    // ===============================================
    // GENERAR CI
    // ===============================================

    const openPDFInNewTab = async (id) => {

        const info = await traerReporte(id);

        let blobPDF = await pdf(<CiLogistica data={info} />).toBlob();

        const pdfUrl = URL.createObjectURL(blobPDF);

        window.open(pdfUrl, '_blank'); 

    };

    const traerReporte = async (id) => {

        const config = {
  
            headers: {"access-token": Cookies.get('jwtoken')},
    
        };

        const response = await axios.get(`${baseURL}api/get/orden/ci/${id}`, config);console.log(response.data)

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            let temp = response.data.result[0];

            // SACAMOS EL TOTAL DEL IVA

            let iva = Number(temp["tarifaOrden"] * temp["ivaCliente"]) / 100; 

            temp["ivaCantidad"] = iva;

            // SACAMOS EL TOTAL DE RETENCIONES

            let retenciones = Number(temp["tarifaOrden"] * 4) / 100; 

            temp["retencionCantidad"] = retenciones;

            // SACAMOS EL TOTAL 

            let total = Number(temp["tarifaOrden"] + iva - retenciones); console.log(total);

            temp["total"] = total;

            return temp;

        }

    }

    // ===============================================
    // FUNCION PARA EDITAR ORDENES
    // ===============================================

    const handleEdit = (id) => {

        axios.get(`${baseURL}api/get/orden/logistica/${id}`,{
  
            method: "GET",
            headers: {"access-token": token},
    
        })
        .then(result => {
    
            if(result.data.success == true)
            {

                let temp = result.data.result[0];

                const isoDate = temp["fecha_recoleccion"];

                // Convertir el string ISO 8601 a un objeto Date
                const dateObject = new Date(isoDate);

                // Formatear la fecha en el formato "yyyy/mm/dd"
                const formattedDate = dateObject.toISOString().slice(0, 10);


                const isoDate2 = temp["fecha_recoleccion"];

                // Convertir el string ISO 8601 a un objeto Date
                const dateObject2 = new Date(isoDate2);

                // Formatear la fecha en el formato "yyyy/mm/dd"
                const formattedDate2 = dateObject2.toISOString().slice(0, 10);

                temp["fecha_recoleccion"] = formattedDate;
                temp["fecha_entrega"] = formattedDate2;              

                document.getElementById("impoExpoEditOrden").value = temp["impo_expo"];
                document.getElementById("clienteOrdenLEdit").value = temp["rel_cliente"];
                document.getElementById("rutaOrdenLEdit").value = temp["rel_ruta"];
                document.getElementById("cajaOrdenLEdit").value = temp["rel_caja"];
                document.getElementById("proveedorOrdenLEdit").value = temp["rel_proveedor"];
                document.getElementById("monedaEditOrdenL").value = temp["moneda"];
                
                setFormValues(temp);

            }
    
        })
        .catch(error => {
        
            console.log(error)
    
        })

    }

    // ===============================================
    // FUNCION PARA BORRAR ORDENES
    // ===============================================

    const handleDelete = (id) => {

        Swal.fire({
            title: 'Estas seguro de cancelar esta orden?',
            text: "Esta accion no podra ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cancelar!'
          }).then((result) => {
            if (result.isConfirmed) {
      
              axios.delete(`${baseURL}api/cancelar/orden/logistica/${id}`,{
        
                headers: {"access-token": token}
            
              })
              .then(result => {
          
                if(result.data.success == true)
                {
      
                  Swal.fire({
                    icon: 'success',
                    title: 'Orden Cancelada!',
                  })
                  .then(() => {
          
                    buscarOrdenes();
          
                  })
      
                }
          
              })
              .catch(error => {
            
                console.log(error)
            
              })
      
            }
            
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

    const selectMcleodOrder = (value) => {

        setFormValues({ ...formValues, ['orden_mcleod']: value })

    }

    // ===============================================
    // ACTUALIZAR FORMULARIO
    // ===============================================

    const validarCampos = (event) => {

        const value = event.target.value;
        const name = event.target.name;

        const input = event.target;

        const urls = {
            referencia: `${baseURL}api/get/referencia/logistica/${value}`,
            bol: `${baseURL}api/get/bol/logistica/${value}`
        }

        axios.get(urls[name],{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.result !== 'Sin resultados')
            {
                setFormValues({ ...formValues, [name]: '' });

                input.value = '';

                Swal.fire({
                    icon: 'warning',
                    title: `${name.toUpperCase()} ${value} ya ha sido registrado`,
                })
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })

    }

    // ===============================================
    // SEGMENTO PARA TRAER CLIENTES
    // ===============================================

    const [clientes, setClientes] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/get/clientes/logistica`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let des = result.data.result;

                des.unshift({id: "", nombre_comercial: "Seleccione Un Cliente"});
        
                setClientes(des);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

    // ===============================================
    // SEGMENTO PARA TRAER CAJAS
    // ===============================================

    const [cajas, setCajas] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/get/cajas/logistica`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let des = result.data.result;

                des.unshift({id: "", numero: "Seleccione una caja"});
        
                setCajas(des);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

    // ===============================================
    // SEGMENTO PARA TRAER CAJAS
    // ===============================================

    const [rutas, setRutas] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/rutaslogisticas`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let des = result.data.result;

                des.unshift({id: "", ruta_final: "Seleccione una ruta"});
        
                setRutas(des);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

    // ===============================================
    // SEGMENTO PARA TRAER CAJAS
    // ===============================================

    const [proveedores, setProveedores] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/get/proveedores`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let des = result.data.result;

                des.unshift({id: "", nombre_comercial: "Seleccione un proveedor"});
        
                setProveedores(des);
            }
    
        })
        .catch(error => {
        
            console.log(error);
        
        })
    
    },[token]);

    // ===============================================
    // FUNCION PARA EVITAR QUE ESCRIBAN EN LAS FECHAS
    // ===============================================

    const handleInputKeyDown = (event) => {
        event.preventDefault();
    };

    // ===============================================
    // ID ORDEN ACTUAL
    // ===============================================

    const [idOrder, setIdOrder] = useState(0);

    // ===============================================
    // SEGMENTO PARA TRAER CAJAS
    // ===============================================

    const lpad = (str, length, padChar) => {

        str = String(str);

        while (str.length < length) {

          str = padChar + str;

        }

        return str;

    }

    return (

        <>

        <h3 className='mb-4'>Ordenes</h3>

            <div className='row mb-4'>

                <button
                    type='button'
                    className='btn btn-primary col-2'
                    data-bs-toggle="modal" 
                    data-bs-target="#modalCrearOrdenLogistica">
                        <MdOutlineAddCircle/> Agregar Orden
                </button>

                <div className='col-8'></div>

                <ExcelOrdenesLogistica ordenes={data}/>

            </div>

            {/* TABLA PARA MOSTRAR CAJAS */}

            <Tabla columns={columns} data={data} />

            {/* MODAL CREAR ORDEN */}
            
            <ModalCrearOrdenLogistica
                onChange = {handleChange}
                data = {formValues}
                refresh= {buscarOrdenes}
                clientes= {clientes}
                cajas= {cajas}
                rutas= {rutas}
                proveedores = {proveedores}
                preventDates = {handleInputKeyDown}
                validarCampos = {validarCampos}
                onChangeMcleod = {selectMcleodOrder}
            />

            {/* MODAL PARA EDITAR ORDEN */}

            <ModalEditarOrdenLogistica
                onChange = {handleChange}
                data = {formValues}
                refresh={buscarOrdenes}
                clientes={clientes}
                cajas={cajas}
                rutas={rutas}
                proveedores={proveedores}
                preventDates={handleInputKeyDown}
                onChangeMcleod = {selectMcleodOrder}
            />

            {/* ARCHIVOS DE LOGISTICA */}

            <ArchivosOrdenesLogistica idOrden={idOrder}/>

            {/* TEST */}

            {/* <TablaMcleod/> */}

        </>

    )

}

export default OrdenesLogistica