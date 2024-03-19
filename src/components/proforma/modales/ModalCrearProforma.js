import React, { useState } from 'react'
import { baseURL } from '../../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

// ICONOS

import {BiSave} from 'react-icons/bi';

const ModalCrearProforma = (props) => {

    const urlCreate = baseURL+"api/create/proforma";

    // ===============================================
    // FUNCION PARA CREAR PROFORMA
    // ===============================================

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
    // MODAL PARA CREAR PROFORMA
    // ===============================================

    return (

        <div>

            <div className="modal fade" id="modalCrearProforma" data-bs-backdrop="static" aria-hidden="true">

                <div className="modal-dialog modal-xl">

                    <form onSubmit={handleSubmit}>

                        <div className="modal-content">

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">Crear Proforma</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>

                        {/* MODAL BODY */}

                        <div className="modal-body">

                            <div className='row'>

                                {/* FLETE INTERNACIONAL */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Flete Internacional:</span>

                                    <select
                                        key="flete-Proforma"
                                        name="flete_internacional"
                                        className="form-select"
                                        onChange={props.onChange}>

                                    <option value="">¿ Es flete internacional ?</option>
                                    <option value="SI">SI</option>
                                    <option value="NO">NO</option>

                                    </select>

                                </div>

                                {/* ENTRADA / SALIDA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Entrada / Salida:</span>

                                    <select
                                        key="entrada_salida-Proforma"
                                        name="entrada_salida"
                                        className="form-select"
                                        onChange={props.onChange}>

                                        <option value="">Seleccione Condicion</option>
                                        <option value="ENTRADA">ENTRADA</option>
                                        <option value="SALIDA">SALIDA</option>

                                    </select>

                                </div>

                                {/* PAIS DE CARGA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Pais de Carga:</span>

                                    <select
                                        key="pais_de_carga-Proforma"
                                        name="pais_de_carga"
                                        className="form-select"
                                        onChange={props.onChange}>

                                        <option value="">Seleccione Pais de Carga</option>
                                        <option value="MEX">MEX</option>
                                        <option value="USA">USA</option>

                                    </select>

                                </div>

                                {/* CANTIDAD DE MERCANCIA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Cantidad de Mercancia:</span>

                                    <input
                                        className='form-control'
                                        key="mercancia_cantidad-Proforma"
                                        name='mercancia_cantidad'
                                        type="text"
                                        placeholder='Ingrese cantidad de mercancia'
                                        onChange={props.onChange}
                                    />

                                </div>

                                {/* FRACCION ARANCELARIA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Fraccion Arancelaria:</span>

                                    <input
                                        className='form-control'
                                        name='mercancia_fraccion_arancelaria'
                                        key="mercancia_fraccion_arancelaria-Proforma"
                                        type="text"
                                        onChange={props.onChange}
                                        placeholder='Ingrese la fraccion arancelaria'
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

export default ModalCrearProforma