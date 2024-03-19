import React from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';
import {BiSave} from 'react-icons/bi';

function ModalAsignarDespacho(props) {

    // ===============================================
    // SUBMIT PARA CREAR DESPACHO
    // ===============================================

    const urlCreate = baseURL + "api/despacho/crear";

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
    // SUBMIT DE DESPACHO
    // ===============================================

    return (

        <div>

            <div className="modal fade" id="modalCrearDespacho"  aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog modal-lg">

                    <div className="modal-content">

                        <form onSubmit={handleSubmit}>

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">{props.header}</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>

                        {/* MODAL BODY */}

                        <div className="modal-body">

                            <div className='row'>

                                {/* SELECT PARA OPERADOR 1 */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Operador 1:</span>

                                    <select

                                        key="rel_chofer_1Despacho"
                                        name="rel_chofer_1"
                                        className="form-select"
                                        onChange={props.onChange}>

                                        {props.operadores.map((op) => (
                                            <option key={op.id} value={op.id}>{op.nombre}</option>
                                        ))}
                                        
                                    </select>

                                </div>

                                {/* SELECT PARA OPERADOR 2 */}

                                    <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Operador 2:</span>

                                    <select

                                        key="rel_chofer_2Despacho"
                                        name="rel_chofer_2"
                                        className="form-select"
                                        onChange={props.onChange}>

                                        {props.operadores.map((op) => (
                                            <option key={op.id} value={op.id}>{op.nombre}</option>
                                        ))}
                                        
                                    </select>

                                </div>

                                {/* SELECT PARA TRACTOR */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Tractor:</span>

                                    <input
                                        className='form-control'
                                        key="tractorDespacho"
                                        type="text"
                                        name="tractor"
                                        placeholder='Seleccione un operador'
                                        readOnly={true}
                                        defaultValue={props.tractores}
                                    />

                                </div>

                                {/* SELECT PARA CAJA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Caja:</span>

                                    <input
                                        className='form-control'
                                        key="cajaDespacho"
                                        type="text"
                                        name="cajas"
                                        readOnly={true}
                                        defaultValue={props.cajas}
                                    />

                                </div>

                                {/* FECHA SALIDA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Fecha Salida:</span>

                                    <input
                                        className='form-control'
                                        key="fecha_salidaDespacho"
                                        type="date"
                                        name="fecha_salida"
                                        placeholder="Ingrese fecha"
                                        onChange={props.onChange}
                                    />

                                </div>

                                {/* HORA SALIDA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Hora Salida:</span>

                                    <input
                                        className='form-control'
                                        key="hora_salidaDespacho"
                                        type="time"
                                        name="hora_salida"
                                        placeholder="Ingrese hora"
                                        onChange={props.onChange}
                                    />

                                </div>

                                {/* DOBLE OPERADOR ? */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Doble Operador ?:</span>

                                    <select
                                        name="dobleOp"
                                        className="form-select"
                                        onChange={props.onChange}>

                                        <option value="">Total Operadores</option>
                                        <option value="0">1 Operador</option>
                                        <option value="1">2 Operador</option>
                                        
                                    </select>

                                </div>

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button type="submit" className="btn btn-primary"><BiSave/> Guardar</button>

                        </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default ModalAsignarDespacho