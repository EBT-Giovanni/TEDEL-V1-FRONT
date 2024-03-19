import React, {useState, useEffect} from 'react'
import { BiSave } from 'react-icons/bi';
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';

const DatosNomina = ({idOperador}) => {

    const [token, setToken] = useState('');

    // ===============================================
    // USESTATE PARA FORMULARIO
    // ===============================================

    const [dataNomina, setDataNomina] = useState({

        rel_operador: "",
        rfc: "",
        curp: "",
        licencia: "",
        imss: "",
        monto_imss: "",
        pension_alimenticia: "",
        monto_isr: "",
        monto_infonavit: "",
        banco: "",
        cuenta_bancaria: "",
        clave_interbancaria: ""

    })

    // ===============================================
    // URL PARA CREAR / EDITAR INFO
    // ===============================================

    const [urlInfoNomina, setUrlInfoNomina] = useState('');

    // ===============================================
    // VALIDAR DATOS DE NOMINA DE OPERADOR
    // ===============================================

    useEffect(()=>{

        // VALIDAMOS QUE EL ID DEL OPERADOR EXISTA

        if(idOperador !== 0){

            handleNominaInfo(idOperador)

        }

    },[idOperador])

    // ===============================================
    // BUSCAR DATOS DE NOMINA DEL OPERADOR
    // ===============================================

    const [accion, setAccion] = useState('')

    const handleNominaInfo = async (idOperador) => {

        const config = {
            headers: {"access-token": token},
        };

        const response = await axios.get(`${baseURL}api/operador/datos/nomina/${idOperador}`, config);

        // SI HAY RESPUESTA CAPTURAMOS LOS DATOS Y MOSTRAMOS EL MODAL

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setDataNomina(response.data.result[0]);

            document.getElementById("selectBancoInfoNomina").value = response.data.result[0]["banco"];

            document.getElementById("btnCrearInfoNomina").click();

            // SI EXISTEN DATOS PASAMOS LA URL PARA EDITAR INFO

            setUrlInfoNomina(`${baseURL}api/update/datos/nomina`);

            setAccion('EDITAR');

        }else{

            setDataNomina({ ...dataNomina, ["rel_operador"]: idOperador });

            Swal.fire({
                title: 'Este operador no tiene informacion de Nomina',
                text: "¿ Desea agregarla ?",
                icon: 'question',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, agregar!'
              }).then((result) => {
                if (result.isConfirmed) {

                    // SI NO EXISTEN DATOS PASAMOS URL PARA CREAR REGISTRO

                    setUrlInfoNomina(`${baseURL}api/create/datos/nomina`);

                    setAccion('CREAR');
                    
                    document.getElementById("btnCrearInfoNomina").click();
          
                }
                
            })

        }

    }

    // ===============================================
    // LISTADO DE CAMIONES PARA EL SELECT DE OPERADOR
    // ===============================================

    const [bancos, setBancos] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/get/bancos`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success === true && result.data.result !== "Sin resultados")
            {

                let temp = result.data.result;

                temp.unshift({idBanco: "", nombreCorto: "Seleccione un banco"});

                setBancos(temp);

            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

    // ===============================================
    // FUNCION ON CHANGE PARA USESTATE
    // ===============================================

    const handleChange = (event) => {

        const val = event.target.value;
        const name = event.target.name;

        setDataNomina({ ...dataNomina, [name]: val });

    }

    // ===============================================
    // SUBMIT FORMULARIO
    // ===============================================

    const handleSubmit = (event) => {

        event.preventDefault();

        console.log(dataNomina);

        const token = Cookies.get('jwtoken');

        let validar = true;

        Object.entries(dataNomina).forEach(entry => {

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

            accion === "CREAR" 
            ? crearRegistro() 
            : editarRegistro()

        }

    }

    // CREAR REGISTRO

    const crearRegistro = () => {

        axios.post(urlInfoNomina, dataNomina,{
  
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

        axios.put(urlInfoNomina, dataNomina,{
  
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

    // ====================================================
    // MODAL PARA MOSTRAR / CREAR / EDITAR / INFO DE NOMINA
    // ====================================================

    return (

        <div>

            <div className="modal fade" id="modalCrearInfoNomina" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog modal-lg">

                    <div className="modal-content">

                    <form onSubmit={handleSubmit}>

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">Informacion de Nomina</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>

                        <div className="modal-body">

                            <div className='row'>

                                {/* RFC */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">RFC:</span>

                                    <input
                                        className='form-control'
                                        key="rfcOperador"
                                        type="text"
                                        name="rfc"
                                        maxLength="13"
                                        defaultValue={dataNomina["rfc"]}
                                        onChange={handleChange}
                                        placeholder='Ingrese RFC del Operador'
                                    />

                                </div>

                                {/* CURP */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Curp:</span>

                                    <input
                                        className='form-control'
                                        key="curpOperador"
                                        type="text"
                                        name="curp"
                                        maxLength="18"
                                        defaultValue={dataNomina["curp"]}
                                        onChange={handleChange}
                                        placeholder='Ingrese Curp del Operador'
                                    />

                                </div>

                                {/* IMSS */}

                                <div className='col-6  mb-3'>

                                    <span className="badge text-bg-secondary mb-2">IMSS:</span>

                                    <input
                                        className='form-control'
                                        key="imssOperador"
                                        type="text"
                                        name="imss"
                                        maxLength="11"
                                        defaultValue={dataNomina["imss"]}
                                        onChange={handleChange}
                                        placeholder='Ingrese IMSS del Operador'
                                    />

                                </div>

                                {/* MONTO IMSS */}

                                <div className='col-6  mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Monto IMSS:</span>

                                    <input
                                        className='form-control'
                                        key="monto_imssOperador"
                                        type="number"
                                        step=".01"
                                        name="monto_imss"
                                        defaultValue={dataNomina["monto_imss"]}
                                        onChange={handleChange}
                                        placeholder='Ingrese monto del IMSS'
                                    />

                                </div>

                                {/* LICENCIA */}

                                <div className='col-6  mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Licencia:</span>

                                    <input
                                        className='form-control'
                                        key="licenciaOperador"
                                        type="text"
                                        name="licencia"
                                        defaultValue={dataNomina["licencia"]}
                                        onChange={handleChange}
                                        placeholder='Ingrese Licencia del Operador'
                                    />

                                </div>

                                {/* BANCO */}

                                <div className='col-6  mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Banco:</span>

                                    <select
                                        key="bancoOperador"
                                        name="banco"
                                        id="selectBancoInfoNomina"
                                        className="form-select"
                                        onChange={handleChange}>

                                        {bancos.map((op) => (
                                            <option key={op.idBanco} value={op.idBanco}>{op.nombreCorto}</option>
                                        ))} 
                                        
                                    </select>

                                </div>

                                {/* CUENTA BANCARIA */}

                                <div className='col-6  mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Cuenta Bancaria:</span>

                                    <input
                                        className='form-control'
                                        key="cuenta_bancariaOperador"
                                        type="number"
                                        name="cuenta_bancaria"
                                        defaultValue={dataNomina["cuenta_bancaria"]}
                                        onChange={handleChange}
                                        placeholder='Ingrese Cuenta Bancaria'
                                    />

                                </div>

                                {/* CLAVE INTERBANCARIA */}

                                <div className='col-6  mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Clave Interbancaria:</span>

                                    <input
                                        className='form-control'
                                        key="clave_interbancariaOperador"
                                        type="number"
                                        name="clave_interbancaria"
                                        defaultValue={dataNomina["clave_interbancaria"]}
                                        onChange={handleChange}
                                        placeholder='Ingrese Clave Interbancaria'
                                    />

                                </div>

                                {/* MONTO ISR */}

                                <div className='col-6  mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Monto ISR:</span>

                                    <input
                                        className='form-control'
                                        key="monto_isrOperador"
                                        type="number"
                                        name="monto_isr"
                                        step="0.01"
                                        defaultValue={dataNomina["monto_isr"]}
                                        onChange={handleChange}
                                        placeholder='Ingrese Monto ISR'
                                    />

                                </div>

                                {/* MONTO INFONAVIT */}

                                <div className='col-6  mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Monto INFONAVIT:</span>

                                    <input
                                        className='form-control'
                                        key="monto_infonavitOperador"
                                        type="number"
                                        name="monto_infonavit"
                                        step="0.01"
                                        defaultValue={dataNomina["monto_infonavit"]}
                                        onChange={handleChange}
                                        placeholder='Ingrese Monto INFONAVIT'
                                    />

                                </div>

                                {/* PENSION ALIMENTICIA */}

                                <div className='col-6  mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Pension Alimenticia:</span>

                                    <input
                                        className='form-control'
                                        key="pension_alimenticiaOperador"
                                        type="number"
                                        name="pension_alimenticia"
                                        step="0.01"
                                        defaultValue={dataNomina["pension_alimenticia"]}
                                        onChange={handleChange}
                                        placeholder='Ingrese Pension Alimenticia'
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

            <button 
                id="btnCrearInfoNomina"
                type="button" 
                style={{display: "none"}}
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearInfoNomina">
            </button>

        </div>

    )

}

export default DatosNomina