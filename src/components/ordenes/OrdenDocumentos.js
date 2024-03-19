import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';
import {PDFViewer} from '@react-pdf/renderer';

//COMPONENTES
import Tabla from '../../components/Tabla';

//ICONS
import {BsPencil} from 'react-icons/bs';
import {RiDeleteBinFill} from 'react-icons/ri';
import {MdAddCircle} from 'react-icons/md';
import {FiDownload} from 'react-icons/fi';
import {FaTimesCircle, FaCheckCircle} from 'react-icons/fa';
import {AiOutlineFilePdf, AiOutlineCloudDownload} from 'react-icons/ai';
import CiOrdenes from './CiOrdenes';
import ModalCrearDoc from './documentos/modales/ModalCrearDoc';
import ModalEditarDoc from './documentos/modales/ModalEditarDoc';


const OrdenDocumentos = ({idOrder, op}) => {

    // ================================================================

    const [token, setToken] = useState('');

    //VALORES PARA EL FORMULARIO

    const [formValues, setFormValues] = useState({

        rel_orden: "",
        rel_tipo_documento: "",
        clave_documento: "",
        ruta: ""

    });

    // ===============================================
    // DATOS PARA MOSTRAR ARCHIVOS
    // ===============================================

    const [data, setData] = useState([]);

    useEffect(() => {

        buscarFiles();
    
    },[idOrder]);

    // FUNCION PARA BUSCAR ARCHIVOS DE LA ORDEN

    const buscarFiles = async () => {

        const config = {
  
            headers: {"access-token": token},
    
        };

        const response = await axios.get(`${baseURL}api/orden/archivos/${idOrder}`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setData(response.data.result)

        }else{

            setData([]);

        }

    }

    // ===============================================
    // COLUMNAS PARA LA TABLA DE CAJAS
    // ===============================================

    const columns = [

        {
            name: 'Documento',
            selector: row => row.tipo,
            sortable: true
        },
        {
            name: 'Nombre',
            selector: row => row.clave_documento,
            sortable: true
        },
        {
            name: 'DESCARGA',
            selector: row => <button type="button" className='btn btn-outline-info' onClick={() => handleDownload(row.ruta)}><FiDownload/></button>,
            width: "100px"
        },
        {
            name: "ACCIONES",
            button: true,
            cell: (row) => (
                
                <div className="input-group">
                    <button className="btn btn-outline-warning" type="button" data-bs-toggle="modal" data-bs-target="#modalEditarArchivoOrden" onClick={() => handleEditFile(row.id)}><BsPencil/></button>
                    <button className="btn btn-outline-danger" type="button" onClick={() => handleDeleteFile(row.id, row.ruta)}><RiDeleteBinFill/></button>
                </div>
            
            ),
        },

    ];

    // ===============================================
    // ACTUALIZAR FORMULARIO
    // ===============================================

    const handleChange = (event) => {

        const val = event.target.value;
        const name = event.target.name;

        setFormValues({ ...formValues, [name]: val });

    }

    const handleChangeImg = (event) => {

        setFormValues({ ...formValues, ["ruta"]: event.target.files[0], ["rel_orden"]: idOrder});

    }
    
    // ===============================================
    // SEGMENTO PARA DESCARGAR ARCHIVO
    // ===============================================

    const handleDownload = (ruta) => {

        let nombre = ruta.split("%");

        nombre = nombre[1];

        axios({
            url: `${baseURL}api/orden/download/file`,
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
    // SEGMENTO PARA BUSCAR CAT. TIPOS DE DOCUMENTOS
    // ===============================================

    const [documents, setDocuments] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/documentos`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let doc = result.data.result;

                doc.unshift({id: "", tipo: "Seleccione el tipo de documento"});
        
                setDocuments(doc);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token])

    // ===============================================
    // SEGMENTO PARA VALIDAR MODAL
    // ===============================================

    const handleValidate = () => {

        if(idOrder === 0){

            Swal.fire({
                icon: 'warning',
                title: 'Seleccione una orden para continuar!',
            })

        }else{

            document.getElementById("btnCrearFileOrden").click();

        }

    }
    
    // ===============================================
    // SEGMENTO PARA VALIDAR LISTA DE ARCHIVOS PENDIENTES
    // ===============================================

    const requiredDocuments = [
        { id: 1, name: 'BOL' },
        { id: 2, name: 'Factura' },
        { id: 3, name: 'Pedimento' },
        { id: 4, name: 'Carta Porte' },
        { id: 5, name: 'Fianza' },
    ];

    const [myDoc, setMyDoc] = useState([]);

    useEffect(() => {

        let uploadedDocuments = [];

        data.map((op) => {
            uploadedDocuments.push(op.rel_tipo_documento)
        })

        requiredDocuments.map((docu) => {

            if(uploadedDocuments.includes(docu.id)){

                docu.isUploaded = true;

            }else{

                docu.isUploaded = false;

            }

        })

        setMyDoc(requiredDocuments)

    }, [data])

    

    // ===============================================
    // SEGMENTO PARA EDITAR ARCHIVO
    // ===============================================

    const handleEditFile = (id) => {

        axios.get(`${baseURL}api/orden/archivo/id/${id}`,{
  
            method: "GET",
            headers: {"access-token": token},
    
        })
        .then(result => {
    
            if(result.data.success == true)
            {

                let formTemp = result.data.result;

                formTemp[0]["archivoActual"] = formTemp[0]["ruta"];

                document.getElementById("selectEditRel_tipo_documento").value = formTemp[0]["rel_tipo_documento"]

                setFormValues(formTemp[0]);

            }
    
        })
        .catch(error => {
        
            console.log(error)
    
        })

    }

    // ===============================================
    // SEGMENTO PARA ELIMINAR ARCHIVO
    // ===============================================

    const handleDeleteFile = (id, ruta) => {

        Swal.fire({
            title: 'Estas seguro de borrar este archivo?',
            text: "Esta accion no podra ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
            }).then((result) => {
    
                if(result.isConfirmed) {
    
                    const data = { path: ruta };
                    
                    fetch(`${baseURL}api/orden/archivo/delete/${id}`, {
                            
                        method: "DELETE", 
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
                            title: 'Se ha eliminado correctamente!',
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
    
            })

    }      

    // ===============================================
    // SEGMENTO PARA GENERAR CARTA INSTRUCCION
    // ===============================================

    const [IDorden, setIDorden] = useState(0);

    const handleCi = (id, op) => {

        if(formValues["rel_orden"] === 0){

            Swal.fire({
                icon: 'warning',
                title: 'Seleccione una orden para continuar!',
            })

        }else{

            validarCi(id, op)

        }

    }

    //FUNCION PARA VALIDAR SI SE PUEDE GENERAR EL CI

    const validarCi = async (idOrden, op) => {

        setToken(Cookies.get('jwtoken'));

        const config = {
  
            headers: {"access-token": token},
    
        };

        //VALIDAMOS SI ES IMPORTACION

        if(op === "Importacion"){

            const response = await axios.get(`${baseURL}api/validar/reporte/ci/${idOrden}`, config);

            let respuesta = response.data.text;
    
            if(respuesta === "Sin despacho"){
    
                Swal.fire({
                    icon: 'warning',
                    title: 'Genere el despacho de esta orden para continuar!',
                })
    
            }else if(respuesta === "Sin BOL"){
    
                Swal.fire({
                    icon: 'warning',
                    title: 'Anexe el BOL a la orden para continuar!',
                })
    
            }else if(respuesta === "ok"){
    
                document.getElementById("btnCrearPDFCi").click();
    
                setIDorden(idOrden);
    
            }

        }else{
            console.log("es exportacion")
            document.getElementById("btnCrearPDFCi").click();
    
            setIDorden(idOrden);

        }


    }

    // ================================================================
    // ================================================================

    return (

        <div className='mt-3'>

            {/* BOTONES PARA CREAR ARCHIVO DE ORDEN */}

            <button 
                type="button" 
                className="btn btn-primary mt-4" 
                onClick={() => handleValidate()}>
                <MdAddCircle/> Agregar Documento
            </button>

            <button 
                id="btnCrearFileOrden"
                type="button" 
                style={{display: "none"}}
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearFileOrden">
            </button>

            {/* BOTONES PARA VER PDF CI */}

            <button
                type='button'
                className='btn btn-info mt-4'
                style={{'marginLeft':'20px','color':'white'}}
                onClick={() => handleCi(idOrder, op)}
            >
                    <AiOutlineFilePdf/> Generar CI
            </button>

            <button 
                id="btnCrearPDFCi"
                type="button" 
                style={{display: "none"}}
                data-bs-toggle="modal" 
                data-bs-target="#modalPDFCi">
            </button>

            {/* LISTA DE VERIFICACION */}

            <div className='row'>

                <div className='col-6 mt-5'>

                <ol className="list-group list-group-numbered">

                    {
                        myDoc.map((doc) => (

                            <li key={doc.id} className="list-group-item d-flex justify-content-between align-items-start">

                                <div className="ms-2 me-auto">

                                    <div className="fw-bold">{doc.name}</div>
                
                                </div>

                                {doc.isUploaded ? <FaCheckCircle size={25}/> : <FaTimesCircle size={25}/>}
                                
                            </li>

                        ))
                    }

                </ol>

                </div>

                {/* TABLA DE DOCUMENTOS */}

                <div className='col-6'>

                    <Tabla columns = {columns} data = {data}/>

                </div>

            </div>

            {/* MODAL PARA CREAR ARCHIVO */}

            <ModalCrearDoc
                data={formValues}
                refresh={buscarFiles}
                documents={documents}
                onChange={handleChange}
                onChangeImg={handleChangeImg}
                setFormValues={setFormValues}
            />

            {/* MODAL PARA EDITAR ARCHIVO */}

            <ModalEditarDoc
                data={formValues}
                refresh={buscarFiles}
                documents={documents}
                onChange={handleChange}
                onChangeImg={handleChangeImg}
                setFormValues={setFormValues}
            />

            {/* <DynamicForm 
                modalId="modalEditarArchivoOrden" 
                modalSize="modal-lg"
                headerTitle="Editar Documento" 
                formData={formData} 
                formValues={formValues} 
                apiURL={urlEdit} 
                tieneImagenes = "SI"
                validar="editar"
            /> */}

            {/* MODAL PARA VISUALIZAR EL PDF */}

            <div className="modal fade" id="modalPDFCi"  aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog modal-xl" style={{"maxHeight":"800px", "height":"600px"}}>
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">CARTA INSTRUCCION</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        <PDFViewer style={{"width":"100%", "height":"400px"}}>
                            <CiOrdenes idOrden={IDorden}/>
                        </PDFViewer>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary"><AiOutlineCloudDownload/>Descargar</button>
                    </div>
                    </div>
                </div>
            </div>
            
        </div>

    );

}

export default OrdenDocumentos;