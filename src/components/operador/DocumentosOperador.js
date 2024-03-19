import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

//COMPONENTES
import Tabla from '../Tabla';


//ICONS
import {BsPencil} from 'react-icons/bs';
import {MdAddCircle} from 'react-icons/md';
import {FiDownload} from 'react-icons/fi';
import CrearDocumentoOp from './modales/CrearDocumentoOp';
import EditarDocumentoOp from './modales/EditarDocumentoOp';

function DocumentosOperador({idOperador}) {

    const [token, setToken] = useState('');

    // ===============================================
    // DATOS PARA CREAR EL REGISTRO
    // ===============================================

    const [formValues, setFormValues] = useState({

        rel_operador: 0,
        rel_tipo_documentos: "",
        documento: "",
        ruta: ""

    })

    // ===============================================
    // GUARDAR DOCUMENTOS DEL OPERADOR
    // ===============================================

    const [data, setData] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));

        if(idOperador !== 0){

            setFormValues({ ...formValues, ["rel_operador"]: idOperador });

            buscarDocumentos(idOperador)

        }

    }, [idOperador])

    // ===============================================
    // BUSCAR DOCUMENTOS DEL OPERADOR
    // ===============================================

    const buscarDocumentos = async (id) => {
  
        const config = {
  
          headers: {"access-token": token},
  
        };

        const response = await axios.get(`${baseURL}api/archivos/operador/${id}`, config);

        if(response.data.success === true && response.data.result !== 'Sin resultados')
        {

            setData(response.data.result);

        }
        else{

            setData([])

        }

    }

    // ===============================================
    // COLUMNAS PARA TABLA DE DOCUMENTOS
    // ===============================================

    const columns = [

        {
            name: 'Documento',
            selector: row => row.documento,
            sortable: true
        },
        {
            name: "ACCIONES",
            button: true,
            cell: (row) => (
                
                <div className="input-group">
                    <button type="button" onClick={() => handleDownload(row.ruta)} className='btn btn-outline-info'><FiDownload/></button>
                    <button className="btn btn-outline-warning" type="button" onClick={() => handleEdit(row.id)} data-bs-toggle="modal" data-bs-target="#modalEditarArchivoOp"><BsPencil/></button>
                </div>
            
            ),
        },
    
    ];

    // ===============================================
    // BUSCAR TIPO DE DOCUMENTOS
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

            console.log(doc)

            doc.unshift({id: "", tipo: "Seleccione el tipo de documento"});
 
            setDocuments(doc);
          }
    
        })
        .catch(error => {
      
          console.log(error)
      
        })
    
    },[token])

    // ===============================================
    // EDITAR DOCUMENTOS DE OPERADOR
    // ===============================================

    const handleEdit = (id) => {

        axios.get(`${baseURL}api/archivos/id/${id}`,{
  
            method: "GET",
            headers: {"access-token": token},
        
          })
          .then(result => {
      
            if(result.data.success == true)
            {

                let temp = result.data.result[0];

                temp["archivoActual"] = temp["ruta"];

                setFormValues(temp);

                document.getElementById("selectTipoDocOp").value = result.data.result[0]["rel_tipo_documentos"];

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

    const handleChangeDoc = (event) => {

        setFormValues({ ...formValues, ["ruta"]: event.target.files[0]})

    }

    // ===============================================
    // DESCARGAR ARCHIVO 
    // ===============================================

    const handleDownload = (ruta) => {

        let nombre = ruta.split("%");

        nombre = nombre[1];

        axios({
            url: `${baseURL}api/operador/download/file`,
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
    // VALIDAR SI ESCOGIO ALGUN OPERADOR
    // ===============================================

    const handleValidate = () => {

        if(formValues["rel_operador"] === 0){

            Swal.fire({
                icon: 'warning',
                title: 'Seleccione un operador para continuar!',
            })

        }else{

            document.getElementById("btnAbrirlModalCrearDocOperador").click();

        }

    }

    return (

        <div className='mt-3'>

            {/* BOTON PARA VALIDAR SI PUEDE ABRIR EL MODAL */}

            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => handleValidate()}>
                <MdAddCircle/> Agregar Archivo
            </button>

            {/* BOTON PARA ABIR MODAL */}

            <button 
                type="button" 
                id="btnAbrirlModalCrearDocOperador"
                style={{display: "none"}}
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearDocumentoOperador">
            </button>

            {/* MODAL PARA CREAR DOCUMENTOS */}

            <CrearDocumentoOp
                onChange = {handleChange}
                onChangeDoc = {handleChangeDoc}
                data = {formValues}
                doc = {documents}
            />

            {/* MODAL PARA EDITAR DOCUMENTOS */}

            <EditarDocumentoOp
                onChange = {handleChange}
                onChangeDoc = {handleChangeDoc}
                data = {formValues}
                doc = {documents}
            />

            {/* TABLA PARA MOSTRAR DOCUMENTOS */}

            <Tabla columns = {columns} data = {data}/>

        </div>

    )

}

export default DocumentosOperador