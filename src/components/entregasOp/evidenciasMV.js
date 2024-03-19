import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';
import {AiFillDelete} from 'react-icons/ai';
import {RiAddCircleFill} from 'react-icons/ri';
import {FaRoad} from 'react-icons/fa';
import {FiUpload} from 'react-icons/fi';
import GastosMV from '../movimientosVacios/GastosMV';

const EvidenciasMV = (props) => {

    // ===============================================
    // SEGMENTO PARA MOSTRAR MOVIMIENTOS VACIOS POR OPERADOR
    // ===============================================

    const [formValues, setFormValues] = useState({

        rel_mov: props.id,
        rel_op: "",
        perfil: props.perfil,
        descripcion: "",
        monto: "0",
        ruta: ""

    })

    // ===============================================
    // ACTUALIZAR VALOR DEL ID DEL MOVIMIENTO
    // ===============================================

    useEffect(()=>{
        setFormValues({...formValues, ["rel_mov"]:props.id, ["perfil"]:props.perfil, ["rel_op"]:Cookies.get('idUser')})
    },[props.id])

    // ===============================================
    // SEGMENTO PARA CAMBIAR FORMDATA
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
    // MODAL PARA CREAR EVIDENCIA DE ORDEN
    // ===============================================

    return (

        <div>

            <GastosMV
                data={formValues}
                onChange={handleChange}
                onChangeImg={handleChangeImg}
            />
            
        </div>
        
    );

}

export default EvidenciasMV;
