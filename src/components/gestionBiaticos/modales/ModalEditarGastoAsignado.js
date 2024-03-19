import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';

// ICONOS 

import { FiUpload } from 'react-icons/fi';
import {BiArrowBack} from 'react-icons/bi';

const ModalEditarGastoAsignado = ({

  idOrden, 
  operador, 
  cambiarEstado, 
  gastos,
  handleChange,
  formValues

}) => {

    // ===============================================
    // FUNCION PARA EDITAR EL GASTO
    // ===============================================

    const urlEdit = `${baseURL}api/update/gastos/asignados`;

    const handleSubmit = (event) => {

      console.log(formValues)

      event.preventDefault();

      const token = Cookies.get('jwtoken');

      let validar = true;

      Object.entries(formValues).forEach(entry => {

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

      axios.put(urlEdit, formValues,{

          headers: {
            "access-token": token,
            'Content-Type': 'multipart/form-data',
          } 
      
        })
        .then(result => {
    
          if(result.data.success === true)
          {
    
            Swal.fire({
              icon: 'success',
              title: 'Se ha editado el gasto!',
            }).then(() => {
    
              document.getElementById("btnRegresarRegistrosGastos").click();

              cambiarEstado();
    
            })
    
          }
      
        })
        .catch(error => {
      
          console.log(error)
      
        })

      }

  }

  // ===============================================
  // MODAL PARA CREAR GASTOS ASGINADOS
  // ===============================================

  return (

    <div>

      <div className="modal fade" id="modalEditarGastoAsignado" data-bs-backdrop="static" aria-hidden="true">

        <div className="modal-dialog">

          <div className="modal-content">

            <form onSubmit={handleSubmit}>

              <div className="modal-header">

                <h5 className="modal-title" id="exampleModalLabel">Editar Gasto / {idOrden} - {operador}</h5>

              </div>

              {/* CUERPO DEL MODAL */}

              <div className="modal-body">
                  
                <div className='row'>

                  {/* DESCRIPCION DE GASTO */}

                  <div className='col-12'>

                    <span className="badge text-bg-secondary mb-2">Tipo de Gasto:</span>

                    <select
                    id="selectEditTipoGastoAsignado"
                    key="tipo_gasto"
                    name="tipo_gasto"
                    className="form-select"
                    onChange={handleChange}>

                      {gastos.map((op) => (
                        <option key={op.id} value={op.id}>{op.descripcion}</option>
                      ))}
                        
                    </select>

                  </div>

                  {/* MONTO DE GASTO */}

                  <div className='col-12 mt-4'>

                    <span className="badge text-bg-secondary mb-2">Monto de Gasto:</span>

                    <input
                      className='form-control'
                      id="editMontoAsignado"
                      key="montoEvidencia"
                      type="number"
                      name="monto"
                      placeholder="Ingrese monto"
                      step=".01"
                      autoComplete = "off"
                      onChange={handleChange}
                    />

                  </div>

                  {/* COMPROBANTE */}

                  <div className='col-12 mt-4'>

                    <span className="badge text-bg-secondary mb-2">Comprobante:</span>

                    <input
                      className='form-control'
                      key="ruta_comprobante"
                      type="file"
                      name="ruta"
                      autoComplete = "off"
                      onChange={handleChange}
                    />

                  </div>

                </div>

              </div>

              <div className="modal-footer" style={{"display":"block"}}>

                <div className='row'>

                  <div className='col-6'>

                    <button 
                    type="button" 
                    className="btn btn-secondary" 
                    id="btnRegresarRegistrosGastos"
                    data-bs-target="#modalGestionarBiaticos"data-bs-toggle="modal" data-bs-dismiss="modal"><BiArrowBack/> Regresar</button>

                  </div>

                  <div className='col-6'>

                    <button type="submit" className="btn btn-primary float-end"><FiUpload/> Subir Gasto</button>

                  </div>

                </div>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>

  )

}

export default ModalEditarGastoAsignado