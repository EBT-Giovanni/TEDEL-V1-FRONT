import React, {useState, useEffect} from 'react'
import { BiSave } from 'react-icons/bi';
import Cookies from 'js-cookie';
import { baseURL } from '../../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';

const ModalTiemposDespacho = ({idDespacho, disable} ) => {

    const [token, setToken] = useState('');

    // ===============================================
    // USESTATE PARA FORMULARIO
    // ===============================================

    const [formData, setFormData] = useState({

        rel_despacho: "",
        fecha_inicio_transito: null,
        hora_inicio_transito: null,
        fecha_llegada_cliente: null,
        hora_llegada_cliente: null,
        fecha_carga_descarga: null,
        hora_carga_descarga: null

    })

    // ===============================================
    // URL PARA CREAR / EDITAR 
    // ===============================================

    const [urlDates, setUrlDates] = useState('');

    // ===============================================
    // VALIDAR SI EXISTE TIEMPOS DEL DESPACHO
    // ===============================================

    useEffect(()=>{

        setToken(Cookies.get('jwtoken'));

        // VALIDAMOS QUE EL ID DEL OPERADOR EXISTA

        if(idDespacho !== 0){

            handleDatosTiempo(idDespacho)

        }

    },[idDespacho]);

    // ===============================================
    // BUSCAR DATOS DE TIEMPO DE DESPACHO
    // ===============================================

    const [accion, setAccion] = useState('');

    const handleDatosTiempo = async (id) => {

        const config = {
            headers: {"access-token": token},
        };

        const response = await axios.get(`${baseURL}api/get/despacho/tiempos/${id}`, config);
        
        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setFormData(response.data.result[0]);

            setUrlDates(`${baseURL}api/update/despacho/tiempo`);

            setAccion('EDITAR');

        }else{

            setFormData({...formData, ["rel_despacho"]: id});

            setUrlDates(`${baseURL}api/create/despacho/tiempo`);

            setAccion('CREAR');

        }

    }

    // ===============================================
    // FUNCION ON CHANGE PARA USESTATE
    // ===============================================

    const handleChange = (event) => {

        const val = event.target.value;
        const name = event.target.name;

        setFormData({ ...formData, [name]: val });

    }

    // ===============================================
    // SUBMIT PARA CREAR DESPACHO
    // ===============================================

    const handleSubmit = (event) => {

        console.log(formData)

        event.preventDefault();

        accion === "CREAR" 
        ? crearRegistro() 
        : editarRegistro()

    }

    // CREAR REGISTRO

    const crearRegistro = () => {

        axios.post(urlDates, formData,{
  
            headers: {
                "access-token": token
            } 
    
        })
        .then(result => {
    
            if(result.data.success === true)
            {
        
                Swal.fire({
                    icon: 'success',
                    title: 'Se han agregado los datos!',
                }).then(() => {
        
                    window.location.reload(false);
        
                })
        
            }
    
        })
        .catch(error => {
    
            console.log(error)
    
        })

    }

    // EDITAR REGISTRO

    const editarRegistro = () => {

        let data = {...formData};

        if(data.fecha_inicio_transito !== null){

            data.fecha_inicio_transito = data.fecha_inicio_transito.split('T')[0];

        }
        if(data.fecha_carga_descarga !== null){

            data.fecha_carga_descarga = data.fecha_carga_descarga.split('T')[0];

        }
        if(data.fecha_llegada_cliente !== null){

            data.fecha_llegada_cliente = data.fecha_llegada_cliente.split('T')[0];

        }

        console.log(data);

        axios.put(urlDates, data,{
  
            headers: {
                "access-token": token
            } 
    
        })
        .then(result => {
    
            if(result.data.success === true)
            {
        
                Swal.fire({
                    icon: 'success',
                    title: 'Se han editado los datos!',
                }).then(() => {
        
                    window.location.reload(false);
        
                })
        
            }
    
        })
        .catch(error => {
    
            console.log(error)
    
        })

    }

    return (

        <div className="modal fade" id="modalTiemposDespacho" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Tiempos de Despacho</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            
                            <div className='row'>

                                {/* FECHA INICIO TRANSITO */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Fecha Inicio de Salida:</span>

                                    <input
                                        className='form-control'
                                        type="date"
                                        name="fecha_inicio_transito"
                                        placeholder="Ingrese fecha"
                                        defaultValue={formData["fecha_inicio_transito"] !== null ? formData["fecha_inicio_transito"].slice(0, 10) : null}
                                        onChange={handleChange}
                                    />

                                </div>

                                {/* HORA INICIO TRANSITO */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Hora Inicio de Salida:</span>

                                    <input
                                        className='form-control'
                                        type="time"
                                        name="hora_inicio_transito"
                                        placeholder="Ingrese fecha"
                                        defaultValue={formData["hora_inicio_transito"]}
                                        onChange={handleChange}
                                    />

                                </div>

                                {/* FECHA DE LLEGADA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Fecha Llegada:</span>

                                    <input
                                        className='form-control'
                                        type="date"
                                        name="fecha_llegada_cliente"
                                        placeholder="Ingrese fecha"
                                        defaultValue={formData["fecha_llegada_cliente"] !== null ? formData["fecha_llegada_cliente"].slice(0, 10) : null}
                                        onChange={handleChange}
                                    />

                                </div>

                                {/* HORA DE CARGA / DESCARGA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Hora Llegada:</span>

                                    <input
                                        className='form-control'
                                        type="time"
                                        name="hora_llegada_cliente"
                                        placeholder="Ingrese fecha"
                                        defaultValue={formData["hora_llegada_cliente"]}
                                        onChange={handleChange}
                                    />

                                </div>

                                {/* FECHA DE CARGA / DESCARGA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Fecha Carga / Descarga:</span>

                                    <input
                                        className='form-control'
                                        type="date"
                                        name="fecha_carga_descarga"
                                        placeholder="Ingrese fecha"
                                        defaultValue={formData["fecha_carga_descarga"] !== null ? formData["fecha_carga_descarga"].slice(0, 10) : null}
                                        onChange={handleChange}
                                    />

                                </div>

                                {/* HORA DE CARGA / DESCARGA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Hora Carga / Descarga:</span>

                                    <input
                                        className='form-control'
                                        type="time"
                                        name="hora_carga_descarga"
                                        placeholder="Ingrese fecha"
                                        defaultValue={formData["hora_carga_descarga"]}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>
                            
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-success" disabled={disable}><BiSave/> Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )

}

export default ModalTiemposDespacho