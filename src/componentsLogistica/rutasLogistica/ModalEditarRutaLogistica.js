import React from 'react';
import { baseURL } from '../../config/config';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import axios from 'axios';
import {BiSave} from 'react-icons/bi';

const ModalEditarRutaLogistica = ({

        data, 
        change,
        clientes,
        destinos,
        refresh
    
    }) => {

    // ===============================================
    // SUBMIT PARA CREAR RUTA
    // ===============================================

    const urlCreate = baseURL + "api/rutaslogisticas/actualiza";

    const handleSubmit = (event) => {
        
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

            axios.put(urlCreate, data,{
  
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
            
                        document.getElementById("btnCerrarModalEditarRutaLogistica").click();
                        refresh();
                        //limpiarModal
            
                    })
            
                }
        
            })
            .catch(error => {
        
                console.log(error)
        
            })

        }

    }

    // ===============================================
    // MODAL PARA CREAR RUTA
    // ===============================================

    return (

        <div className="modal fade" id="modalEditarRutaLogistica"  data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">

            <div className="modal-dialog modal-xl">

                <div className="modal-content">
                    
                <form onSubmit={handleSubmit}>

                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Editar Ruta</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" id="btnCerrarModalEditarRutaLogistica" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        
                        <div className='row'>

                            {/* CLIENTE */}

                            <div className='col-6 mt-4'>

                                <span className="badge text-bg-secondary mb-2">Cliente:</span>

                                <select
                                    key="clienteRuta"
                                    name="rel_cliente"
                                    className="form-select"
                                    onChange={change}
                                    id="selectclienteRutaLogisticaEdit">
                                    

                                    {clientes.map((op) => (
                                        <option key={op.id} value={op.id}>{op.nombre_comercial}</option>
                                    ))}
                                    
                                </select>

                            </div>

                            {/* IMPORTACION / EXPORTACION */}

                            <div className='col-6 mt-4'>

                                <span className="badge text-bg-secondary mb-2">Imp / Exp:</span>

                                <select
                                    key="imp_exRuta"
                                    name="imp_ex"
                                    className="form-select"
                                    onChange={change}
                                    id="selectImpoExpoRutaLogisticaEdit">

                                    <option key='impoexpo' value="Seleccione la condicion"></option>
                                    <option key='Importacion' value="Importacion">Importacion</option>
                                    <option key='Exportacion' value="Exportacion">Exportacion</option>
                                    
                                </select>

                            </div>

                            {/* Origen */}

                            <div className='col-6 mt-4'>

                                <span className="badge text-bg-secondary mb-2">Origen:</span>

                                <select
                                    key="origenRuta"
                                    name="origen"
                                    className="form-select"
                                    onChange={change}
                                    id="selectOrigenRutaLogisticaEdit">

                                    {destinos.map((op) => (
                                        <option key={op.id} value={op.id}>{op.ciudad}</option>
                                    ))}
                                    
                                </select>

                            </div>

                            {/* DESTINO */}

                            <div className='col-6 mt-4'>

                                <span className="badge text-bg-secondary mb-2">Destino:</span>

                                <select
                                    key="destinoRuta"
                                    name="destino"
                                    className="form-select"
                                    onChange={change}
                                    id="selectDestinoRutaLogisticaEdit">

                                    {destinos.map((op) => (
                                        <option key={op.id} value={op.id}>{op.ciudad}</option>
                                    ))}
                                    
                                </select>

                            </div>

                            {/* CLAVE */}

                            <div className='col-6 mt-4'>

                                <span className="badge text-bg-secondary mb-2">Clave:</span>

                                <input
                                    className='form-control'
                                    key="claveRuta"
                                    type="text"
                                    name="clave"
                                    placeholder="Ingrese clave"
                                    autoComplete = "off"
                                    defaultValue={data.clave}
                                    onChange={change}
                                />

                            </div>

                            {/* PLANTA */}

                            <div className='col-6 mt-4'>

                                <span className="badge text-bg-secondary mb-2">Planta:</span>

                                <input
                                    className='form-control'
                                    key="plantaRuta"
                                    type="text"
                                    name="planta"
                                    placeholder="Ingrese planta"
                                    defaultValue={data.planta}
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
                                    type="number"
                                    step=".01"
                                    name="km"
                                    placeholder="Ingrese km"
                                    defaultValue={data.km}
                                    autoComplete = "off"
                                    onChange={change}
                                />

                            </div>

                            {/* ESTADO */}

                            <div className='col-6 mt-4'>

                                <span className="badge text-bg-secondary mb-2">Estado:</span>

                                <select
                                    key="activaRuta"
                                    name="activa"
                                    className="form-select"
                                    onChange={change}
                                    id="selectEstadoRutaLogisticaEdit">

                                    <option key="activos" value=''>Seleccione la condicion</option>
                                    <option key="1" value='1'>Activo</option>
                                    <option key="0" value='0'>Inactivo</option>
                                    
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

export default ModalEditarRutaLogistica
