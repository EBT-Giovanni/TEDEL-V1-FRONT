import React from 'react';
import {BiSave} from 'react-icons/bi';
import { baseURL } from '../../../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const ModalEditarDoc = (props) => {

    // ===============================================
    // SEGMENTO PARA SUBMIT EDIT DOCUMENTO
    // ===============================================

    const urlEdit = baseURL + "api/orden/archivo/editar";

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
                    title: 'Se ha editado correctamente!',
                  }).then(() => {
          
                    document.getElementById("btnCerrarModalEditarDocOrden").click();
                    props.refresh();
          
                  })
          
                }
            
              })
              .catch(error => {
            
                console.log(error)
            
              })

        }

    }

    return (

      <div>

        <div className="modal fade" id="modalEditarArchivoOrden" data-bs-backdrop="static" aria-hidden="true">

          <div className="modal-dialog">

              <form onSubmit={handleSubmit}>

                  <div className="modal-content">

                  <div className="modal-header">

                      <h5 className="modal-title" id="exampleModalLabel">Crear Usuario</h5>

                      <button type="button" id="btnCerrarModalEditarDocOrden" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>

                  </div>

                  {/* MODAL BODY */}

                  <div className="modal-body">

                      <div className='row'>

                          {/* TIPOS DE DOCUMENTOS */}

                          <div className='col-12'>

                              <span className="badge text-bg-secondary mb-2">Tipo de Documento:</span>

                              <select
                                  key="rel_perfilUser"
                                  id="selectEditRel_tipo_documento"
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
                                  key="nombresUser"
                                  type="text"
                                  name="clave_documento"
                                  placeholder="Ingrese nombre documentos"
                                  defaultValue={props.data["clave_documento"]}
                                  autoComplete = "off"
                                  onChange={props.onChange}
                              />

                          </div>

                          {/* SUBIR DOCUMENTO */}

                          <div className='col-12 mt-4'>

                              <span className="badge text-bg-secondary mb-2">Subir Documento:</span>

                              <input
                                  className='form-control'
                                  key="rutaDocOrden"
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

export default ModalEditarDoc