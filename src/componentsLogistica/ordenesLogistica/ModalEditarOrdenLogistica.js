import React from 'react';
import {BiSave} from 'react-icons/bi';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import TablaMcleod from './TablaMcleod';

const ModalEditarOrdenLogistica = (props) => {

    // ===============================================
    // SEGMENTO PARA SUBMIT EDITAR ORDEN
    // ===============================================

    const urlEdit = baseURL + "api/update/orden/logistica";

    const handleSubmit = (event) => {

        event.preventDefault();

        console.log(props.data)

        const token = Cookies.get('jwtoken');

        let validar = true;

        Object.entries(props.data).forEach(entry => {

            const [key,value] = entry;
    
            if(value === "" || value === null){
              
                if(key !== 'orden_mcleod'){

                    Swal.fire({
                        icon: 'warning',
                        title: 'No pueden ir campos vacios!',
                    })
    
                    validar = false;
        
                    return;

                }
    
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
            
                        props.refresh();
                        document.getElementById("btnEditarCerrarModalCrearOrdenL").click();
            
                    })
            
                }
        
            })
            .catch(error => {
        
                console.log(error)
        
            })

        }

    };

    return (

        <div>

            <div className="modal fade" id="modalEditarOrdenLogistica"  aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog modal-xl">

                    <div className="modal-content">

                        <form onSubmit={handleSubmit}>

                            <div className="modal-header">

                                <h5 className="modal-title" id="exampleModalLabel">Editar Orden</h5>

                                <button type="button" className="btn-close" id="btnEditarCerrarModalCrearOrdenL" data-bs-dismiss="modal" aria-label="Close"></button>

                            </div>

                            <div className="modal-body">

                                <div className='row'>

                                    <div className='col-7'>

                                        <div className='row'>

                                            {/* SIMPORTACION / EXPORTACION */}

                                            <div className='col-6 mt-4'>

                                            <span className="badge text-bg-secondary mb-2">Importacion / Exportacion:</span>

                                            <select
                                                key="subida_bajadaOrden"
                                                name="impo_expoL"
                                                className="form-select"
                                                id="impoExpoEditOrden"
                                                onChange={props.onChange}>

                                                <option value="">Seleccione una opcion</option>
                                                <option value="Exportacion">Exportacion</option>
                                                <option value="Importacion">Importacion</option>
                                                
                                            </select>

                                            </div>

                                            {/* CLIENTE */}

                                            <div className='col-6 mt-4'>

                                            <span className="badge text-bg-secondary mb-2">Cliente:</span>

                                            <select
                                                key="clienteOrden"
                                                name="rel_cliente"
                                                className="form-select"
                                                id="clienteOrdenLEdit"
                                                onChange={props.onChange}>

                                                {props.clientes.map((op) => (
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
                                                id="rutaOrdenLEdit"
                                                onChange={props.onChange}>

                                                {props.rutas.map((op) => (
                                                    <option key={op.id} value={op.id}>{op.ruta_final}</option>
                                                ))}
                                                
                                            </select>

                                            </div>

                                            {/* PROVEEDOR */}

                                            <div className='col-6 mt-4'>

                                            <span className="badge text-bg-secondary mb-2">Proveedor:</span>

                                            <select
                                                key="rutaOrden"
                                                name="rel_proveedor"
                                                className="form-select"
                                                id="proveedorOrdenLEdit"
                                                onChange={props.onChange}>

                                                {props.proveedores.map((op) => (
                                                    <option key={op.id} value={op.id}>{op.nombre_comercial}</option>
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
                                                id="referenciaOrdenG"
                                                name="referencia"
                                                defaultValue={props.data["referencia"]}
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
                                                className="form-select"
                                                id="cajaOrdenLEdit"
                                                onChange={props.onChange}>

                                                {props.cajas.map((op) => (
                                                    <option key={op.id} value={op.id}>{op.numero}</option>
                                                ))}
                                                
                                            </select>

                                            </div>

                                            {/* MONEDA */}

                                            <div className='col-6 mt-4'>

                                            <span className="badge text-bg-secondary mb-2">Moneda:</span>

                                            <select
                                                key="smonedaOrden"
                                                name="moneda"
                                                className="form-select"
                                                id="monedaEditOrdenL"
                                                onChange={props.onChange}>

                                                <option value="">Seleccione una moneda</option>
                                                <option value="Peso">Peso</option>
                                                <option value="Dolar">Dolar</option>
                                                
                                            </select>

                                            </div>

                                            {/* TARIFA */}

                                            <div className='col-6 mt-4'>

                                            <span className="badge text-bg-secondary mb-2">Tarifa:</span>

                                            <input
                                                className='form-control'
                                                key="tarifaOrden"
                                                type="number"
                                                name="tarifa"
                                                id="tarifaOrdenL"
                                                defaultValue={props.data["tarifa"]}
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
                                                id="pesoOrdenL"
                                                placeholder="Ingrese peso en Kilogramos"
                                                autoComplete = "off"
                                                defaultValue={props.data["peso"]}
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
                                                id="comodityOrdenL"
                                                defaultValue={props.data["commodity"]}
                                                name="commodity"
                                                placeholder="Ingrese commodity"
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
                                                defaultValue={props.data["temperatura_1"]}
                                                id="temp1OrdenL"
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
                                                key="temp2Orden"
                                                type="number"
                                                id="temp2OrdenL"
                                                defaultValue={props.data["temperatura_2"]}
                                                name="temperatura_2"
                                                placeholder="Ingrese temperatura en °F"
                                                autoComplete = "off"
                                                step=".01"
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
                                                id="fechaROrdenL"
                                                defaultValue={props.data["fecha_recoleccion"]}
                                                name="fecha_recoleccion"
                                                onKeyDown={props.preventDates}
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
                                                defaultValue={props.data["hora_recoleccion"]}
                                                name="hora_recoleccion"
                                                id="horaROrdenL"
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
                                                onKeyDown={props.preventDates}
                                                defaultValue={props.data["fecha_entrega"]}
                                                id="fechaEOrdenL"
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
                                                id="horaEOrdenL"
                                                defaultValue={props.data["hora_entrega"]}
                                                name="hora_entrega"
                                                placeholder="Ingrese hora"
                                                onChange={props.onChange}
                                            />

                                            </div>

                                            {/* FACTURA MICROZIP */}

                                            <div className='col-6 mt-4'>

                                            <span className="badge text-bg-secondary mb-2">Factura MicroZip:</span>

                                            <input
                                                className='form-control'
                                                type="text"
                                                id="facturaEditOrdenL"
                                                name="factura_microsip"
                                                defaultValue={props.data["factura_microsip"]}
                                                autoComplete = "off"
                                                onChange={props.onChange}

                                            />

                                            </div>

                                            {/* REFACTURA */}

                                            <div className='col-6 mt-4'>

                                            <span className="badge text-bg-secondary mb-2">Refactura:</span>

                                            <input
                                                className='form-control'
                                                type="text"
                                                name="refactura"
                                                defaultValue={props.data["refactura"]}
                                                autoComplete = "off"
                                                onChange={props.onChange}
                                            />

                                            </div>

                                            {/* BOL */}

                                            <div className='col-6 mt-4'>

                                            <span className="badge text-bg-secondary mb-2">BOL:</span>

                                            <input
                                                className='form-control'
                                                key="bolOrden"
                                                type="text"
                                                id="bolEditOrdenL"
                                                name="bol"
                                                defaultValue={props.data["bol"]}
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
                                                id="casesOrdenL"
                                                defaultValue={props.data["cases"]}
                                                name="cases"
                                                placeholder="Ingrese cases"
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
                                                placeholder="Ingrese pallets"
                                                id="palletsOrdenL"
                                                defaultValue={props.data["pallets"]}
                                                autoComplete = "off"
                                                onChange={props.onChange}
                                            />

                                            </div>







                                            {/* CRUCE IMPO EXPO */}

                                            <div className='col-6 mt-4'>

                                                <span className="badge text-bg-secondary mb-2">Tipo Cruce:</span>

                                                <select
                                                    name="cruce_impo_expo"
                                                    className="form-select"
                                                    id="editCruce_impo_expoSelectL"
                                                    onChange={props.onChange}>

                                                    <option value="">Seleccione una opcion</option>
                                                    <option value="N/A">Sin Cruce</option>
                                                    <option value="Importacion">Importacion</option>
                                                    <option value="Exportacion">Exportacion</option>
                                                    
                                                </select>

                                            </div>

                                            {/* CRUCE ORIGEN */}

                                            <div className='col-6 mt-4'>

                                                <span className="badge text-bg-secondary mb-2">Cruce Origen:</span>

                                                {console.log(props.data)}

                                                <input
                                                    className='form-control'
                                                    type="text"
                                                    defaultValue={props.data.cruce_origen}
                                                    name="cruce_origen"
                                                    id="editCruce_origenInputL"
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
                                                    defaultValue={props.data.cruce_destino}
                                                    name="cruce_destino"
                                                    id="editCruce_destinoInputL"
                                                    placeholder="Ingrese Origen del Cruce"
                                                    autoComplete = "off"
                                                    onChange={props.onChange}
                                                />

                                            </div>

                                            {/* CRUCE MONTO */}

                                            <div className='col-6 mt-4'>

                                                <span className="badge text-bg-secondary mb-2">Cruce Monto:</span>

                                                <input
                                                    className='form-control'
                                                    defaultValue={props.data.cruce_monto}
                                                    type="number"
                                                    name="cruce_monto"
                                                    id="editCruce_montoInputL"
                                                    placeholder="Ingrese monto del Cruce"
                                                    autoComplete = "off"
                                                    onChange={props.onChange}
                                                />

                                            </div>

                                        </div>

                                    </div>

                                    {/* ORDEN DE MCLEOD */}

                                    <div className='col-5'>

                                        <div className='row'>

                                            <div className='col-12 mt-4'>

                                                <span className="badge text-bg-secondary mb-2">Orden Mcleod:</span>

                                                <input
                                                    className='form-control'
                                                    readOnly={true}
                                                    type="text"
                                                    name="orden_mcleod"
                                                    placeholder="Seleccione Una Orden"
                                                    defaultValue={props.data['orden_mcleod']}
                                                    id="orden_mcleodL"
                                                />

                                            </div>

                                            <div className='col-12 mt-3'>

                                                <TablaMcleod handleSelect={props.onChangeMcleod}/>
                                                
                                            </div>

                                        </div>                                      

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

export default ModalEditarOrdenLogistica