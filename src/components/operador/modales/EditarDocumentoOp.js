import React, { useState } from 'react'
import {BiSave} from 'react-icons/bi';
import { baseURL } from '../../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

function EditarDocumentoOp(props) {

    const [token, setToken] = useState('');

    // ===============================================
    // SUBMIT PARA EDITAR DOCUMENTO
    // ===============================================

    const urlEdit = baseURL + "api/operador/archivos/editar";

    const handleSubmit = (event) => {

        event.preventDefault();

        console.log(props.data);

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

            axios.put(urlEdit, props.data,{
  
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
                        title: 'Se ha editado el documento!',
                    }).then(() => {
            
                        window.location.reload(false);
            
                    })
            
                }
        
            })
            .catch(error => {
        
                console.log(error)
        
            })

        }

    }

    // ===============================================
    // MODAL PARA EDITAR DOCUMENTO
    // ===============================================

    return (

        <div>

            <div className="modal fade" id="modalEditarArchivoOp" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog">

                    <div className="modal-content">

                    <form onSubmit={handleSubmit}>

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">Editar Documento</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>

                        <div className="modal-body">

                            <div className='row'>

                                {/* TIPO DE DOCUMENTO */}

                                <div className='col-12  mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Tipo de Documento:</span>

                                    <select
                                        key="rel_tipo_documentosOperador"
                                        name="rel_tipo_documentos"
                                        id="selectTipoDocOp"
                                        className="form-select"
                                        onChange={props.onChange}>

                                        {props.doc.map((op) => (
                                            <option key={op.id} value={op.id}>{op.tipo_licencia}</option>
                                        ))} 
                                        
                                    </select>

                                </div>

                                {/* DESCRIPCION */}

                                <div className='col-12 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Descripcion:</span>

                                    <input
                                        className='form-control'
                                        key="documentoOperador"
                                        type="text"
                                        name="documento"
                                        onChange={props.onChange}
                                        defaultValue={props.data.documento}
                                        placeholder='Ingrese descripcion'
                                    />

                                </div>

                                {/* ARCHIVO */}

                                <div className='col-12 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Telefono:</span>

                                    <input 
                                        key="rutaOrdenGasto" 
                                        className="form-control"  
                                        type="file"
                                        name="ruta"
                                        onChange={props.onChangeDoc}
                                    />

                                </div>

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button type="submit" className='btn btn-primary float-end'><BiSave/> Guardar</button>

                        </div>

                    </form>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default EditarDocumentoOp