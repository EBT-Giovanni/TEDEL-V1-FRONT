import React from 'react'
import {BiSave} from 'react-icons/bi';
import { baseURL } from '../../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

function CrearOrden(props) {

    // ===============================================
    // SEGMENTO PARA SUBMIT CREAR ORDEN
    // ===============================================

    const urlCreate = baseURL + "api/orden/crear";

    const handleSubmit = (event) => {

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
            
                        props.refresh();
                        document.getElementById("btnCerrarModalCrearOrden").click();
                        limpiarModal();
            
                    })
            
                }
        
            })
            .catch(error => {
        
                console.log(error)
        
            })

        }

    };

    // ===============================================
    // FUNCION PARA LIMPIAR MODAL
    // ===============================================

    const limpiarModal = () => {

        document.getElementById("selectSubidaBajadaCrearOrden").value = "";
        document.getElementById("mvCrearOrden").value = "0";
        document.getElementById("selectClientesCrearOrden").value = "";
        document.getElementById("selectRutaCrearOrden").value = "";
        document.getElementById("referenciaCrearOrden").value = "";
        document.getElementById("crearSelectCaja").value = "";
        document.getElementById("zonaOrigenCrearCaja").value = "";
        document.getElementById("zonaDestinoCrearOrden").value = "";
        document.getElementById("temperatura1CrearOrden").value = "";
        document.getElementById("temperatura2CrearOrden").value = "";
        document.getElementById("pesoCrearOrden").value = "";
        document.getElementById("commodityCrearOrden").value = "";
        document.getElementById("palletsCrearOrden").value = "";
        document.getElementById("casesCrearOrden").value = "";
        document.getElementById("fechaRecoleccionCrearOrden").value = "";
        document.getElementById("horaRecoleccionCrearOrden").value = "";
        document.getElementById("fechaEntregaCrearOrden").value = "";
        document.getElementById("horaEntregaCrearOrden").value = "";

    }

    // ===============================================
    // MODAL PARA CREAR ORDEN
    // ===============================================

    return (

        <div>

            <div className="modal fade" id="modalCrearOrden"  aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog modal-xl">

                    <div className="modal-content">

                        <form onSubmit={handleSubmit}>

                            <div className="modal-header">

                                <h5 className="modal-title" id="exampleModalLabel">Crear Orden</h5>

                                <button type="button" className="btn-close" data-bs-dismiss="modal" id="btnCerrarModalCrearOrden" aria-label="Close"></button>

                            </div>

                            <div className="modal-body">

                                <div className='row'>

                                    {/* SUBIDA / BAJADA */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Subida / Bajada:</span>

                                        <select
                                            key="subida_bajadaOrden"
                                            name="subida_bajada"
                                            className="form-select"
                                            id="selectSubidaBajadaCrearOrden"
                                            onChange={props.onChange}>

                                            <option value="">Seleccione una opcion</option>
                                            <option value="Subida">Subida</option>
                                            <option value="Bajada">Bajada</option>
                                            
                                        </select>

                                    </div>

                                    {/* MOVIMIENTO VACIO */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Movimiento Vacio:</span>

                                        <select
                                            key="subida_bajadaOrden"
                                            name="rel_mv"
                                            id="mvCrearOrden"
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
                                            name="rel_cliente"
                                            className="form-select"
                                            id="selectClientesCrearOrden"
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
                                            name="rel_ruta"
                                            className="form-select"
                                            id="selectRutaCrearOrden"
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
                                            name="referencia"
                                            placeholder="Ingrese numero de referencia"
                                            autoComplete = "off"
                                            id="referenciaCrearOrden"
                                            onChange={props.onChange}
                                        />

                                    </div>

                                    {/* CAJA */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Caja:</span>

                                        <select
                                            key="clienteOrden"
                                            id="crearSelectCaja"
                                            name="rel_caja"
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
                                            type="text"
                                            name="rel_zona_origen"
                                            id="zonaOrigenCrearCaja"
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
                                            type="text"
                                            name="rel_zona_destino"
                                            id="zonaDestinoCrearOrden"
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
                                            key="temp1Orden"
                                            type="number"
                                            name="temperatura_1"
                                            id="temperatura1CrearOrden"
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
                                            key="temp2Orden"
                                            type="number"
                                            name="temperatura_2"
                                            id="temperatura2CrearOrden"
                                            placeholder="Ingrese temperatura en °F"
                                            autoComplete = "off"
                                            step=".01"
                                            onChange={props.onChange}
                                        />

                                    </div>

                                    {/* PESO */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Peso (k):</span>

                                        <input
                                            className='form-control'
                                            key="pesoOrden"
                                            type="number"
                                            name="peso"
                                            id="pesoCrearOrden"
                                            placeholder="Ingrese peso en Kilogramos"
                                            defaultValue="20000"
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
                                            key="commodityOrden"
                                            type="text"
                                            name="commodity"
                                            id="commodityCrearOrden"
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
                                            key="palletsOrden"
                                            type="text"
                                            name="pallets"
                                            id="palletsCrearOrden"
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
                                            key="casesOrden"
                                            type="text"
                                            name="cases"
                                            id="casesCrearOrden"
                                            placeholder="Ingrese cases"
                                            autoComplete = "off"
                                            onChange={props.onChange}
                                        />

                                    </div>

                                    {/* FECHA RECOLECCION */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Fecha Cita:</span>

                                        <input
                                            className='form-control'
                                            key="fechaRecoleccionOrden"
                                            type="date"
                                            name="fecha_recoleccion"
                                            id="fechaRecoleccionCrearOrden"
                                            placeholder="Ingrese fecha"
                                            onChange={props.onChange}
                                        />

                                    </div>

                                    {/* HORA RECOLECCION */}

                                    <div className='col-6 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Hora Cita:</span>

                                        <input
                                            className='form-control'
                                            key="horaRecoleccionOrden"
                                            type="time"
                                            name="hora_recoleccion"
                                            id="horaRecoleccionCrearOrden"
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
                                            name="fecha_entrega"
                                            id="fechaEntregaCrearOrden"
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
                                            id="horaEntregaCrearOrden"
                                            name="hora_entrega"
                                            placeholder="Ingrese hora"
                                            onChange={props.onChange}
                                        />

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

export default CrearOrden