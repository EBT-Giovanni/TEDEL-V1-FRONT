import React, { useState, useEffect } from 'react'
import {BiSave} from 'react-icons/bi';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

function EditarCaja(props) {

    const [token, setToken] = useState('');

    // ===============================================
    // SUBMIT PARA CREAR CAJA
    // ===============================================

    const urlEdit = baseURL+"api/cajas/actualiza";

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
                    "access-token": token
                } 
        
            })
            .then(result => {
        
                if(result.data.success === true)
                {
            
                    Swal.fire({
                        icon: 'success',
                        title: 'Se ha editado la caja!',
                    }).then(() => {
            
                        props.refresh();
                        document.getElementById("btnCerrarModalEditarCaja").click();
            
                    })
            
                }
        
            })
            .catch(error => {
        
                console.log(error)
        
            })

        }

    }

    // ===============================================
    // MODAL PARA EDITAR CAJA
    // ===============================================

    return (

        <div>

            <div className="modal fade" id="modalEditarCaja" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog modal-lg">

                    <div className="modal-content">

                    <form onSubmit={handleSubmit}>

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">Agregar Caja</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" id="btnCerrarModalEditarCaja" aria-label="Close"></button>

                        </div>

                        <div className="modal-body">

                            <div className='row'>

                                {/* NUMERO DE CAJA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Numero de Caja:</span>

                                    <input
                                        className='form-control'
                                        key="numeroCaja"
                                        type="text"
                                        name="numero"
                                        onChange={props.onChange}
                                        defaultValue={props.data.numero}
                                        placeholder='Ingrese numero de caja'
                                    />

                                </div>

                                {/* TIPO DE CAJA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Tipo de Caja:</span>

                                    <input
                                        className='form-control'
                                        key="tipoCaja"
                                        type="text"
                                        name="tipo"
                                        onChange={props.onChange}
                                        defaultValue={props.data.tipo}
                                        placeholder='Ingrese tipo de caja'
                                    />

                                </div>

                                {/* PLACAS DE CAJA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Placas de Caja:</span>

                                    <input
                                        className='form-control'
                                        key="placasCaja"
                                        type="text"
                                        name="placas"
                                        onChange={props.onChange}
                                        defaultValue={props.data.placas}
                                        placeholder='Ingrese placas de caja'
                                    />

                                </div>

                                {/* MARCA DE CAJA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Marca de Caja:</span>

                                    <input
                                        className='form-control'
                                        key="marcaCaja"
                                        type="text"
                                        name="marca"
                                        onChange={props.onChange}
                                        defaultValue={props.data.marca}
                                        placeholder='Ingrese marca de caja'
                                    />

                                </div>

                                {/* EMPRESA DE CAJA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Empresa de la Caja:</span>

                                    <select
                                        key="empresaCaja"
                                        id="selectEmpresaCajaEdit"
                                        name="empresa"
                                        className="form-select"
                                        onChange={props.onChange}>

                                        <option value="">Seleccione una empresa</option>
                                        <option value="EBT">EBT</option>
                                        
                                    </select>

                                </div>

                                {/* ANIO DE CAJA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Año de la Caja:</span>

                                    <input
                                        className='form-control'
                                        key="anioCaja"
                                        type="number"
                                        name="anio"
                                        onChange={props.onChange}
                                        defaultValue={props.data.anio}
                                        placeholder='Ingrese año de caja'
                                    />

                                </div>

                                {/* ESTADO DE CAJA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Activo / Inactivo:</span>

                                    <select
                                        id="selectEstadoCajaEdit"
                                        key="activoCaja"
                                        name="activo"
                                        className="form-select"
                                        onChange={props.onChange}>

                                        <option value="">Seleccione estado</option>
                                        <option value="1">ACTIVO</option>
                                        <option value="0">INACTIVO</option>
                                        
                                    </select>

                                </div>

                                {/* ESTATUS DE LA CAJA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Estado de la Caja:</span>

                                    <select
                                        key="rel_estatus_cajaCaja"
                                        id="selectEstatusCajaEdit"
                                        name="rel_estatus_caja"
                                        className="form-select"
                                        onChange={props.onChange}>

                                        {props.estatus.map((op) => (
                                            <option key={op.id} value={op.id}>{op.estatus}</option>
                                        ))} 
                                        
                                    </select>

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

export default EditarCaja