import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../../config/config';
import Cookies from 'js-cookie';

const ConsultarOrden = ({idOrden = 0}) => {

    const [token, setToken] = useState('');

    // ===============================================
    // FUNCION PARA BUSCAR DATOS DE LA ORDEN
    // ===============================================

    const [data, setData] = useState([])

    const buscarOrden = async (id) => {

        const config = {
  
            headers: {"access-token": token},
    
        };

        const response = await axios.get(`${baseURL}api/orden/consulta/${id}`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setData(response.data.result[0]);console.log(response.data.result[0]);

        }

    }

    // ===============================================
    // LLAMAR A TODAS LAS FUNCIONES
    // ===============================================

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));

        // SI TENEMOS UN ID BUSCAMOS LA ORDEN

        if(idOrden !== 0){

            buscarOrden(idOrden);

        }

    },[idOrden])

    // ===============================================

    return (

        <div className="modal fade" id="modalDatosOrden" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog  modal-xl">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">ORDEN #{data.id}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className='row'>

                        {/* SUBIDA / BAJADA */}

                        <div className='col-6'>

                            <span className="badge text-bg-secondary mb-2">Subida / Bajada:</span>

                            <input
                                className='form-control'
                                type="text"
                                value={data["subida_bajada"]}
                                autoComplete = "off"
                                readOnly={true}
                            />

                        </div>

                        {/* CLIENTE */}

                        <div className='col-6'>

                            <span className="badge text-bg-secondary mb-2">Cliente:</span>

                            <input
                                className='form-control'
                                type="text"
                                value={data["nombre_comercial"]}
                                autoComplete = "off"
                                readOnly={true}
                            />

                        </div>

                        {/* RUTA */}

                        <div className='col-12 mt-2'>

                            <span className="badge text-bg-secondary mb-2">Ruta:</span>

                            <input
                                className='form-control'
                                type="text"
                                value={data["ruta"]}
                                autoComplete = "off"
                                readOnly={true}
                            />

                        </div>

                        {/* REFERENCIA */}

                        <div className='col-6 mt-2'>

                            <span className="badge text-bg-secondary mb-2">Referencia:</span>

                            <input
                                className='form-control'
                                type="text"
                                value={data["referencia"]}
                                autoComplete = "off"
                                readOnly={true}
                            />

                        </div>

                        {/* CAJA */}

                        <div className='col-6 mt-2'>

                            <span className="badge text-bg-secondary mb-2">Caja:</span>

                            <input
                                className='form-control'
                                type="text"
                                value={data["caja"]}
                                autoComplete = "off"
                                readOnly={true}
                            />

                        </div>

                        {/* ZONA ORIGEN */}

                        <div className='col-6 mt-2'>

                            <span className="badge text-bg-secondary mb-2">Zona Origen:</span>

                            <input
                                className='form-control'
                                type="text"
                                value={data["rel_zona_origen"]}
                                autoComplete = "off"
                                readOnly={true}
                            />

                        </div>

                        {/* ZONA DESTINO */}

                        <div className='col-6 mt-2'>

                            <span className="badge text-bg-secondary mb-2">Zona Destino:</span>

                            <input
                                className='form-control'
                                type="text"
                                value={data["rel_zona_destino"]}
                                autoComplete = "off"
                                readOnly={true}
                            />

                        </div>

                        {/* TEMPERATURA MINIMA */}

                        <div className='col-6 mt-2'>

                            <span className="badge text-bg-secondary mb-2">Temperatura Minima:</span>

                            <input
                                className='form-control'
                                type="text"
                                value={data["temperatura_1"]}
                                autoComplete = "off"
                                readOnly={true}
                            />
                        </div>

                        {/* TEMPERATURA MAXIMA */}

                        <div className='col-6 mt-2'>

                            <span className="badge text-bg-secondary mb-2">Temperatura Maxima:</span>

                            <input
                                className='form-control'
                                type="text"
                                value={data["temperatura_2"]}
                                autoComplete = "off"
                                readOnly={true}
                            />

                        </div>

                        {/* PESO */}

                        <div className='col-6 mt-2'>

                            <span className="badge text-bg-secondary mb-2">Peso:</span>

                            <input
                                className='form-control'
                                type="text"
                                value={data["peso"]}
                                autoComplete = "off"
                                readOnly={true}
                            />

                        </div>

                        {/* COMMODITY */}

                        <div className='col-6 mt-2'>

                            <span className="badge text-bg-secondary mb-2">Commodity:</span>

                            <input
                                className='form-control'
                                type="text"
                                value={data["commodity"]}
                                autoComplete = "off"
                                readOnly={true}
                            />

                        </div>

                        {/* PALLETS */}

                        <div className='col-6 mt-2'>

                            <span className="badge text-bg-secondary mb-2">Pallets:</span>

                            <input
                                className='form-control'
                                type="text"
                                value={data["pallets"]}
                                autoComplete = "off"
                                readOnly={true}
                            />

                        </div>

                        {/* CASES */}

                        <div className='col-6 mt-2'>

                            <span className="badge text-bg-secondary mb-2">Cases:</span>

                            <input
                                className='form-control'
                                type="text"
                                value={data["cases"]}
                                autoComplete = "off"
                                readOnly={true}
                            />

                        </div>

                        {/* FECHA RECOLECCION */}

                        <div className='col-6 mt-2'>

                            <span className="badge text-bg-secondary mb-2">Fecha Recoleccion:</span>

                            <input
                                className='form-control'
                                type="text"
                                value={data.length > 0 ? data["fecha_recoleccion"].split('T')[0] : null}
                                autoComplete = "off"
                                readOnly={true}
                            />

                        </div>

                        {/* HORA RECOLECCION */}

                        <div className='col-6 mt-2'>

                            <span className="badge text-bg-secondary mb-2">Hora Recoleccion:</span>

                            <input
                                className='form-control'
                                type="text"
                                value={data["hora_recoleccion"]}
                                autoComplete = "off"
                                readOnly={true}
                            />
                            
                        </div>

                        {/* FECHA ENTREGA */}

                        <div className='col-6 mt-2'>

                            <span className="badge text-bg-secondary mb-2">Fecha Entrega:</span>

                            <input
                                className='form-control'
                                type="text"
                                value={data.length > 0 ? data["fecha_entrega"].split('T')[0] : null}
                                autoComplete = "off"
                                readOnly={true}
                            />

                        </div>

                        {/* HORA ENTREGA */}

                        <div className='col-6 mt-2'>

                            <span className="badge text-bg-secondary mb-2">Hora Entrega:</span>

                            <input
                                className='form-control'
                                type="text"
                                value={data["hora_entrega"]}
                                autoComplete = "off"
                                readOnly={true}
                            />

                        </div>

                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>

    )

}

export default ConsultarOrden