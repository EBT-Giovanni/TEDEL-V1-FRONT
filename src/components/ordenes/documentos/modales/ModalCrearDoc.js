import React from 'react';
import {BiSave} from 'react-icons/bi';
import { baseURL } from '../../../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const ModalCrearDoc = (props) => {

    // ===============================================
    // SEGMENTO PARA SUBMIT CREAR DOCUMENTO
    // ===============================================

    const urlCreate = baseURL + "api/orden/archivo/crear";

    const handleSubmit = (event) => {

        console.log(props.data)

        event.preventDefault();

        const token = Cookies.get('jwtoken');

        let validar = true;

        Object.entries(props.data).forEach(entry => {

            const [key,value] = entry;
    
            if(value === "" || value === null){
              
              Swal.fire({
                icon: 'warning',
                title: 'No pueden ir campos vacios!',
              })

              validar = false;
    
              return;
    
            }
    
        });

        if(validar){

            axios.post(urlCreate, props.data,{
  
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "access-token": token
                } 
            
              })
              .then(result => {
          
                if(result.data.success === true)
                {
          
                  Swal.fire({
                    icon: 'success',
                    title: 'Se ha creado correctamente!',
                  }).then(() => {
          
                    document.getElementById("btnCerrarModalCrearDocOrden").click();
                    props.refresh();
                    limpiarModal();
          
                  })
          
                }
            
              })
              .catch(error => {
            
                console.log(error)
            
              })

        }

    }

    // ===============================================
    // SEGMENTO PARA LIMPIAR MODAL
    // ===============================================

    const limpiarModal = () => {

        document.getElementById("selectRel_tipo_documento").value = "";
        document.getElementById("clave_documentoCrearDoc").value = "";
        document.getElementById("rutaDocOrden").value = "";

        props.setFormValues({
            rel_orden: "",
            rel_tipo_documento: "",
            clave_documento: "",
            ruta: ""
        })

    }

    return (

        <div>

            <div className="modal fade" id="modalCrearFileOrden" data-bs-backdrop="static" aria-hidden="true">

                <div className="modal-dialog">

                    <form onSubmit={handleSubmit}>

                        <div className="modal-content">

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">Crear Usuario</h5>

                            <button type="button" id="btnCerrarModalCrearDocOrden" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={limpiarModal}></button>

                        </div>

                        {/* MODAL BODY */}

                        <div className="modal-body">

                            <div className='row'>

                                {/* TIPOS DE DOCUMENTOS */}

                                <div className='col-12'>

                                    <span className="badge text-bg-secondary mb-2">Tipo de Documento:</span>

                                    <select
                                        key="rel_perfilUser"
                                        id="selectRel_tipo_documento"
                                        name="rel_tipo_documento"
                                        className="form-select"
                                        onChange={props.onChange}>

                                        {props.documents.map((op) => (
                                            <option key={op.id} value={op.id}>{op.tipo}</option>
                                        ))}
                                        
                                    </select>

                                </div>

                                {/* Nombre */}

                                <div className='col-12 mt-4'>

                                    <span className="badge text-bg-secondary mb-2">Nombre Documento:</span>

                                    <input
                                        className='form-control'
                                        id="clave_documentoCrearDoc"
                                        key="nombresUser"
                                        type="text"
                                        name="clave_documento"
                                        placeholder="Ingrese nombre documentos"
                                        autoComplete = "off"
                                        onChange={props.onChange}
                                    />

                                </div>

                                {/* FOTO USUARIO */}

                                <div className='col-12 mt-4'>

                                    <span className="badge text-bg-secondary mb-2">Subir Documento:</span>

                                    <input
                                        className='form-control'
                                        key="rutaDocOrden"
                                        id="rutaDocOrden"
                                        type="file"
                                        name="ruta"
                                        autoComplete = "off"
                                        onChange={props.onChangeImg}
                                    />

                                </div>

                            </div>
                            
                        </div>

                        <div className="modal-footer">

                            <button type="submit" className="btn btn-primary"><BiSave/> Guardar</button>

                        </div>

                        </div>

                    </form>

                </div>

            </div>    

        </div>

    )

}

export default ModalCrearDoc