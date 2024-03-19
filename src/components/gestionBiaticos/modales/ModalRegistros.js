import { useState } from 'react';
import React from 'react'
import TablaGastosAsignados from '../tablas/TablaGastosAsignados'
import { RiAddCircleFill } from 'react-icons/ri';
import TablaGastosOperador from '../tablas/TablaGastosOperador';
import ResumenGastos from '../ResumenGastos';
import Cookies from 'js-cookie';

const ModalRegistros = ({

        idOrden, 
        operador, 
        estado, 
        setFormValues, 
        estadoGastos, 
        setFormValidar, 
        setBiaticos, 
        setTotalGastosAprobados,
        viaticos,
        gastosAprobados,
        setGastosOperador,
        totalGastosOperador,
        disable

    }) => {

    // ===============================================
    // LIMPIAR MODAL  
    // ===============================================

    const showModal = () => {

        document.getElementById("inputMontoGastoAsignado").value = "";
        document.getElementById("selectTipoGastoAsignado").value = "";

        setFormValues({

            rel_orden: idOrden,
            rel_user: Cookies.get('idUser'),
            tipo_gasto: "",
            monto: "",
            ruta: ""
    
        })

    }

    // ===============================================
    // MODAL 
    // ===============================================

    return (

        <div>

            <div className="modal fade" id="modalGestionarBiaticos" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog modal-xl modal-dialog-scrollable" style={{"width":"90%"}}>

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">Orden {idOrden} - {operador}</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>

                        <div className="modal-body">

                            <div className='row'>

                                {/* TABLA PARA VER GASTOS ASIGNADOS */}

                                <div className='col-6'>

                                    <div className='text-center h2'><span className='badge bg-success'>Gastos Asignados</span></div>

                                    <TablaGastosAsignados 
                                        idOrden={idOrden}
                                        estado={estado}
                                        setFormValues={setFormValues}
                                        setBiaticos={setBiaticos}
                                        disable={disable}
                                    />

                                </div>

                                {/* TABLA PARA VER GASTOS DEL OPERADOR */}

                                <div className='col-6'>

                                    <div className='text-center h2'><span className='badge bg-warning'>Gastos Del Operador</span></div>

                                    <TablaGastosOperador
                                        idOrden={idOrden}
                                        estado={estadoGastos}
                                        setFormValues={setFormValidar}
                                        setTotalGastosAprobados={setTotalGastosAprobados}
                                        setGastosOperador={setGastosOperador}
                                        disable={disable}
                                    />

                                </div>
                                            
                                {/* <Tabla columns = {columns} data = {data}/> */}

                            </div>

                            {/* SECCION PARA RESUMEN DE GASTOS */}
                            
                            <ResumenGastos
                                viaticos={viaticos}
                                gastosAprobados={gastosAprobados}
                                gastosOperador={totalGastosOperador}
                            />

                        </div>

                        <div className="modal-footer">

                            <button 
                            className="btn btn-primary" data-bs-target="#modalCrearGastoAsignado" 
                            data-bs-toggle="modal" 
                            data-bs-dismiss="modal"
                            onClick={showModal}><RiAddCircleFill/> 
                                Agregar Gasto
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default ModalRegistros