import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';

// ICONOS
import {BsPencil} from 'react-icons/bs';
import {RiDeleteBinFill} from 'react-icons/ri';
import {HiOutlineDownload} from 'react-icons/hi';

//COMPONENTES
import Tabla from '../../../components/Tabla';

// ========================================================

const TablaGastosAsignados = ({idOrden, estado, setFormValues, setBiaticos, disable}) => {

    const [token, setToken] = useState('');

    // ===============================================
    // SEGMENTO PARA GASTOS ASIGNADOS
    // ===============================================

    const [data, setData] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));

        if(idOrden !== 0){

            buscarGastosAsignados();

        }
    
    },[idOrden, estado]);

    // FUNCION PARA BUSCAR ORDENES

    const buscarGastosAsignados = () => {

        setToken(Cookies.get('jwtoken'));

        axios.get(`${baseURL}api/gastos/asignados/orden/${idOrden}`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success === true && result.data.result !== "Sin resultados")
            {

                setData(result.data.result);

                calcularBiaticos(result.data.result);

            }else{

                setData([]);

            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })

    }

    // ===============================================
    // FUNCION PARA CALCULAR EL TOTAL DE LOS BIATICOS
    // ===============================================

    const calcularBiaticos = (registros) => {

        if(registros.length > 0){

            let total = 0;

            for(let i=0; i < registros.length; i++){

                total += registros[i]["monto"];

            }
            
            setBiaticos(total);

        }

    }

    // ===============================================
    // COLUMNAS PARA LA TABLA
    // ===============================================

    const columns = [

        {
            name: 'Descripcion',
            selector: row => row.descripcion_gasto,
            sortable: true
        },
        {
            name: 'Monto',
            selector: row => `$ ${row.monto}`,
            sortable: true
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                
                <div className="input-group">

                    <button className='btn btn-outline-info' onClick={() => handleDownload(row.ruta)}><HiOutlineDownload/></button>

                    <button className="btn btn-outline-warning" type="button" data-bs-target="#modalEditarGastoAsignado" disabled={disable}data-bs-toggle="modal" onClick={() => handleEditGasto(row.id)}><BsPencil/></button>

                    <button className="btn btn-outline-danger" type="button" disabled={disable} onClick={() => handleDeleteGasto(row.id, row.descripcion_gasto, row.monto)}><RiDeleteBinFill/></button>
                    
                </div>
                
            ),
            width: "130px"
            
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

    // ===============================================
    // FUNCION PARA EDITAR GASTO ASIGNADO
    // ===============================================

    const handleEditGasto = (id) => {

        axios.get(`${baseURL}api/orden/gastos/asignados/id/${id}`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success === true && result.data.result !== "Sin resultados")
            {

                let temp = result.data.result[0];

                temp["fileActual"] = temp["ruta"];

                setFormValues(result.data.result[0]);

                document.getElementById("selectEditTipoGastoAsignado").value = temp["tipo_gasto"];
                document.getElementById("editMontoAsignado").value = temp["monto"];

            }else{

                setFormValues([]);

            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })

    }

    // ===============================================
    // FUNCION PARA BORRAR GASTO ASIGNADO
    // ===============================================

    const handleDeleteGasto = (idRegistro, descripcion, monto) => {

        Swal.fire({
            title: 'Estas seguro de borrar este gasto?',
            text: `${descripcion} - $ ${monto}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
            }).then((result) => {
    
                if(result.isConfirmed) {

                    axios.delete(`${baseURL}api/delete/gasto/asignado/${idRegistro}`,{
        
                        headers: {"access-token": token}
                    
                    })
                    .then(result => {
                  
                        if(result.data.success == true)
                        {
              
                          Swal.fire({
                            icon: 'success',
                            title: 'Se ha eliminado correctamente!',
                          })
                          .then(() => {
                  
                            buscarGastosAsignados();
                  
                          })
              
                        }
                  
                    })
                    .catch(error => {
                    
                        console.log(error)
                    
                    })
                    
                    
                }
    
            })

    }

    // ==============================================

    return (

        <div className='mt-3'>

            <Tabla columns = {columns} data = {data}/>

        </div>

    )

}

export default TablaGastosAsignados