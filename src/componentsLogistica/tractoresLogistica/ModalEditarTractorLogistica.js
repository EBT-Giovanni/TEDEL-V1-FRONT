import React from 'react';
import {BiSave} from 'react-icons/bi';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const ModalEditarTractorLogistica = (props) => {

    // ===============================================
    // SUBMIT PARA CREAR OPERADOR
    // ===============================================

    const urlEdit = baseURL + "api/update/tractor/logistica";

    const handleSubmit = (event) => {

        event.preventDefault();

        console.log(props.data);

        const token = Cookies.get('jwtoken');

        let validar = true;

        Object.entries(props.data).forEach(entry => {

            const [key,value] = entry;
    
            if(key === "numero_economico" && value === "" || value === null){
              
              Swal.fire({
                icon: 'warning',
                title: 'No pueden ir campos vacios!',
              })

              validar = false;
    
              return;
    
            }

        });

        if(validar){

            axios.post(urlEdit, props.data,{
  
                headers: {
                    "access-token": token
                } 
        
            })
            .then(result => {
        
                if(result.data.success === true)
                {
            
                    Swal.fire({
                        icon: 'success',
                        title: 'Se ha agregado el tractor!',
                    }).then(() => {
            
                        props.refresh();
                        document.getElementById("btnCerrarModalEditarTractorL").click();
            
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

            <div className="modal fade" id="modalEditarTractorLogistica" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog modal-lg">

                    <div className="modal-content">

                    <form onSubmit={handleSubmit} autoComplete='off'>

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">Agregar Tractor</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" id="btnCerrarModalEditarTractorL" aria-label="Close"></button>

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
                                        defaultValue={props.data["numero_economico"]}
                                        name="numero_economico"
                                        onChange={props.onChange}
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
                                        defaultValue={props.data["anio"]}
                                        onChange={props.onChange}
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
                                        defaultValue={props.data["marca"]}
                                        onChange={props.onChange}
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
                                        defaultValue={props.data["modelo"]}
                                        onChange={props.onChange}
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
                                        defaultValue={props.data["color"]}
                                        onChange={props.onChange}
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
                                        defaultValue={props.data["permiso_sct"]}
                                        onChange={props.onChange}
                                        placeholder='Ingrese Permiso SCT tractor'
                                    />

                                </div>

                                {/* ODOMETRO */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Odometro:</span>

                                    <input
                                        className='form-control'
                                        key="celularOperador"
                                        type="number"
                                        name="odometro"
                                        defaultValue={props.data["odometro"]}
                                        onChange={props.onChange}
                                        placeholder='Ingrese odometro'
                                    />

                                </div>

                                {/* PLACAS */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Placas:</span>

                                    <input
                                        className='form-control'
                                        key="placasTraCTOR"
                                        type="number"
                                        name="placas"
                                        defaultValue={props.data["placas"]}
                                        onChange={props.onChange}
                                        placeholder='Ingrese placas'
                                    />

                                </div>

                                {/* ESTADO  TRACTOR */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Estado:</span>

                                    <select
                                        key="activoTractor"
                                        name="activo"
                                        className="form-select"
                                        id="estadoTractorLogisticaEditar"
                                        onChange={props.onChange}>

                                        <option key="status00" value="">Seleccione estado</option>
                                        <option key="status01" value="1">Activo</option>
                                        <option key="status02" value="0">Inactivo</option>
                                        
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

export default ModalEditarTractorLogistica