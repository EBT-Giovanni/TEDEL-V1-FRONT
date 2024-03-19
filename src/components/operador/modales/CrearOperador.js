import React, { useState, useEffect } from 'react'
import {BiSave} from 'react-icons/bi';
import { baseURL } from '../../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

function CrearOperador(props) {

    const [token, setToken] = useState('');

    // ===============================================
    // SUBMIT PARA CREAR OPERADOR
    // ===============================================

    const urlCreate = baseURL + "api/operador/crear";

    const handleSubmit = (event) => {

        event.preventDefault();

        console.log(props.data);

        const token = Cookies.get('jwtoken');

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
                    title: 'Se ha agregado el operador!',
                }).then(() => {
        
                    window.location.reload(false);
        
                })
        
            }
    
        })
        .catch(error => {
    
            console.log(error)
    
        })

    }

    // ===============================================
    // LISTADO DE CAMIONES PARA EL SELECT DE OPERADOR
    // ===============================================

    const [tractores, setTractores] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/tractores/activos/operador`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success === true && result.data.result !== "Sin resultados")
            {

                let temp = result.data.result;

                temp.unshift({id: "0", numero_economico: "Sin tractor"});

                temp.unshift({id: "", numero_economico: "Seleccione un tractor"});

                setTractores(temp);

            }else{

                let temp = [{id: "", numero_economico: "No hay tractores disponibles"},  {id: "0", numero_economico: "Sin tractor"}]

                setTractores(temp);

            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

    // ===============================================
    // MODAL PARA CREAR OPERADOR
    // ===============================================

    return (

        <div>

            <div className="modal fade" id="modalCrearOperador" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog">

                    <div className="modal-content">

                    <form onSubmit={handleSubmit}>

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">Agregar Operador</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>

                        <div className="modal-body">

                            <div className='row'>

                                {/* NOMBRE DE OPERADOR */}

                                <div className='col-12 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Nombre Completo:</span>

                                    <input
                                        className='form-control'
                                        key="nombreOperador"
                                        type="text"
                                        name="nombre"
                                        onChange={props.onChange}
                                        placeholder='Ingrese nombre del operador'
                                    />

                                </div>

                                {/* CLAVE */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Clave:</span>

                                    <input
                                        className='form-control'
                                        key="claveOperador"
                                        type="text"
                                        name="clave"
                                        onChange={props.onChange}
                                        placeholder='Ingrese clave del operador'
                                    />

                                </div>

                                {/* TRACTOR */}

                                <div className='col-6  mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Tractor:</span>

                                    <select
                                        key="rel_tractorOperador"
                                        name="rel_tractor"
                                        className="form-select"
                                        onChange={props.onChange}>

                                        {tractores.map((op) => (
                                            <option key={op.id} value={op.id}>{op.numero_economico}</option>
                                        ))} 
                                        
                                    </select>

                                </div>

                                {/* DOMICILIO */}

                                <div className='col-12 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Domicilio:</span>

                                    <input
                                        className='form-control'
                                        key="domicilioOperador"
                                        type="text"
                                        name="domicilio"
                                        onChange={props.onChange}
                                        placeholder='Ingrese domicilio del operador'
                                    />

                                </div>

                                {/* TELEFONO */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Telefono:</span>

                                    <input
                                        className='form-control'
                                        key="telefonoOperador"
                                        type="text"
                                        name="telefono"
                                        onChange={props.onChange}
                                        placeholder='Ingrese telefono'
                                    />

                                </div>

                                {/* CELULAR */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Celular:</span>

                                    <input
                                        className='form-control'
                                        key="celularOperador"
                                        type="text"
                                        name="celular"
                                        onChange={props.onChange}
                                        placeholder='Ingrese celular'
                                    />

                                </div>

                                {/* FECHA DE INGRESO */}

                                <div className='col-12 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Fecha de Ingreso:</span>

                                    <input
                                        className='form-control'
                                        key="fecha_ingresoOperador"
                                        type="date"
                                        name="fecha_ingreso"
                                        onChange={props.onChange}
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

export default CrearOperador