import React, { useState, useEffect, useTransition } from 'react'
import Cookies, { set } from 'js-cookie';
import { baseURL } from '../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';

//COMPONENTES
import Tabla from '../components/Tabla';
import OrdenDocumentos from '../components/ordenes/OrdenDocumentos';

//ICONS
import {BsPencil} from 'react-icons/bs';
import {TiCancel} from 'react-icons/ti';
import {MdAddCircle} from 'react-icons/md';
import {GrDocumentText} from 'react-icons/gr';
import {FiDownload} from 'react-icons/fi';
import AccesorialesDoc from '../components/ordenes/AccesorialesDoc';
import CrearOrden from '../components/ordenes/modales/CrearOrden';
import EditarOrden from '../components/ordenes/modales/EditarOrden';


const Ordenes = () => {

    const [token, setToken] = useState('');
      
    // ===============================================
    // SEGMENTO PARA MOSTRAR ORDENES
    // ===============================================

    const [data, setData] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        buscarOrdenes();
    
    },[token]);

    // FUNCION PARA BUSCAR DATOS

    const buscarOrdenes = async () => {

        const config = {
  
            headers: {"access-token": token},
    
        };

        const response = await axios.get(`${baseURL}api/ordenes`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setData(response.data.result); console.log(response.data.result)

        }else{

            setData([]);

        }

    }

    // ===============================================
    // COLUMNAS PARA LA TABLA
    // ===============================================

    const colums = [

        {
            name: 'Orden',
            selector: row => row.id,
            sortable: true,
            width: "100px"
        },
        {
            name: 'Temperatura',
            selector: row => row.temperaturas,
            sortable: true,
            width: "100px"
        },
        {
            name: 'Cliente',
            selector: row => row.nombre_comercial,
            sortable: true,
            width: "150px"
        },
        {
            name: 'Ruta',
            selector: row => row.ruta,
            sortable: true
        },
        {
            name: 'Tractor',
            selector: row => row.tractor,
            sortable: true
        },
        {
            name: 'Caja',
            selector: row => row.caja,
            sortable: true
        },
        {
            name: 'Fecha Cita',
            selector: row => row.fecha_recoleccion,
            sortable: true
        },
        {
            name: 'Fecha Entrega',
            selector: row => row.fecha_entrega,
            sortable: true
        },
        {
            name: 'Referencia',
            selector: row => row.referencia,
            sortable: true,
            width: "170px"
        },
        {
            name: 'Factura',
            selector: row => row.factura,
            sortable: true,
            width: "170px"
        },
        {
            name: 'Refactura',
            selector: row => row.refactura,
            sortable: true,
            width: "170px"
        },
        {
            name: 'Estado Orden',
            selector: row => row.estatus,
            sortable: true,
            width: "130px"
        },
        {
            name: "",
            button: true,
            cell: (row) => (
              
                <div className="input-group">
                    <button className="btn btn-outline-info" type="button" onClick={() => showDoc(row.id, row.nombre_comercial+" - "+row.id, row.imp_ex)} ><GrDocumentText/></button>
                    <button className="btn btn-outline-warning" type="button" onClick={() => handleEdit(row.id, row.rel_estatus_orden)} ><BsPencil/></button>
                    <button className="btn btn-outline-danger" type="button" onClick={() => handleDelete(row.id, row.rel_caja, row.rel_tractor, row.rel_chofer_1, row.rel_chofer_2, row.rel_orden)}><TiCancel/></button>
                </div>
             
            ),
            width: "130px"
            
        },

    ];

    // ===============================================
    // SEGMENTO PARA TRAER ESTATUS
    // ===============================================

    const [status, setStatus] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/estatusOrdenes`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let des = result.data.result;

                des.unshift({id: "", estatus: "Seleccione Estado"});
        
                setStatus(des);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

    // ===============================================
    // CLIENTES PARA ORDEN
    // =============================================== 

    const [cliente, setCliente] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/clientes/activos`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let client = result.data.result;

                client.unshift({id: "", nombre_comercial: "Seleccione el cliente"});
        
                setCliente(client);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

    // ===============================================
    // FUNCION PARA VALIDAR SI LA CAJA ESTA DISPONIBLE
    // ===============================================  

    const validarCaja = (id) => {

        axios.get(`${baseURL}api/cajas/${id}`,{
  
            method: "GET",
            headers: {"access-token": token},
    
        })
        .then(result => {
    
            if(result.data.success == true)
            {

                let temp = result.data.result[0]

                if(temp["rel_estatus_caja"] !== 1){

                    Swal.fire({
                        icon: 'warning',
                        title: 'La caja '+ temp["numero"] +' no esta disponible!',
                    })
                    .then(() => {
            
                        document.getElementById("selectCajaEditOrden").value = "";
                        document.getElementById("crearSelectCaja").value = "";
            
                    })

                }
            }
    
        })
        .catch(error => {
        
            console.log(error)
    
        })

    }

    // ===============================================
    // CAJAS PARA ORDEN
    // ===============================================  
    
    const [cajas, setCajas] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/cajas`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let status = result.data.result;

                status.unshift({id: "", numero: "Seleccione una caja"});
        
                setCajas(status);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

    // FORMDATA PARA ENVIAR AL FORMULARIO
    
    const [formValuesOrden, setFormValuesOrden] = useState({
        rel_estatus_orden: "1",
        rel_cliente: "",
        rel_ruta: "",
        rel_zona_origen: "",
        rel_zona_destino: "",
        rel_mv: "0",
        subida_bajada: "",
        referencia: "",
        rel_caja: "",
        fecha_recoleccion: "",
        hora_recoleccion: "",
        fecha_entrega: "",
        hora_entrega: "",
        temperatura_1: "",
        temperatura_2: "",
        commodity: "",
        peso: "20000",
        pallets: "",
        cases: "",
        rel_estatus: "2"
    });

    //FUNCION PARA ACTUALIZAR FORM DATA

    const handleChange = (event) => {

        const val = event.target.value;
        const name = event.target.name;

        if(name === "subida_bajada" && val === "Subida"){

            buscarMV();

        }

        if(name === "rel_caja"){

            validarCaja(val)

        }

        setFormValuesOrden({ ...formValuesOrden, [name]: val });

    };

    // ===============================================
    // BUSCAR MOVIMIENTOS VACIOS PARA SELECT
    // ===============================================

    const [mv, setMv] = useState([{id: "0", movimiento: "N/A"}])

    const buscarMV = async () => {

        const config = {
  
            headers: {"access-token": token},
    
        };

        const response = await axios.get(`${baseURL}api/movimientos/vacios/select`, config);
            
        if(response.data.success === true && response.data.result !== "Sin resultados"){

            let select = response.data.result;

            select.unshift({id: "0", movimiento: "Seleccione un movimiento vacio"})

            setMv(select);

        }else{

            setMv([{id: "0", movimiento: "No hay movimientos disponibles"}])

        }

    }

    // ===============================================
    // SEGMENTO PARA BUSCAR RUTAS
    // ===============================================

    const [ruta, setRuta] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));

        if(formValuesOrden.rel_cliente !== ""){
        
            buscarRutas();

        }else{

            setRuta([{id: "", ruta: "No hay rutas disponibles"}]);

        }

    }, [formValuesOrden.rel_cliente]);

    //FUNCION PARA BUSCAR LAS RUTAS

    const buscarRutas = async () => {

        const config = {
  
            headers: {"access-token": token},
    
        };

        const response = await axios.get(`${baseURL}api/orden/ruta/cliente/${formValuesOrden.rel_cliente}`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            let rutaa = response.data.result;
        
            rutaa.unshift({id: "", ruta: "Seleccione una ruta"});
    
            setRuta(rutaa);

            document.getElementById("selectRutaOrden").value = formValuesOrden.rel_ruta;

        }else{

            setRuta([{id: "", ruta: "No hay rutas disponibles"}])

        } 

    }

    // ===============================================
    // SEGMENTO PARA EDITAR ORDENES
    // ===============================================

    const [editable, setEditable] = useState(false);

    const  handleEdit  = async (id, estatus) => {

        // VALIDAMOS SI PODRA EDITAR EL REGISTRO

        if(estatus === 3 || estatus === 5 || estatus === 6){

            setEditable(true);

        }else{

            setEditable(false);

        }

        // BUSCAMOS LOS DATOS DEL REGISTRO

        const config = {
  
            headers: {"access-token": token},
    
        };

        const response = await axios.get(`${baseURL}api/orden/${id}`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            let temp = response.data.result[0];

            temp["fecha_entrega"] = (temp["fecha_entrega"].split("T"))[0];

            temp["fecha_recoleccion"] = (temp["fecha_recoleccion"].split("T"))[0];

            temp["caja_actual"] = temp["rel_caja"];

            temp["rel_estatus"] = 2;

            if(temp["subida_bajada"] === "Subida"){
                
                buscarMV();

            }

            buscarRutas();

            document.getElementById("selectClienteOrden").value = temp["rel_cliente"];
    
            document.getElementById("selectCajaEditOrden").value = temp["rel_caja"];
    
            document.getElementById("subidaBajadaSelect").value = temp["subida_bajada"];

            setTimeout(function() {setVal(temp["rel_ruta"])}, 1000);

            setFormValuesOrden(temp);

            document.getElementById("btnAbrirEditarModal").click();

        }

    }

    function setVal(val){

        document.getElementById("selectRutaOrden").value = val

    }


    // ===============================================
    // SEGMENTO PARA ELIMINAR ORDEN
    // ===============================================

    const handleDelete = (orden, caja, tractor, op1, op2) => {

        let reqBody = {

            rel_orden: orden,
            rel_caja: caja,
            rel_tractor: tractor,
            rel_chofer_1: op1,
            rel_chofer_2: op2,
            rel_estatus: 5

        }

        Swal.fire({
            title: 'Estas seguro de cancelar esta orden?',
            text: "Esta accion no podra ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, cancelar!'
          }).then((result) => {
            if (result.isConfirmed) {
      
              axios.put(`${baseURL}api/cancelar/orden`, reqBody, {
        
                headers: {"access-token": token}
            
              })
              .then(result => {
          
                if(result.data.success == true)
                {
      
                  Swal.fire({
                    icon: 'success',
                    title: 'La orden ha sido cancelada!',
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
    // SEGMENTO PARA VER ARCHIVOS
    // ===============================================

    const [idOrder, setIdOrder] = useState(0);

    const [opcionExIm, setOpcionExIm] = useState('');

    const [nombreOrden, setNombreOrden] = useState('');

    const showDoc = (id, nombre, val) => {

        setOpcionExIm(val);

        setNombreOrden(nombre);

        setIdOrder(id);

    }

    // ===============================================
    // SEGMENTO PARA MOSTRAR EVIDENCIAS
    // ===============================================

    const [evidencias, setEvidencias] = useState([]);

    //TRAER DATOS PARA MOSTRAR ORDENES

    useEffect(() => {

        if(idOrder !== 0){

            buscarEvidencias();

        }
        
    },[idOrder]);

    //TRAER DATOS PARA MOSTRAR ORDENES

    const buscarEvidencias = async () => {
        
        const config = {
  
            headers: {"access-token": token},
    
        };

        const response = await axios.get(`${baseURL}api/orden/evidencia/${idOrder}`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setEvidencias(response.data.result)

        }else{

            setEvidencias([]);

        }

    }

    //COLUMNAS PARA TABLA DE ARCHIVOS

    const columsEvidencia = [

        {
            name: 'Operador',
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: 'Tipo Evidencia',
            selector: row => row.tipo_archivo,
            sortable: true
        },
        {
            name: 'Descripcion',
            selector: row => row.nombre_archivo,
            sortable: true
        },
        {
            name: 'Monto',
            selector: row => "$ "+row.monto,
            sortable: true
        },
        {
            name: 'Fecha',
            selector: row => row.fecha_hora,
            sortable: true
        },
        {
            name: 'DESCARGA',
            selector: row => <button type="button" className='btn btn-outline-info' onClick={() => handleDownload(row.ruta)}><FiDownload/></button>,
            width: "100px"
        },

    ];

    // ===============================================
    // SEGMENTO PARA DESCARGAR EVIDENCIA
    // ===============================================

    const handleDownload = (ruta) => {

        let nombre = ruta.split("%");

        nombre = nombre[1];

        axios({
            url: `${baseURL}api/orden/download/evidencia`,
            method: 'POST',
            headers: {
                "access-token": token
            } ,
            responseType: 'blob',
            data: {
                rutaArchivo: ruta
        }
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', nombre);
            document.body.appendChild(link);
            link.click();
        });

    }

    // ===============================================
    // SEGMENTO PARA VALIDAR QUE MODAL SE VA A ABRIR
    // ===============================================

    //===============================================+++++++++++++++++++++++
    
    return (

        <div>

            <h3 className='mb-4'>Ordenes</h3>

            <button 
                type="button" 
                className="btn btn-primary" 
                //onClick={validarModal}
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearOrden"
            >
                <MdAddCircle/> Agregar Orden
            </button>

            {/* TABLA PARA MOSTRAR ORDENES */}

            <Tabla columns = {colums} data = {data}/>

            {/* MODAL PARA CREAR ORDENES */}

            <CrearOrden
                onChange = {handleChange}
                data = {formValuesOrden}
                mv = {mv}
                cliente = {cliente}
                rutas = {ruta}
                cajas = {cajas}
                refresh={buscarOrdenes}
            />

            {/* MODAL PARA EDITAR ORDEN */}

            <EditarOrden
                onChange = {handleChange}
                data = {formValuesOrden}
                mv = {mv}
                cliente = {cliente}
                rutas = {ruta}
                cajas = {cajas}
                editable = {editable}
                refresh={buscarOrdenes}
            />

            <h3 className='mt-4 text-center'>{nombreOrden}</h3>

            {/* TABS PARA DOCUMENTOS Y ACCESORIALES */}

            <ul className="nav nav-tabs nav-justified mt-4" id="myTabOrdenes" role="tablist">

                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#documentosOrden" type="button" role="tab" aria-controls="home" aria-selected="true"><p className="h5">Documentos</p></button>
                </li>

                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#accesoriales" type="button" role="tab" aria-controls="profile" aria-selected="false"><p className="h5">Accesoriales</p></button>
                </li>

                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#evidencias" type="button" role="tab" aria-controls="profile" aria-selected="false"><p className="h5">Evidencias</p></button>
                </li>

            </ul>

            <div className="tab-content" id="myTabContent">

                {/* DOCUMENTOS DE LA ORDEN */}

                <div className="tab-pane fade show active" id="documentosOrden" role="tabpanel" aria-labelledby="home-tab">

                    {/* COMPONENTE PARA ARCHIVO */}

                    <OrdenDocumentos idOrder={idOrder} op={opcionExIm}/>

                </div>

                {/* ACCESORIALES DE LA ORDEN */}

                <div className="tab-pane fade" id="accesoriales" role="tabpanel" aria-labelledby="profile-tab">

                    <AccesorialesDoc idOrder={idOrder}/>

                </div>

                {/* EVIDENCIAS DE LA ORDEN */}

                <div className="tab-pane fade" id="evidencias" role="tabpanel" aria-labelledby="profile-tab">

                    <div className='mt-4'>

                    <Tabla columns = {columsEvidencia} data = {evidencias}/>

                    </div>

                </div>

            </div>

            {/* MODAL  PARA EDITAR ORDEN */}
            
            <button 
            id="btnAbrirEditarModal"
            style={{"display":"none"}}
            type="button"
            data-bs-toggle="modal" 
            data-bs-target="#modalEditarOrden"></button>
  
        </div>

    );

}

export default Ordenes;
