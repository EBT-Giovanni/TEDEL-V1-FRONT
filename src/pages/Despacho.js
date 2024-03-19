import React, { useState, useEffect } from 'react'
import {MdOutlineAddToPhotos} from 'react-icons/md';

//COMPONENTES
import Pendientes from '../components/despacho/Pendientes';
import Asigandos from '../components/despacho/Asigandos';
import Cerrados from '../components/despacho/Cerrados';
import ModalAsignarMv from '../components/despacho/modales/ModalAsignarMv';
import CrearMV from '../components/movimientosVacios/CrearMV';
import MvAsignados from '../components/movimientosVacios/MvAsignados';

const Despacho = () => {

    // ===============================================
    // SEGMENTO PARA ASIGNAR MV
    // ===============================================

    const [modalTitle, setModalTitle] = useState('')

    const [formValues, setFormValues] = useState({
        rel_orden_bajada: "",
        rel_ruta: "",
        estado: "1",
    });

    // ===============================================
    // FUNCION PARA ACTUALIZAR MODAL PARA CREAR MV
    // ===============================================

    const asignarMv = (id, nombre) => {

        setModalTitle(nombre)

        setFormValues({ ...formValues, ["rel_orden_bajada"]: id });

    }

    // ===============================================
    // SEGMENTO PARA ACTUALIZAR CREACION DE MV
    // ===============================================

    const handleChange = (event) => {

        const val = event.target.value;
        const name = event.target.name;

        setFormValues({ ...formValues, [name]: val });

    }

    // ===============================================

    return (

        <div>

            {/* MODAL PARA ESCOGER MV */}

            <ModalAsignarMv
                onClick={asignarMv}
            />

            <a className='btn btn-primary float-start' data-bs-toggle="modal" href="#modalMostrarMVSinAsignar" role="button"><MdOutlineAddToPhotos/> Movimiento Vacio</a>

            {/* MODAL PARA CREAR MV */}

            <CrearMV
                onChange={handleChange}
                data={formValues}
                modalTitle={modalTitle}
            />

            {/* TABS PARA DESPACHO */}

            <h3 className='mb-4 text-center'>Despachos</h3>

            <ul className="nav nav-tabs nav-justified" id="myTabDespacho" role="tablist">

                {/* TAB PARA PENDIENTES */}

                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#despachoPendientes" type="button" role="tab" aria-controls="home" aria-selected="true"><p className="h5">Pendientes</p></button>
                </li>

                {/* TAB PARA ASIGNADOS */}

                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#despachoAsignadas" type="button" role="tab" aria-controls="profile" aria-selected="false"><p className="h5">Asignados</p></button>
                </li>

                {/* TAB PARA CERRADAS */}

                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#despachoCerradas" type="button" role="tab" aria-controls="contact" aria-selected="false"><p className="h5">Cerradas</p></button>
                </li>

                {/* TAB PARA MOVIMIENTOS VACIOS */}

                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#despachoMV" type="button" role="tab" aria-controls="profile" aria-selected="false"><p className="h5">Movimientos Vacios</p></button>
                </li>

            </ul>

            <div className="tab-content" id="myTabContent">

                {/* TABLA PARA ORDENES POR DESPACHAR */}

                <div className="tab-pane fade show active" id="despachoPendientes" role="tabpanel" aria-labelledby="home-tab">

                    <Pendientes/>

                </div>

                {/* TABLA PARA DESPACHOS ASIGNADOS */}

                <div className="tab-pane fade" id="despachoAsignadas" role="tabpanel" aria-labelledby="profile-tab">

                    <div className='mt-4'>

                        <Asigandos/>

                    </div>

                </div>

                {/* TABLA PARA DESPACHOS CERRADOS */}

                <div className="tab-pane fade" id="despachoCerradas" role="tabpanel" aria-labelledby="contact-tab">

                    <div className='mt-4'>

                        <Cerrados/>

                    </div>

                </div>

                {/* TABLA PARA MV */}

                <div className="tab-pane fade" id="despachoMV" role="tabpanel" aria-labelledby="home-tab">

                    <MvAsignados/>

                </div>

            </div>
            
        </div>

    );

}

export default Despacho;
