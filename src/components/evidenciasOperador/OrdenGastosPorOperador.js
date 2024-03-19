import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';
import {RiAddCircleFill} from 'react-icons/ri';
import ModalSubirEvidencia from './ModalSubirEvidencia';
import ModalSubirEvidenciasEntrega from './ModalSubirEvidenciasEntrega';

const OrdenGastosPorOperador = () => {

    const [token, setToken] = useState('');

    const [showAlert, setShowAlert] = useState(false);

    // ===============================================
    // FORMDATA PARA ENVIAR AL FORMULARIO
    // ===============================================

    const [formValues, setFormValues] = useState({

        rel_orden: "",
        rel_operador: "",
        tipo_gasto: "",
        monto: "0",
        ruta: ""
  
    })

    // ===============================================
    // DATOS DE EVIDENCIA DE ORDEN PARA ENVIAR AL FORMULARIO
    // ===============================================

    const [formValuesEvidencia, setFormValuesEvidencia] = useState({

        rel_orden: "",
        rel_user: "",
        nombre_archivo: "",
        ruta: ""
  
    })

    // ===============================================
    // BUSCAR ORDENES POR OPERADOR
    // ===============================================

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));

        const idUseer = Cookies.get('idUser');

        const fetch = async () => {

            const config = {
  
                headers: {"access-token": token},
        
            };

            const response = await axios.get(`${baseURL}api/orden/operador/${idUseer}`, config);

            if(response.data.success === true && response.data.result !== "Sin resultados"){

                const temp = response.data.result[0]; 

                setShowAlert(false);

                //GUARDAMOS EL ID DEL DESPACHO
                
                setFormValues({ ...formValues, rel_orden: temp.id, rel_operador: idUseer });

                setFormValuesEvidencia({ ...formValuesEvidencia, ["rel_orden"]: temp.id, ["rel_user"]: idUseer});

                buscarGastosAsignados(temp.id, temp.nombre_comercial);

            }else{

                setShowAlert(true)

            }

        }
        
        fetch();
    
    },[token]);

    // ===============================================
    // BUSCAR GASTOS ASIGNADOS DE LA ORDEN
    // ===============================================

    const buscarGastosAsignados = async (id, cliente) => {

        setToken(Cookies.get('jwtoken'));

        const config = {
  
            headers: {"access-token": token},
    
        };

        const response = await axios.get(`${baseURL}api/get/gastos/orden/${id}`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            const temp = response.data.result;

            // HACEMOS LA SUMA DE LOS GASTOS ASIGNADOS

            var suma = 0;

            for(let i=0; i < temp.length; i++){
    
                let item = temp[i];
    
                suma += item.monto
    
            }

            buscarGastosDelOperador(id, cliente, suma);

        }
        else{

            var suma = 0;

            buscarGastosDelOperador(id, cliente, suma);


        }

    }

    // ===============================================
    // BUSCAR GASTOS SUBIDOS POR EL OPERADOR 
    // ===============================================

    const buscarGastosDelOperador = async (id, cliente, biaticos) => {

        setToken(Cookies.get('jwtoken'));

        const config = {
  
            headers: {"access-token": token},
    
        };

        const response = await axios.get(`${baseURL}api/get/gastos/operador/orden/${id}`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            let gastos = response.data.result;

            // CALCULAMOS LA CANTIDAD DE GASTOS

            const adeudo = calcularAdeudoTotal(gastos, biaticos);

            dibujarTarjeta(id, cliente, gastos, biaticos, adeudo);

        }
        else{

            let gastos = [];

            let adeudo = 0;

            dibujarTarjeta(id, cliente, gastos, biaticos, adeudo);

        }

    }

    // FUNCION PARA CALCULAR EL TOTAL DE LOS GASTOS

    const calcularAdeudoTotal = (gastos, biaticos) => {

        var monto_aprobado = 0;

        // SUMAMOS LOS MONTOS APROBADOS

        for(let i=0; i < gastos.length; i++){

            let item = gastos[i];

            monto_aprobado += item.monto_aprobado;

        }

        // CALCULAMOS ADEUDO TOTAL

        const total = biaticos - monto_aprobado;

        return total;

    }

    // ===============================================
    // DIBUJAR TARJETA DE ORDEN
    // ===============================================

    const [tarjetas, setTarjetas] = useState([]);

    const dibujarTarjeta = (id, cliente, gastos, biaticos, adeudo) => {

        let ordenes = [];

        const elemento = (

            <div className='col-12 col-lg-3 mb-4' key={id}>

                <div className="card text-center">

                    <div className="card-body">

                        <h5 className="card-title">{cliente} - {id}</h5>

                        <span><b>Viaticos Asignados:</b> <span style={{color: "red"}}><b>${biaticos}</b></span></span>

                        <hr/>

                        <div className="card-text text-center">
                            <b>Gastos Registrados:</b> <br/>
                            <div className='mt-3' style={{ display: "flex", justifyContent: "center" }}>

                            <div className="accordion mb-3" id="accordionExample">

                                {
                                    gastos.map((item) => (

                                        <div className="accordion-item" key={item.id}>
                                            <h2 className="accordion-header" id="headingOne">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#xd"+item.id} aria-expanded="true" aria-controls={"#xd"+item.id}>
                                                {item.descripcion}
                                            </button>
                                            </h2>
                                            <div id={"xd"+item.id} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">

                                                <p>Monto del gasto: <b>${item.monto}</b></p>

                                                <p>Monto Aprobado: <b>${item.monto_aprobado}</b></p>

                                                <p>Adeudo: <b>${item.adeudo}</b></p>

                                                {/* VALIDAMOS SI VA A MOSTRAR EL COMENTARIO */}

                                                {

                                                    item.comentario === "N/A"

                                                    ?

                                                    null

                                                    :

                                                    <>

                                                    <hr/>

                                                    <p><b>Comentario:</b></p>

                                                    <p className="text-muted">{item.comentario}</p>

                                                    </>

                                                }

                                                {/* VALIDAMOS SI MOSTRARA EL BOTON PARA BORRAR EL GASTO */}

                                                {

                                                    item.comprobado === 0

                                                    ?

                                                    <button className='btn btn-danger' onClick={()=>handleDelete(item.id, item.ruta)}>Borrar Gasto</button>

                                                    :

                                                    null

                                                }

                                                

                                            </div>
                                            </div>
                                        </div>

                                    ))
                                }

                            </div>

                            </div>
                        </div>

                        <span><b>Por Comprobar:</b> <span style={{color: "red"}}><b>${adeudo}</b></span></span>

                        <button 
                            type="button" 
                            className="btn btn-primary mt-2"
                            data-bs-toggle="modal" 
                            data-bs-target="#modalSubirEvidenciaOrden2"
                        >
                            <RiAddCircleFill/> Agregar Gasto
                        </button>

                        <button 
                            id="btnCrearEvidenciaOrden"
                            type="button" 
                            style={{display: "none"}}
                        >
                        </button>

                        <button 
                            type="button" 
                            className="btn btn-success mt-2"
                            data-bs-toggle="modal" 
                            data-bs-target="#modalSubirOrdenEntrega"
                        >
                            <RiAddCircleFill/> Agregar Evidencia
                        </button>

                    </div>

                </div>

            </div>

        )

        ordenes.push(elemento); 

        setTarjetas(ordenes)

    }

    // ===============================================
    // FUNCION HANDLE CHANGES
    // ===============================================

    const handleChange = (event) => {

        const val = event.target.value;
        const name = event.target.name;

        setFormValues({ ...formValues, [name]: val });

    }
  
    const handleChangeImg = (event) => {

        setFormValues({ ...formValues, ["ruta"]: event.target.files[0]})

    }

    // ===============================================
    // FUNCION HANDLE CHANGES PARA EVIDENCIAS
    // ===============================================

    const handleChangeEvidencias = (event) => {

        const val = event.target.value;
        const name = event.target.name;

        setFormValuesEvidencia({ ...formValuesEvidencia, [name]: val });

    }
  
    const handleChangeImgEvidencias = (event) => {

        setFormValuesEvidencia({ ...formValuesEvidencia, ["ruta"]: event.target.files[0]})

    }
    
    // ===============================================
    // FUNCION ELIMINAR EVIDENCIA
    // ===============================================

    const handleDelete = (id, path) => {

        Swal.fire({
            title: 'Estas seguro de borrar este registro?',
            text: "Esta accion no podra ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
            }).then((result) => {
    
                if(result.isConfirmed) {
    
                    const data = { path: path };
                    
                    fetch(`${baseURL}api/delete/gasto/operador/${id}`, {
                            
                        method: "DELETE", // or 'PUT'
                        headers: {
                            "Content-Type": "application/json",
                            "access-token": token
                        },
                        body: JSON.stringify(data),
    
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        
                        if(data.success === true){
    
                            
                            Swal.fire({
                            icon: 'success',
                            title: 'Se ha eliminado correctamente!',
                            })
                            .then(() => {
                    
                                window.location.reload(false);
                    
                            })
    
                        }
    
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
    
                }
    
            })

    }

    // ===============================================
    // RETURN
    // ===============================================

    return (

        <div>

            {/* SI NO HAY ORDENES MOSTRAMOS UN AVISO */}

            {
                showAlert 
                
                ? 

                <div className="alert alert-dark text-center" role="alert">
                    No tienes ordenes por el momento !
                </div>

                :

                null

            }

            {/* TARJETAS PARA MOSTRAR ORDENES */}

            <div className='row'>

                {tarjetas}

            </div>

            {/* MODAL PARA CREAR GASTOS DE OPERADOR */}

            <ModalSubirEvidencia
                data={formValues}
                change={handleChange}
                changeImg={handleChangeImg}
            />

            {/* MODAL PARA SUBIR EVIDENCIAS */}

            <ModalSubirEvidenciasEntrega
                data={formValuesEvidencia}
                change={handleChangeEvidencias}
                changeImg={handleChangeImgEvidencias}
            />

        </div>

    )

}

export default OrdenGastosPorOperador