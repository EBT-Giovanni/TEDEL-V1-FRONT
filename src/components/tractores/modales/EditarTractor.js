import React, { useState, useEffect } from 'react'
import {BiSave} from 'react-icons/bi';
import { baseURL } from '../../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

function EditarTractor(props) {

    const [token, setToken] = useState('');

    // ===============================================
    // SUBMIT PARA CREAR OPERADOR
    // ===============================================

    const urlEdit = baseURL + "api/tractor/editar";

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
                        title: 'Se ha editado el tractor!',
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


  return (

    <div>

        <div className="modal fade" id="modalEditarTractor" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

            <div className="modal-dialog modal-lg">

                <div className="modal-content">

                <form onSubmit={handleSubmit}>

                    <div className="modal-header">

                        <h5 className="modal-title" id="exampleModalLabel">Editar Tractor</h5>

                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                    </div>

                    <div className="modal-body">

                        <div className='row'>

                            {/* NUMERO DE TRACTOR */}

                            <div className='col-6 mb-3'>

                                <span className="badge text-bg-secondary mb-2">Numero de Tractor:</span>

                                <input
                                    className='form-control'
                                    key="numero_economicoTractor"
                                    type="text"
                                    name="numero_economico"
                                    onChange={props.onChange}
                                    defaultValue={props.data.numero_economico}
                                    placeholder='Ingrese numero del tractor'
                                />

                            </div>

                            {/* ANIO */}

                            <div className='col-6 mb-3'>

                                <span className="badge text-bg-secondary mb-2">Año del tractor:</span>

                                <input
                                    className='form-control'
                                    key="anioTractor"
                                    type="number"
                                    name="anio"
                                    onChange={props.onChange}
                                    defaultValue={props.data.anio}
                                    placeholder='Ingrese clave del operador'
                                />

                            </div>

                            {/* MARCA DEL TRACTOR */}

                            <div className='col-6  mb-3'>

                                <span className="badge text-bg-secondary mb-2">Marca:</span>

                                <input
                                    className='form-control'
                                    key="marcaTractor"
                                    type="text"
                                    name="marca"
                                    onChange={props.onChange}
                                    defaultValue={props.data.marca}
                                    placeholder='Ingrese marca del tractor'
                                />

                            </div>

                            {/* MODELO */}

                            <div className='col-6 mb-3'>

                                <span className="badge text-bg-secondary mb-2">Modelo:</span>

                                <input
                                    className='form-control'
                                    key="modeloTractor"
                                    type="text"
                                    name="modelo"
                                    onChange={props.onChange}
                                    defaultValue={props.data.modelo}
                                    placeholder='Ingrese modelo del tractor'
                                />

                            </div>

                            {/* COLOR */}

                            <div className='col-6 mb-3'>

                                <span className="badge text-bg-secondary mb-2">Color:</span>

                                <input
                                    className='form-control'
                                    key="colorTractor"
                                    type="text"
                                    name="color"
                                    onChange={props.onChange}
                                    defaultValue={props.data.color}
                                    placeholder='Ingrese color del tractor'
                                />

                            </div>

                            {/* PERMISO SCT */}

                            <div className='col-6 mb-3'>

                                <span className="badge text-bg-secondary mb-2">Permiso SCT:</span>

                                <input
                                    className='form-control'
                                    key="permiso_sctTractor"
                                    type="text"
                                    name="permiso_sct"
                                    onChange={props.onChange}
                                    defaultValue={props.data.permiso_sct}
                                    placeholder='Ingrese Permiso SCT tractor'
                                />

                            </div>

                            {/* ODOMETRO */}

                            <div className='col-6 mb-3'>

                                <span className="badge text-bg-secondary mb-2">Odometro:</span>

                                <input
                                    className='form-control'
                                    key="celularOperador"
                                    type="text"
                                    name="odometro"
                                    onChange={props.onChange}
                                    defaultValue={props.data.odometro}
                                    placeholder='Ingrese odometro'
                                />

                            </div>

                            {/* ESTADO DEL TRACTOR */}

                            <div className='col-6 mb-3'>

                                <span className="badge text-bg-secondary mb-2">Estado:</span>

                                <select
                                    key="activoTractor"
                                    id="selecEstadoTractor"
                                    name="activo"
                                    className="form-select"
                                    onChange={props.onChange}>

                                    <option key="status00" value="">Seleccione estado</option>
                                    <option key="status01" value="1">Activo</option>
                                    <option key="status02" value="0">Inactivo</option>
                                    
                                </select>

                            </div>

                            {/* FOTO TRACTOR */}

                            <div className='col-6 mb-3'>

                                <span className="badge text-bg-secondary mb-2">Foto Tractor:</span>

                                <input
                                    className='form-control'
                                    key="foto_rutaTractor"
                                    type="file"
                                    name="foto_ruta"
                                    autoComplete = "off"
                                    onChange={props.onChangeImg}
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

export default EditarTractor