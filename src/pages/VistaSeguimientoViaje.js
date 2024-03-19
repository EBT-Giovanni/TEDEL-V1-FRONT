import React, { useEffect, useState } from 'react';
import { baseURL } from '../config/config';
import Cookies from 'js-cookie';
import axios from 'axios';
import IniciarViaje from '../components/seguimientoViajes/IniciarViaje';
import LlegadaCita from '../components/seguimientoViajes/LlegadaCita';
import CargaDescarga from '../components/seguimientoViajes/CargaDescarga';

const VistaSeguimientoViaje = () => {

    const [progress, setProgress] = useState(100);

    const [status, setStatus] = useState('Asignado');

    const [alerta, setAlerta] = useState(false);

    const [token, setToken] = useState('');

    // ===============================================
    // BUSCAR ORDENES ASIGNADAS AL OPERADOR
    // ===============================================

    const [datosOrden, setDatosOrden] = useState({
        id: '',
        nombre_comercial: '',
        rel_tractor: '',
        rel_chofer_1: '',
        rel_caja: '',
        idDespacho: ''
      });

    const buscarOrdenes = async () => {

        const config = {
  
            headers: {"access-token": token},
    
        };

        const idOperador = Cookies.get('idUser');

        const response = await axios.get(`${baseURL}api/orden/operador/${idOperador}`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setDatosOrden(response.data.result[0]);

            setAlerta(false);

        }else{

            setAlerta(true);

        }

    }

    // ===============================================
    // USE EFFECT PARA BUSCAR INFO DE LAS ORDENES
    // ===============================================

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));

        buscarOrdenes()

    },[token]);

    // ===============================================
    // BUSCAR TIEMPOS DEL DESPACHO
    // ===============================================

    const [datosHorarios, setDatosHorarios] = useState({

        rel_despacho: "",
        fecha_inicio_transito: "",
        hora_inicio_transito: '',
        fecha_llegada_cliente: "",
        hora_llegada_cliente: '',
        fecha_carga_descarga: "",
        hora_carga_descarga: ''

    })

    const handleDatosTiempo = async (id) => {

        const config = {
            headers: {"access-token": token},
        };

        const response = await axios.get(`${baseURL}api/get/despacho/tiempos/${id}`, config);console.log(response.data)
        
        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setDatosHorarios(response.data.result[0]);
            let temp = response.data.result[0];

            if(temp.fecha_inicio_transito !== null){

                setProgress(33);
                setStatus('En camino');
                setOpcion('llegada');

            }
            if(temp.fecha_llegada_cliente !== null){

                setProgress(66);
                setStatus('Esperando  Carga / Descarga');
                setOpcion('finalizar');

            }
            if(temp.fecha_carga_descarga !== null){
    
                setProgress(100);
                setStatus('Finalizado');
                setOpcion('finalizar');

            }

        }else{

            setDatosHorarios({
                rel_despacho: id,
                fecha_inicio_transito: null,
                hora_inicio_transito: null,
                fecha_llegada_cliente: null,
                hora_llegada_cliente: null,
                fecha_carga_descarga: null,
                hora_carga_descarga: null
            })

            setProgress(0);
            setStatus('En espera');
            setOpcion('inicio');

        }

    }

    useEffect(() => {

        if(datosOrden.idDespacho !== ''){

            handleDatosTiempo(datosOrden.idDespacho);

        }

    },[datosOrden.idDespacho]);

    // ===============================================
    // CATALOGO DE COMPONENTES
    // ===============================================

    const views = {

        inicio: IniciarViaje,
        llegada: LlegadaCita,
        finalizar: CargaDescarga

    }

    // ===============================================
    // OPCION DE COMPONENTE 
    // ===============================================

    const [opcion, setOpcion] = useState('finalizar');

    // ===============================================
    // COMPONENTE DINAMICO
    // ===============================================

    const ComponenteActual = views[opcion];

    // ===============================================

    return (

        <div>

            {
                alerta ? (

                    <div className="alert alert-warning" role="alert">
                        <b>No tiene ordenes asigandas</b>
                    </div>

                )

                : (
                <>

                <p className='text-center h2'>Orden <b>{datosOrden.id}</b></p>

                <div className="progress">
                    <div className="progress-bar progress-bar-striped" role="progressbar" style={{"width": `${progress}%`}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                    </div>
                </div>

                <p className='text-center h5 mt-3'>Estatus: <b>{status}</b></p>

                <div className='row justify-content-center align-items-center mt-3'>

                    <ComponenteActual 
                        tiempos={datosHorarios}
                        idOrden={datosOrden.id}
                        refresh={handleDatosTiempo}
                    />

                </div>

                

                </>

                )
            }

        </div>

    )

}

export default VistaSeguimientoViaje