import React, { useState } from 'react'
import {BiSave} from 'react-icons/bi';
import { baseURL } from '../../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

function EditarOrden(props) {

    // ===============================================
    // SEGMENTO PARA SUBMIT EDITAR ORDEN
    // ===============================================

    const urlEdit = baseURL + "api/orden/editar";

    const handleSubmitEdit = (event) => {

        event.preventDefault();

        console.log(props.data)

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
                    title: 'Se ha editado correctamente!',
                  }).then(() => {
          
                    window.location.reload(false);
          
                  })
          
                }
            
              })
              .catch(error => {
            
                console.log(error)
            
              })

        }

    };

    // ===============================================
    // MODAL PARA EDITAR ORDEN
    // ===============================================

    return (

        <div>

            <div className="modal fade" id="modalEditarOrden" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog modal-xl">

                    <div className="modal-content">

                        <form onSubmit={handleSubmitEdit}>

                            <div className="modal-header">

                                <h5 className="modal-title" id="exampleModalLabel">Editar Orden</h5>

                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                            </div>

                            <div className="modal-body">

                                <div className='row'>

                                    {/* NUMERO DE ORDEN */}
                                                                    
                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Num. Orden:</span>

                                        <input
                                            className='form-control'
                                            key="numReferenciaOrden"
                                            type="text"
                                            defaultValue={props.data["id"]}
                                            name="referencia"
                                            autoComplete = "off"
                                            readOnly={true}
                                            onChange={props.onChange}
                                        />

                                    </div>

                                    {/* SUBIDA / BAJADA */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Subida / Bajada:</span>

                                        <select
                                            key="subida_bajadaOrdenEdit"
                                            id="subidaBajadaSelect"
                                            name="subida_bajada"
                                            className="form-select"
                                            onChange={props.onChange}>

                                            <option value="">Seleccione una opcion</option>
                                            <option value="Subida">Subida</option>
                                            <option value="Bajada">Bajada</option>
                                            
                                        </select>

                                    </div>

                                    {/* MV ACTUAL */}
                                
                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Movimiento Vacio Asignado:</span>

                                        <input
                                            className='form-control'
                                            key="mvActualOrden"
                                            type="text"
                                            defaultValue={props.data["mv"]}
                                            name="na"
                                            autoComplete = "off"
                                            readOnly={true}
                                        />

                                    </div>

                                    {/* CAMBIAR MOVIMIENTO VACIO */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Cambiar Movimiento Vacio:</span>

                                        <select
                                            key="subida_bajadaOrden"
                                            name="rel_mv"
                                            className="form-select"
                                            onChange={props.onChange}>

                                            {props.mv.map((op) => (
                                                <option key={op.id} value={op.id}>{op.movimiento} | {op.caja} | {op.tractor}</option>
                                            ))}
                                            
                                        </select>

                                    </div>

                                    {/* CLIENTE */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Cliente:</span>

                                        <select
                                            key="clienteOrden"
                                            id="selectClienteOrden"
                                            name="rel_cliente"
                                            className="form-select"
                                            onChange={props.onChange}>

                                            {props.cliente.map((op) => (
                                                <option key={op.id} value={op.id}>{op.nombre_comercial}</option>
                                            ))}
                                            
                                        </select>

                                    </div>

                                    {/* RUTA DE ORDEN */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Ruta:</span>

                                        <select
                                            key="rutaOrden"
                                            id="selectRutaOrden"
                                            name="rel_ruta"
                                            className="form-select"
                                            onChange={props.onChange}>

                                            {props.rutas.map((op) => (
                                                <option key={op.id} value={op.id}>{op.ruta}</option>
                                            ))}
                                            
                                        </select>

                                    </div>

                                    {/* REFERENCIA */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Num. Referencia:</span>

                                        <input
                                            className='form-control'
                                            key="numReferenciaOrden"
                                            type="text"
                                            defaultValue={props.data["referencia"]}
                                            name="referencia"
                                            placeholder="Ingrese numero de referencia"
                                            autoComplete = "off"
                                            onChange={props.onChange}
                                        />

                                    </div>

                                    {/* CAJA */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Caja:</span>

                                        <select
                                            key="clienteOrden"
                                            name="rel_caja"
                                            id="selectCajaEditOrden"
                                            className="form-select"
                                            onChange={props.onChange}>

                                            {props.cajas.map((op) => (
                                                <option key={op.id} value={op.id}>{op.numero}</option>
                                            ))}
                                            
                                        </select>

                                    </div>

                                    {/* ZONA ORIGEN */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Zona Origen:</span>

                                        <input
                                            className='form-control'
                                            key="zonaOrigenOrden"
                                            defaultValue={props.data["rel_zona_origen"]}
                                            type="text"
                                            name="rel_zona_origen"
                                            placeholder="Ingrese zona origen"
                                            autoComplete = "off"
                                            onChange={props.onChange}
                                        />

                                    </div>

                                    {/* ZONA DESTINO */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Zona Destino:</span>

                                        <input
                                            className='form-control'
                                            key="zonaDestinoOrden"
                                            defaultValue={props.data["rel_zona_destino"]}
                                            type="text"
                                            name="rel_zona_destino"
                                            placeholder="Ingrese zona origen"
                                            autoComplete = "off"
                                            onChange={props.onChange}
                                        />

                                    </div>

                                    {/* TEMPERATURA 1 */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Temperatura Minima:</span>

                                        <input
                                            className='form-control'
                                            key="temp1OrdenEdit"
                                            type="number"
                                            defaultValue={props.data["temperatura_1"]}
                                            name="temperatura_1"
                                            placeholder="Ingrese temperatura en °F"
                                            autoComplete = "off"
                                            step=".01"
                                            onChange={props.onChange}
                                        />

                                    </div>

                                    {/* TEMPERATURA 2 */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Temperatura Maxima:</span>

                                        <input
                                            className='form-control'
                                            key="temp2OrdenEdit"
                                            type="number"
                                            name="temperatura_2"
                                            defaultValue={props.data["temperatura_2"]}
                                            placeholder="Ingrese temperatura en °F"
                                            autoComplete = "off"
                                            step=".01"
                                            onChange={props.onChange}
                                        />

                                    </div>

                                    {/* PESO */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Peso(k):</span>

                                        <input
                                            className='form-control'
                                            key="pesoOrdeneDIT"
                                            type="number"
                                            name="peso"
                                            defaultValue={props.data["peso"]}
                                            placeholder="Ingrese peso en Kilogramos"
                                            autoComplete = "off"
                                            step=".01"
                                            onChange={props.onChange}
                                        />

                                    </div>

                                    {/* COMMODITY */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Commodity:</span>

                                        <input
                                            className='form-control'
                                            key="commodityOrdenEdit"
                                            type="text"
                                            name="commodity"
                                            defaultValue={props.data["commodity"]}
                                            placeholder="Ingrese commodity"
                                            autoComplete = "off"
                                            onChange={props.onChange}
                                        />

                                    </div>

                                    {/* PALLETS */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Pallets:</span>

                                        <input
                                            className='form-control'
                                            key="palletsOrdenEdit"
                                            type="text"
                                            name="pallets"
                                            defaultValue={props.data["pallets"]}
                                            placeholder="Ingrese pallets"
                                            autoComplete = "off"
                                            onChange={props.onChange}
                                        />

                                    </div>

                                    {/* CASES */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Cases:</span>

                                        <input
                                            className='form-control'
                                            key="casesOrdenEdit"
                                            type="text"
                                            name="cases"
                                            defaultValue={props.data["cases"]}
                                            placeholder="Ingrese cases"
                                            autoComplete = "off"
                                            onChange={props.onChange}
                                        />

                                    </div>

                                    {/* FECHA RECOLECCION */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Fecha Recoleccion:</span>

                                        <input
                                            className='form-control'
                                            key="fechaRecoleccionOrden"
                                            type="date"
                                            name="fecha_recoleccion"
                                            defaultValue={props.data["fecha_recoleccion"]}
                                            placeholder="Ingrese fecha"
                                            onChange={props.onChange}
                                        />

                                    </div>

                                    {/* HORA RECOLECCION */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Hora Recoleccion:</span>

                                        <input
                                            className='form-control'
                                            key="horaRecoleccionOrden"
                                            type="time"
                                            name="hora_recoleccion"
                                            defaultValue={props.data["hora_recoleccion"]}
                                            placeholder="Ingrese hora"
                                            onChange={props.onChange}
                                        />

                                    </div>

                                    {/* FECHA ENTREGA */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Fecha Entrega:</span>

                                        <input
                                            className='form-control'
                                            key="fechaEntregaOrden"
                                            type="date"
                                            defaultValue={props.data["fecha_entrega"]}
                                            name="fecha_entrega"
                                            placeholder="Ingrese fecha"
                                            onChange={props.onChange}
                                        />

                                    </div>

                                    {/* HORA ENTREGA */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Hora Entrega:</span>

                                        <input
                                            className='form-control'
                                            key="horaEntregaOrden"
                                            type="time"
                                            defaultValue={props.data["hora_entrega"]}
                                            name="hora_entrega"
                                            placeholder="Ingrese hora"
                                            onChange={props.onChange}
                                        />

                                    </div>










                                    {/* CRUCE IMPO EXPO */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Tipo Cruce:</span>

                                        <select
                                            name="cruce_impo_expo"
                                            className="form-select"
                                            id="editCruce_impo_expoSelect"
                                            onChange={props.onChange}>

                                            <option value="">Seleccione una opcion</option>
                                            <option value="N/A">Sin Cruce</option>
                                            <option value="Importacion">Importacion</option>
                                            <option value="Exportacion">Exportacion</option>
                                            
                                        </select>

                                    </div>

                                    {/* CRUCE MONTO */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Cruce Monto:</span>

                                        <input
                                            className='form-control'
                                            defaultValue={props.data["cruce_monto"]}
                                            type="number"
                                            name="cruce_monto"
                                            id="editCruce_montoInput"
                                            placeholder="Ingrese monto del Cruce"
                                            autoComplete = "off"
                                            onChange={props.onChange}
                                        />

                                    </div>

                                    {/* CRUCE ORIGEN */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Cruce Origen:</span>

                                        <input
                                            className='form-control'
                                            type="text"
                                            defaultValue={props.data["cruce_origen"]}
                                            name="cruce_origen"
                                            id="editCruce_origenInput"
                                            placeholder="Ingrese Origen del Cruce"
                                            autoComplete = "off"
                                            onChange={props.onChange}
                                        />

                                    </div>

                                    {/* CRUCE DESTINO */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Cruce Destino:</span>

                                        <input
                                            className='form-control'
                                            type="text"
                                            defaultValue={props.data["cruce_destino"]}
                                            name="cruce_destino"
                                            id="editCruce_destinoInput"
                                            placeholder="Ingrese Destino del Cruce"
                                            autoComplete = "off"
                                            onChange={props.onChange}
                                        />

                                    </div>

                                </div>

                            </div>

                            <div className="modal-footer">

                                <button type="submit" className="btn btn-primary" disabled={props.editable}><BiSave/> Guardar</button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default EditarOrden