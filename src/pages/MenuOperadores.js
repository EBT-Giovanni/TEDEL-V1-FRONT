import React, { Fragment } from 'react';
import {GiReceiveMoney} from 'react-icons/gi';
import {FaRoute} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MenuOperadores = () => {

    const navigate = useNavigate();

    const handleCardClick = (url) => {
        navigate(url);
    };

    return (

        <React.Fragment>

            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-xs-12 mb-4">
                        <div className="card" onClick={() => handleCardClick('seguimiento_viaje_vista')}>
                            <div className="card-body text-center">
                                <FaRoute size={64} /> {/* Ícono grande */}
                                <h5 className="card-title mt-3">Seguimiento de Viaje</h5> {/* Título */}
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <div className="card" onClick={() => handleCardClick('viaticos_vista')}>
                            <div className="card-body text-center">
                                <GiReceiveMoney size={64} /> {/* Ícono grande */}
                                <h5 className="card-title mt-3">Viaticos</h5> {/* Título */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>

    )

}

export default MenuOperadores