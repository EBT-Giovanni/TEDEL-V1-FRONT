import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { baseURL } from '../../config/config';
import Swal from 'sweetalert2';
import { FaFileImage } from "react-icons/fa";
import Tabla from '../Tabla';
import { IoMdDownload } from "react-icons/io";

const ModalComprobanteViaticos = () => {

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
    // LLAMAR FUNCIONES
    // ===============================================

    useEffect(() => {

        buscarOperadores();

    },[]);

    // ===============================================
    // BUSCAR VIATICOS DEL OPERADOR
    // ===============================================

    const [comprobantes, setComprobantes] = useState([]);

    const buscarComprobantes = async (id) => {

        const url = `${baseURL}api/gastos/asignados/por/operador/${id}`;

        axios.get(url,{
  
            headers: {
                "access-token": Cookies.get('jwtoken')
            } 
    
        })
        .then(result => { 

            console.log(result)
    
            if(result.data.success === true  && result.data.result !== "Sin resultados")
            {
        
                setComprobantes(result.data.result);
        
            }
    
        })
        .catch(error => {
    
            console.log(error)
    
        })

    }

    // ===============================================
    // COLUMNAS PARA VIATICOS
    // ===============================================

    const columns = [

        {
            name: 'Orden',
            selector: row => row.rel_orden,
            sortable: true,
            width: "100px"
        },
        {
            name: 'Quien Asigno',
            selector: row => row.asigno,
            sortable: true
        },
        {
            name: 'Monto',
            selector: row => "$"+row.monto,
            sortable: true,
            width: "100px"
        },
        {
            name: 'Fecha',
            selector: row => row.timestamp.split('T')[0],
            sortable: true
        },
        {
            name: "",
            button: true,
            cell: (row) => (
              
                <div className="input-group">
                  <button className="btn btn-outline-info" type="button" onClick={() => handleDownload(row.ruta)}><IoMdDownload/></button>
                </div>
             
            ),
        },

    ];

    // ===============================================
    // SEGMENTO PARA DESCARGAR ARCHIVO
    // ===============================================

    const handleDownload = (ruta) => {

        let nombre = ruta.split("%");

        nombre = nombre[1];

        axios({
            url: `${baseURL}api/get/download/gasto/asignado`,
            method: 'POST',
            headers: {
                "access-token": Cookies.get('jwtoken')
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

    // ===============================================
    // HANDLE CHANGE
    // ===============================================

    const handleChange = (event) => {

        const val = event.target.value;

        buscarComprobantes(val);

    }

    return (

        <>

        <button
              type='button'
              className='btn btn-primary'
              data-bs-toggle="modal" 
              data-bs-target="#modalConsultarComprobantes"
            style={{marginLeft: '20px'}}
          >
                  <FaFileImage/> Consultar Comprobantes
        </button>

        <div className="modal fade" id="modalConsultarComprobantes" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Consultar Comprobantes</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className='row'>

                    {/* OPERADOR */}

                    <div className='col-12 mb-4'>

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

                    {/* TABLA */}

                    <div className='col-12'>

                        <Tabla columns={columns} data={comprobantes}/>

                    </div>

                    </div>
                </div>
                <div className="modal-footer">

                </div>
                </div>
            </div>
        </div>

        </>

    )

}

export default ModalComprobanteViaticos