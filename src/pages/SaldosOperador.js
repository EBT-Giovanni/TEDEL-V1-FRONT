import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { baseURL } from '../config/config';
import Swal from 'sweetalert2';
import Tabla from '../components/Tabla';
import {BiSearchAlt} from 'react-icons/bi';

const SaldosOperador = () => {

    // ===============================================
    // BUSCAR OPERADORES
    // =============================================== 

    const [operadores, setOperadores] = useState([]);

    const buscarOperadores = async () => {

        const config = {
  
            headers: {"access-token": Cookies.get('jwtoken')},
    
        };

        const response = await axios.get(`${baseURL}api/operadores/activos`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            let temp = response.data.result;

            temp.unshift({id: "", nombre: "Seleccione un operador"});

            setOperadores(temp)

        }else{

            setOperadores([]);

        }

    }

    // ===============================================
    // ACTUALIZAR FORMULARIO
    // ===============================================

    const [formData, setFormData] = useState({

        start: '',
        end: '',
        idOperador: ''

    })

    const handleChange = (event) => {

        const val = event.target.value;
        const name = event.target.name;

        setFormData({ ...formData, [name]: val });

    }

    // ===============================================
    // VALIDAR DATOS
    // ===============================================

    const validarDatos = async () => {

        if(formData.start !== '' && formData.end !== '' && formData.idOperador !== ''){

            buscarViaticos();

            buscarGastos();

        }else{

            Swal.fire({
                title: 'Seleccione fechas validas y un operador para continuar',
                icon: 'warning',
            })

        }

    }

    // ===============================================
    // BUSCAR GASTOS DE OPERADOR
    // ===============================================

    const [gastos, setGastos] = useState([]);

    const buscarGastos = async () => {

        const url = `${baseURL}api/get/saldo/gastos/operador`;

        axios.post(url, formData,{
  
            headers: {
                "access-token": Cookies.get('jwtoken')
            } 
    
        })
        .then(result => { 
    
            if(result.data.success === true  && result.data.result !== "Sin resultados")
            {
        
                setGastos(result.data.result);
        
            }else{

                Swal.fire({
                    title: 'No hay registros Disponibles',
                    icon: 'warning',
                })

            }
    
        })
        .catch(error => {
    
            console.log(error)
    
        })

    }

    // ===============================================
    // COLUMNAS PARA VIATICOS
    // ===============================================

    const columnsGastos = [

        {
            name: 'Orden',
            selector: row => row.idOrden,
            sortable: true
        },
        {
            name: 'Concepto',
            selector: row => row.concepto,
            sortable: true
        },
        {
            name: 'Monto',
            selector: row => '$'+row.monto,
            sortable: true
        },
        {
            name: 'Monto Aprobado',
            selector: row => '$'+row.monto_aprobado,
            sortable: true
        },
        {
            name: 'Adeudo',
            selector: row => '$'+row.adeudo,
            sortable: true
        },
        {
            name: 'Fecha',
            selector: row => row.timestamp.split('T')[0],
            sortable: true
        },

    ];

    // ===============================================
    // BUSCAR VIATICOS DE OPERADOR
    // ===============================================

    const [viaticos, setViaticos] = useState([]);

    const buscarViaticos = async () => {

        const url = `${baseURL}api/get/saldo/viaticos/operador`;console.log(formData)

        axios.post(url, formData,{
  
            headers: {
                "access-token": Cookies.get('jwtoken')
            } 
    
        })
        .then(result => { 
    
            if(result.data.success === true  && result.data.result !== "Sin resultados")
            {
        
                setViaticos(result.data.result);
        
            }else{

                Swal.fire({
                    title: 'No hay registros Disponibles',
                    icon: 'warning',
                })

            }
    
        })
        .catch(error => {
    
            console.log(error)
    
        })

    }

    // ===============================================
    // COLUMNAS PARA VIATICOS
    // ===============================================

    const columnsViaticos = [

        {
            name: 'Orden',
            selector: row => row.idOrden,
            sortable: true
        },
        {
            name: 'Concepto',
            selector: row => row.concepto,
            sortable: true
        },
        {
            name: 'Monto',
            selector: row => row.monto,
            sortable: true
        },
        {
            name: 'Fecha',
            selector: row => row.timestamp.split('T')[0],
            sortable: true
        },

    ];

    // ===============================================
    // LLAMAR FUNCIONES
    // ===============================================

    useEffect(() => {

        buscarOperadores();

    },[]);

    // ===============================================
    // CALCULAR RESUMEN DE SALDOS
    // ===============================================

    const [resumen, setResumen] = useState({

        totalGastos: 0,
        totalViaticos: 0,
        gastosAprobados: 0,
        totalAdeudo: 0

    })

    // ===============================================
    // CALCULAR RESUMEN DE SALDOS
    // ===============================================

    useEffect(() => {

        if(viaticos.length > 0 && gastos.length > 0){

            let totalGastos = 0, totalViaticos = 0, gastosAprobados = 0, totalAdeudo = 0;

            // CALCULAMOS EL TOTAL DE VIATICOS

            viaticos.map((op) => {

                totalViaticos += op.monto;

            })

            // CALCULAMOS EL TOTAL DE GASTOS

            gastos.map((op) => {

                totalGastos += op.monto;
                gastosAprobados += op.monto_aprobado;
                totalAdeudo += op.adeudo;

            })

            totalAdeudo = totalGastos - totalViaticos;

            setResumen({

                totalGastos: totalGastos,
                totalViaticos: totalViaticos,
                gastosAprobados: gastosAprobados,
                totalAdeudo: totalAdeudo

            })

        }else{

            setResumen({

                totalGastos: 0,
                totalViaticos: 0,
                gastosAprobados: 0,
                totalAdeudo: 0

            })

        }

    },[viaticos, gastos])

    return (

        <div>

            <h3 className='mb-4'>Saldo Operadores</h3>

            <div className='row'>

                {/* OPERADOR */}

                <div className='col-4'>

                    <span className="badge text-bg-secondary mb-2">Operador:</span>

                    <select
                        name="idOperador"
                        className="form-select"
                        onChange={handleChange}>

                        {operadores.map((op) => (
                            <option key={op.id} value={op.id}>{op.nombre}</option>
                        ))}
                        
                    </select>

                </div>

                {/* FECHA INICIO */}

                <div className='col-3'>

                    <span className="badge text-bg-secondary mb-2">Fecha Inicio:</span>

                    <input
                        className='form-control'
                        type="date"
                        name="start"
                        onChange={handleChange}
                    />

                </div>

                {/* FECHA FINAL */}

                <div className='col-3'>

                    <span className="badge text-bg-secondary mb-2">Fecha Final:</span>

                    <input
                        className='form-control'
                        type="date"
                        name="end"
                        onChange={handleChange}
                    />

                </div>

                {/* BOTON PARA BUSCAR */}

                <div className='col-2 mt-4'>

                    <button 
                        className='btn btn-success'
                        onClick={validarDatos}
                    >
                        Buscar Saldos
                    </button>

                </div>

            </div>

            {/* RESUMEN DE SALDO */}

            <div className='row mt-5'>

                <div className="accordion" id="accordionExample">

                    <div className="accordion-item">

                        <h2 className="accordion-header" id="headingOne">

                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <BiSearchAlt/> Resumen Saldos
                        </button>

                        </h2>

                        <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">

                            {/* BODY DEL ACORDEON */}

                            <div className="accordion-body">
                                
                                <div className='row mb-3'>

                                    {/* GASTOS OPERADOR */}

                                    <div className='col-6'>

                                        <p className='h2 text-center'><b>Total Gastos Operador</b></p>

                                        <p className='h3 text-center'>
                                            ${resumen.totalGastos}
                                        </p>

                                    </div>

                                    {/* VIATICOS ASIGNADOS */}

                                    <div className='col-6'>

                                        <p className='h2 text-center'><b>Total Viaticos</b></p>

                                        <p className='h3 text-center'>
                                            ${resumen.totalViaticos}
                                        </p>

                                    </div>

                                </div>

                                <div className='row'>

                                    {/* GASTOS APROBADOS */}

                                    <div className='col-6'>

                                        <p className='h2 text-center'><b>Total Gastos Aprobados</b></p>

                                        <p className='h3 text-center'>
                                            ${resumen.gastosAprobados}
                                        </p>

                                    </div>

                                    {/* ADEUDO */}

                                    <div className='col-6'>

                                        <p className='h2 text-center'><b>Total Adeudo</b></p>

                                        <p 
                                            className='h3 text-center'
                                            style={{color: 'red'}}
                                        >
                                            -${resumen.totalAdeudo}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* TABLAS */}

            <div className='row mt-4'>

                {/* TABLA DE VIATICOS */}

                <div className='col-6'>

                    <p className='h1 text-center'>Viaticos</p>

                    <Tabla columns={columnsViaticos} data={viaticos} />

                </div>

                {/* TABLA DE GASTOS */}

                <div className='col-6'>

                    <p className='h1 text-center'>Gastos</p>

                    <Tabla columns={columnsGastos} data={gastos} />

                </div>

            </div>

        </div>
        
    )

}

export default SaldosOperador