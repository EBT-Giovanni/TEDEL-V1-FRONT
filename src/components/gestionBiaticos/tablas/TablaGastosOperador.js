import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { baseURL } from '../../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';

// ICONOS
import {HiOutlineDownload} from 'react-icons/hi';
import {BsFillBagCheckFill} from 'react-icons/bs';
import {TbHandStop} from 'react-icons/tb';
import {AiOutlineCheckCircle} from 'react-icons/ai'

// COMPONENTES
import Tabla from '../../Tabla';

const TablaGastosOperador = ({idOrden, estado, setFormValues, setTotalGastosAprobados, setGastosOperador, disable}) => {

    const [token, setToken] = useState('');

    // ===============================================
    // SEGMENTO PARA GASTOS DE OPERADOR
    // ===============================================

    const [data, setData] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));

        if(idOrden !== 0){

            buscarGastosOperador();

        }

    }, [idOrden, estado])

    // FUNCION PARA BUSCAR GASTOS

    const buscarGastosOperador = () => {

        axios.get(`${baseURL}api/get/gastos/operador/orden/${idOrden}`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success === true && result.data.result !== "Sin resultados")
            {

                setData(result.data.result);
                calcularTotalGastos(result.data.result)

            }else{

                setData([]);

            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })

    }

    // ===============================================
    // FUNCION PARA CALCULAR EL TOTAL DE LOS GASTOS
    // ===============================================

    const calcularTotalGastos = (registros) => {

        if(registros.length > 0){

            let totalAprobado = 0;

            let totalOperador = 0;

            // SUMA DEL TOTAL DE GASTOS APROBADOS

            for(let i=0; i < registros.length; i++){

                totalAprobado += registros[i]["monto_aprobado"];

            }

            for(let i=0; i < registros.length; i++){

                totalOperador += registros[i]["monto"];

            }
            
            setTotalGastosAprobados(totalAprobado);

            setGastosOperador(totalOperador);

        }else{

            setTotalGastosAprobados(0);

            setGastosOperador(0);

        }

    }

    // ===============================================
    // COLUMNAS PARA LA TABLA
    // ===============================================

    const columns = [

        {
            name: 'Descripcion',
            selector: row => row.descripcion,
            sortable: true
        },
        {
            name: 'Monto',
            selector: row => `$ ${row.monto}`,
            sortable: true
        },
        {
            name: 'Aprobado',
            sortable: true,
            cell: row => (

                row.comprobado  === 1 ?

                <div>
                    <AiOutlineCheckCircle/> ${row.monto_aprobado}
                </div>

                :

                <div>
                    <TbHandStop/> ${row.monto_aprobado}
                </div>

            )
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                <div className='input-group'>
                    <button className='btn btn-outline-info' onClick={() => handleDownload(row.ruta)}><HiOutlineDownload/></button>

                    <button 
                    className='btn btn-outline-primary' 
                    type="button"
                    data-bs-target="#modalValidarGasto" 
                    data-bs-toggle="modal"  disabled={disable}
                    onClick={()=>validarGasto(row.id)}>
                        <BsFillBagCheckFill/>
                    </button>

                </div>
            )
        }

    ];

    // ===============================================
    // SEGMENTO PARA VALIDAR GASTO
    // ===============================================

    const validarGasto = (id) => {
        
        axios.get(`${baseURL}api/get/gastos/operador/id/${id}`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success === true && result.data.result !== "Sin resultados")
            {

                let temp = result.data.result[0];console.log(temp)

                setFormValues(temp); 

            }else{

                setFormValues([]);

            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })

    }

    // ===============================================
    // SEGMENTO PARA DESCARGAR ARCHIVO
    // ===============================================

    const handleDownload = (ruta) => {

        let nombre = ruta.split("%");

        nombre = nombre[1];

        axios({
            url: `${baseURL}api/download/gasto/operador`,
            method: 'POST',
            headers: {
                "access-token": token
            } ,
            responseType: 'blob',
            data: {
                rutaArchivo: ruta
            }
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', nombre);
            document.body.appendChild(link);
            link.click();
        });

    }

    return (

        <div className='mt-3'>

            <Tabla columns={columns} data={data}/>

        </div>

    )

}

export default TablaGastosOperador