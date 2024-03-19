import React, { useEffect, useState } from 'react';
import KmPorTractor from './graficas/KmPorTractor';
import TarifaPorTractor from './graficas/TarifaPorTractor';
import Cookies from 'js-cookie';
import axios from 'axios';
import { baseURL } from '../../config/config';

// ICONOS

import { FaMoneyBillWave } from 'react-icons/fa';
import { BsSpeedometer } from 'react-icons/bs'


const TarifaKmView = () => {

    // ===============================================
    // TRAER DATOS PARA DASHBOARD
    // ===============================================

    useEffect(() => {

        // OBTENEMOS EL TOKEN

        const token = Cookies.get('jwtoken');

        // OBTENEMOS LAS FECHAS PARA LA CONSULTA

        // Paso 1: Obtener la fecha actual
        const fechaActual = new Date();

        // Paso 2: Obtener el primer día del mes actual
        const primerDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);

        // Paso 3: Obtener el último día del mes actual
        const ultimoDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);

        // Formatear las fechas como cadenas en formato "YYYY-MM-DD"
        const start = primerDiaMes.toISOString().slice(0, 10);
        const end = ultimoDiaMes.toISOString().slice(0, 10);

        buscarTotalTarifa(start, end, token);

        buscarTotalkm(start, end, token);

        buscarTotalTractores(start, end, token);

    },[]);

    // ===============================================
    // FUNCION PARA BUSCAR TOTALES CON LOS INPUTS
    // ===============================================



    const handleChange = () => {

        const token = Cookies.get('jwtoken');

        const startVal = document.getElementById('fechaTotalTractoresStart').value;

        const endVal = document.getElementById('fechaTotalTractoresEnd').value;

        if(startVal !== '' && endVal !== ''){

            buscarTotalTractores(startVal, endVal, token);

        }

        

    }

    // ===============================================
    // FUNCION PARA TRAER TOTALES DE KM
    // ===============================================

    const [dataTractor, setDataTractor] = useState([]);

    const buscarTotalTractores = async (start, end, token) => {

        buscarTotalTarifa(start, end, token);

        buscarTotalkm(start, end, token);

        const config = {
  
            headers: {"access-token": token},
    
        };

        const data = {

            start: start,
            end: end

        }

        const response = await axios.post(`${baseURL}api/get/tarifa/km/tractor`, data, config);console.log(response)

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setDataTractor(response.data.result);

            separarDatosTractor(response.data.result);

        }

    }

    // ===============================================
    // FUNCION PARA SEPARAR KM Y TARIFA POR TRACTOR
    // ===============================================

    const [totalkmTractor, setTotalkmTractor] = useState([]);
    const [totalTarifaTractor, setTotalTarifaTractor] = useState([]);

    const separarDatosTractor = (data) => {

        let totalTarifa = [];
        let totalkm = [];

        for(let i=0; i < data.length; i++){

            // ARMAMOS EL JSON PARA TARIFA

            totalTarifa[i] = {

                "id": data[i]["tractor"],
                "value": data[i]["total"],

            }

            // ARMAMOS EL JSON PARA KM

            totalkm[i] = {

                "id": data[i]["tractor"],
                "value": Number(data[i]["km"]),

            }

        }



        setTotalTarifaTractor(totalTarifa);
        setTotalkmTractor(totalkm);

    }

    // ===============================================
    // FUNCION PARA TRAER TOTALES DE KM
    // ===============================================

    const [totalkm, setTotalkm] = useState(0);

    const buscarTotalkm = async (start, end, token) => {
        
        const config = {
  
            headers: {"access-token": token},
    
        };

        const data = {

            start: start,
            end: end

        }

        const response = await axios.post(`${baseURL}api/get/km/mes`, data, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setTotalkm(response.data.result[0]["km"])

        }

    }

    // ===============================================
    // FUNCION PARA TRAER TOTALES DE TARIFA
    // ===============================================

    const [totalTarifa, setTotalTarifa] = useState(0);

    const buscarTotalTarifa = async (start, end, token) => {

        const config = {
  
            headers: {"access-token": token},
    
        };

        const data = {

            start: start,
            end: end

        }

        const response = await axios.post(`${baseURL}api/get/tarifa/mes`, data, config);console.log(response)

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            //let total = ;

            let total = response.data.result[0]["total"];

            total = total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

            setTotalTarifa(total)

        }

    }

    return (

        <>

            {/* FECHA INICIAL */}

            <div className='col-6 mb-4'>
                <label 
                    htmlFor="fechaTotalTractoresStart" 
                    className="form-label"
                >
                    Fecha Inicial
                </label>
                <input 
                    type="date" 
                    className="form-control" 
                    id="fechaTotalTractoresStart" 
                    name="start" 
                    onChange={handleChange}
                />
            </div>

            {/* FECHA FINAL */}

            <div className='col-6 mb-4'>
                <label 
                    htmlFor="fechaTotalTractoresEnd" 
                    className="form-label" 
                >
                    Fecha Final
                </label>
                <input 
                    type="date" 
                    className="form-control" 
                    id="fechaTotalTractoresEnd" 
                    name="end"
                    onChange={handleChange}
                />
            </div>

            {/* RESUMEN TOTAL POR TARIFA */}

            <div className="col-4 text-center">

                <div className="card" style={{backgroundColor: "rgb(90, 194, 46)", color:"white"}}>
                    <div className="card-body">
                        <h4 className="card-title" ><FaMoneyBillWave/> Ingreso Total</h4>
                        <p className=' h1'>{totalTarifa}</p>
                    </div>
                </div>

            </div>

            {/* RESUMEN TOTAL POR KM */}

            <div className="col-4 text-center">

                <div className="card" style={{backgroundColor: "rgb(16, 128, 255)", color:"white"}}>
                    <div className="card-body">
                        <h4 className="card-title" ><BsSpeedometer/> Total Km</h4>
                        <p className=' h1'>{totalkm} km</p>
                    </div>
                </div>

            </div>

            {/* RESUMEN TOTAL POR KM MOVIMIENTOS VACIOS */}

            <div className="col-4 text-center">

                <div className="card" style={{backgroundColor: "rgb(255, 165, 0)", color:"white"}}>
                    <div className="card-body">
                        <h4 className="card-title" ><BsSpeedometer/> Total MV</h4>
                        <p className=' h1'>Pendiente</p>
                    </div>
                </div>

            </div>

            {/* RESUMEN POR TRACTOR */}

            <div className='col-12 mt-4 mb-4'>

                <div className="card" style={{maxHeight: "200px", overflowY: "auto"}}>
                    <ul className="list-group list-group-flush">
                        {
                            dataTractor.map((op) => (

                                <li className="list-group-item" key={op.tractor}>{op.tractor}: <b>Ingreso -</b> $ {op.total} | <b>Km</b> - {op.km} km</li>

                            ))
                        }
                    </ul>
                </div>

            </div>

            {/* GRAFICA TARIFA POR TRACTOR */}

            <div className='col-6' style={{height: "400px"}}>
                <div className='text-center h4'>$ Ingreso Por Tractor</div>
                <TarifaPorTractor data={totalTarifaTractor}/>
            </div>

            {/* GRAFICA KM POR TRACTOR */}

            <div className='col-6' style={{height: "400px"}}>
                <div className='text-center h4'>Km Por Tractor</div>
                <KmPorTractor data={totalkmTractor}/>
            </div>
        
        </>

    )

}

export default TarifaKmView