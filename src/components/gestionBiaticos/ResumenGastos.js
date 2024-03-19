import React, {useState, useEffect} from 'react';
import {FaHistory} from 'react-icons/fa';

const ResumenGastos = ({viaticos, gastosAprobados, gastosOperador}) => {

    // CALCULAMOS LOS VIATICOS

    const [adeudo, setAdeudo] = useState(0);

    useEffect(()=> {

        let total = viaticos - gastosAprobados

        setAdeudo(total);

    },[viaticos, gastosAprobados])

    return (

        <div>

            <div className="accordion accordion-flush" id="accordionFlushExample">

                <div className="accordion-item">

                    <h2 className="accordion-header" id="flush-headingOne">

                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            <FaHistory/><span style={{marginLeft: "10px"}}>Resumen de gastos</span>
                        </button>

                    </h2>

                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">

                        <div className="accordion-body">

                            <div className='row text-center'>

                                <div className='col-6'>

                                    <p style={{fontSize: "30px"}}><b>Gastos Del Operador</b></p>

                                    <p style={{color: "red", fontSize: "25px"}}><b>${gastosOperador}</b></p>

                                </div>

                                <div className='col-6'>

                                    <p style={{fontSize: "30px"}}><b>Viaticos</b></p>

                                    <p style={{color: "red", fontSize: "25px"}}><b>${viaticos}</b></p>

                                </div>

                                <div className='col-6'>

                                    <p style={{fontSize: "30px"}}><b>Gastos Aprobados</b></p>

                                    <p style={{color: "red", fontSize: "25px"}}><b>${gastosAprobados}</b></p>

                                </div>

                                <div className='col-6'>

                                    <p style={{fontSize: "30px"}}><b>Adeudo</b></p>

                                    <p style={{color: "red", fontSize: "25px"}}><b>${adeudo}</b></p>

                                </div>

                            </div>
                        
                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default ResumenGastos