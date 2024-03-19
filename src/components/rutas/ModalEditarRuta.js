import React from 'react';
import {BiSave} from 'react-icons/bi';
import { baseURL } from '../../config/config';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import axios from 'axios';

const ModalEditarRuta = ({

    data, 
    change,
    clientes,
    cat_ruta,
    destinos,
    direccionDestino,
    direccionOrigen,
    moneda,
    imp_ex,
    activos,
    refresh

}) => {

    // ===============================================
    // SEGMENTO PARA SUBMIT EDITAR RUTA
    // ===============================================

    const urlEdit = baseURL + "api/ruta/actualizar";

    const handleSubmitEdit = (event) => {

        event.preventDefault();

        console.log(data)

        const token = Cookies.get('jwtoken');

        let validar = true;

        Object.entries(data).forEach(entry => {

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

            axios.put(urlEdit, data,{
  
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
          
                    document.getElementById("btnCerrarModalEditarRuta").click();
                    refresh();
          
                  })
          
                }
            
              })
              .catch(error => {
            
                console.log(error)
            
              })

        }

    };

    // ===============================================
    // MODAL PARA EDITAR RUTA
    // ===============================================

    return (

        <div className="modal fade" id="modalEditarRuta"  data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">

            <div className="modal-dialog modal-xl">

                <div className="modal-content">
                    
                <form onSubmit={handleSubmitEdit}>

                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Crear Ruta</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" id="btnCerrarModalEditarRuta" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        
                        <div className='row'>

                            {/* CLIENTE */}

                            <div className='col-6 mt-4'>

                                <span className="badge text-bg-secondary mb-2">Cliente:</span>

                                <select
                                    key="clienteRuta"
                                    id="clienteSelectRuta"
                                    name="rel_cliente"
                                    className="form-select"
                                    defaultValue={data["rel_cliente"]}
                                    onChange={change}>

                                    {clientes.map((op) => (
                                        <option key={op.id} value={op.id}>{op.nombre_comercial}</option>
                                    ))}
                                    
                                </select>

                            </div>

                            {/* TIPO RUTA */}

                            <div className='col-6 mt-4'>

                                <span className="badge text-bg-secondary mb-2">Tipo de Ruta:</span>

                                <select
                                    key="tipoRuta"
                                    id="rutaSelectEdit"
                                    name="rel_tipo_ruta"
                                    className="form-select"
                                    onChange={change}>

                                    {cat_ruta.map((op) => (
                                        <option key={op.id} value={op.id}>{op.tipo}</option>
                                    ))}
                                    
                                </select>

                            </div>

                            {/* Origen */}

                            <div className='col-6 mt-4'>

                                <span className="badge text-bg-secondary mb-2">Origen:</span>

                                <select
                                    key="origenRuta"
                                    id="origenSelectEdit"
                                    name="origen"
                                    className="form-select"
                                    onChange={change}>

                                    {destinos.map((op) => (
                                        <option key={op.id} value={op.id}>{op.ciudad}</option>
                                    ))}
                                    
                                </select>

                            </div>

                            {/* DIRECCION ORIGEN */}

                            <div className='col-6 mt-4'>

                                <span className="badge text-bg-secondary mb-2">Direccion de Origen:</span>

                                <select
                                    key="rel_direccion_origenRuta"
                                    id="direccionOrigenSelect"
                                    name="rel_direccion_origen"
                                    className="form-select"
                                    onChange={change}>

                                    {direccionOrigen.map((op) => (
                                        <option key={op.id} value={op.id}>{op.nombre}</option>
                                    ))}
                                    
                                </select>

                            </div>

                            {/* DESTINO */}

                            <div className='col-6 mt-4'>

                                <span className="badge text-bg-secondary mb-2">Destino:</span>

                                <select
                                    key="destinoRuta"
                                    id="destinoSelectEdit"
                                    name="destino"
                                    className="form-select"
                                    onChange={change}>

                                    {destinos.map((op) => (
                                        <option key={op.id} value={op.id}>{op.ciudad}</option>
                                    ))}
                                    
                                </select>

                            </div>

                            {/* DIRECCION DESTINO */}

                            <div className='col-6 mt-4'>

                                <span className="badge text-bg-secondary mb-2">Direccion de Destino:</span>

                                <select
                                    key="rel_direccion_destinoRuta"
                                    id="direccionDestinoSelect"
                                    name="rel_direccion_destino"
                                    className="form-select"
                                    onChange={change}>

                                    {direccionDestino.map((op) => (
                                        <option key={op.id} value={op.id}>{op.nombre}</option>
                                    ))}
                                    
                                </select>

                            </div>

                            {/* CLAVE */}

                            <div className='col-6 mt-4'>

                                <span className="badge text-bg-secondary mb-2">Clave:</span>

                                <input
                                    className='form-control'
                                    key="claveRuta"
                                    defaultValue={data["clave"]}
                                    type="text"
                                    name="clave"
                                    placeholder="Ingrese clave"
                                    autoComplete = "off"
                                    onChange={change}
                                />

                            </div>

                            {/* MONEDA */}

                            <div className='col-6 mt-4'>

                                <span className="badge text-bg-secondary mb-2">Moneda:</span>

                                <select
                                    key="monedaRuta"
                                    id="monedaSelectEditar"
                                    name="moneda"
                                    className="form-select"
                                    onChange={change}>

                                    {moneda.map((op) => (
                                        <option key={op.id} value={op.id}>{op.option}</option>
                                    ))}
                                    
                                </select>

                            </div>

                            {/* MONTO PISTA */}

                            <div className='col-6 mt-4'>

                                <span className="badge text-bg-secondary mb-2">Monto Pista:</span>

                                <input
                                    className='form-control'
                                    key="monto_pistasRuta"
                                    defaultValue={data["monto_pistas"]}
                                    type="number"
                                    step=".01"
                                    name="monto_pistas"
                                    placeholder="Ingrese monto de la pista"
                                    autoComplete = "off"
                                    onChange={change}
                                />

                            </div>

                            {/* TARIFA */}

                            <div className='col-6 mt-4'>

                                <span className="badge text-bg-secondary mb-2">Tarifa:</span>

                                <input
                                    className='form-control'
                                    key="tarifaRuta"
                                    defaultValue={data["tarifa"]}
                                    type="number"
                                    step=".01"
                                    name="tarifa"
                                    placeholder="Ingrese monto de la tarifa"
                                    autoComplete = "off"
                                    onChange={change}
                                />

                            </div>

                            {/* PLANTA */}

                            <div className='col-6 mt-4'>

                                <span className="badge text-bg-secondary mb-2">Planta:</span>

                                <input
                                    className='form-control'
                                    key="plantaRuta"
                                    defaultValue={data["planta"]}
                                    type="text"
                                    name="planta"
                                    placeholder="Ingrese planta"
                                    autoComplete = "off"
                                    onChange={change}
                                />

                            </div>

                            {/* KILOMETROS */}

                            <div className='col-6 mt-4'>

                                <span className="badge text-bg-secondary mb-2">Kilometros:</span>

                                <input
                                    className='form-control'
                                    key="kmRuta"
                                    defaultValue={data["km"]}
                                    type="number"
                                    step=".01"
                                    name="km"
                                    placeholder="Ingrese km"
                                    autoComplete = "off"
                                    onChange={change}
                                />

                            </div>

                            {/* GASERA */}

                            <div className='col-6 mt-4'>

                                <span className="badge text-bg-secondary mb-2">Gasera:</span>

                                <input
                                    className='form-control'
                                    key="gaseraRuta"
                                    defaultValue={data["gasera"]}
                                    type="text"
                                    name="gasera"
                                    placeholder="Ingrese gasera"
                                    autoComplete = "off"
                                    onChange={change}
                                />

                            </div>

                            {/* COSTO POR KM */}

                            <div className='col-6 mt-4'>

                                <span className="badge text-bg-secondary mb-2">Costo por Km:</span>

                                <input
                                    className='form-control'
                                    key="costo_x_kmRuta"
                                    defaultValue={data["costo_x_km"]}
                                    type="number"
                                    step=".01"
                                    name="costo_x_km"
                                    placeholder="Ingrese costo por km"
                                    autoComplete = "off"
                                    onChange={change}
                                />

                            </div>

                            {/* IMPORTACION / EXPORTACION */}

                            <div className='col-6 mt-4'>

                                <span className="badge text-bg-secondary mb-2">Condicion:</span>

                                <select
                                    key="imp_exRuta"
                                    id="imp_exRuta"
                                    name="imp_ex"
                                    className="form-select"
                                    onChange={change}>

                                    {imp_ex.map((op) => (
                                        <option key={op.id} value={op.id}>{op.estado}</option>
                                    ))}
                                    
                                </select>

                            </div>

                            {/* ESTADO */}

                            <div className='col-6 mt-4'>

                                <span className="badge text-bg-secondary mb-2">Estado:</span>

                                <select
                                    key="activaRuta"
                                    id="estadoSelectEdit"
                                    name="activa"
                                    className="form-select"
                                    onChange={change}>

                                    {activos.map((op) => (
                                        <option key={op.id} value={op.id}>{op.activo}</option>
                                    ))}
                                    
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

    )

}

export default ModalEditarRuta