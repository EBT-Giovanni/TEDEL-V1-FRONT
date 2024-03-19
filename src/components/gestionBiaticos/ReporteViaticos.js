import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import {RiFileExcel2Fill} from 'react-icons/ri';
import {AiOutlineCloudDownload} from 'react-icons/ai';

const ReporteViaticos = () => {

    const [token, setToken] = useState('');

    // ===============================================
    // LLAMAR FUNCIONES
    // ===============================================

    useEffect(() => {

      setToken(Cookies.get('jwtoken'));

    },[token])

    // ===============================================
    // BUSCAR VIATICOS PARA EL REPORTE
    // ===============================================

    const buscarViaticos = async () => {

      const config = {
  
        headers: {"access-token": token},

      };

      const response = await axios.post(`${baseURL}api/get/reporte/viaticos`, formValues, config);

      if(response.data.success === true && response.data.result !== "Sin resultados"){
        
        return response.data.result;

      }else{

        return [];

      }

    }

    // ===============================================
    // BUSCAR VIATICOS PARA EL REPORTE
    // ===============================================

    const buscarGastos = async () => {

      const config = {
  
        headers: {"access-token": token},

      };

      const response = await axios.post(`${baseURL}api/get/reporte/gastos/operador`, formValues, config);
      
      if(response.data.success === true && response.data.result !== "Sin resultados"){
        
        return response.data.result;

      }else{

        return [];

      }

    }

    // ===============================================
    // DATOS DEL FORMULARIO
    // ===============================================

    const [formValues, setFormValues] = useState({

      start: "",
      end: ""

    })

    // ===============================================
    // FUNCION PARA ACTUALIZAR FORMULARIO
    // ===============================================

    const handleChange = (event) => {

      const val = event.target.value;
      const name = event.target.name;

      setFormValues({ ...formValues, [name]: val });

    }

    // ===============================================
    // EXPORTAR EXCEL
    // ===============================================

    const excelExport = async () => {

      if(formValues.start !== '' && formValues.end !== ''){

        const viatocoos = await buscarViaticos();

        const gastoos = await buscarGastos();

        // Crear un objeto para almacenar los registros agrupados por orden

        const groupedData = {};

        // Agrupar viáticos por orden
        viatocoos.forEach((item) => {
          const { orden } = item;
          
          if (!groupedData[orden]) {
            groupedData[orden] = {
              viaticos: [],
              gastos: [],
            };
          }
          
          groupedData[orden].viaticos.push(item);
        });

        // Agrupar gastos por orden
        gastoos.forEach((item) => {
          const { orden } = item;
          if (!groupedData[orden]) {
            groupedData[orden] = {
              viaticos: [],
              gastos: [],
            };
          }
          groupedData[orden].gastos.push(item);
        });

        const wb = XLSX.utils.book_new();

        for (const key in groupedData) {
          if (groupedData.hasOwnProperty(key)) {
            const sheetData = groupedData[key];
            const ws = XLSX.utils.json_to_sheet(sheetData.viaticos.concat(sheetData.gastos));
            XLSX.utils.book_append_sheet(wb, ws, `Orden ${key}`);
          }
        }

        XLSX.writeFile(wb, 'reporteViaticos.xlsx');

        // const filename = 'reporteViaticos.xlsx';

        // const worksheet = XLSX.utils.json_to_sheet(groupedArray);
        // const workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(workbook, worksheet, 'Tabla de datos');
        // XLSX.writeFile(workbook, filename);

      }else{

        Swal.fire({
          icon: 'warning',
          title: 'Seleccione fechas para continuar!',
        })

      }

    }

    return (

        <React.Fragment>

          <button
              type='button'
              className='btn btn-success'
              data-bs-toggle="modal" 
              data-bs-target="#modalReporteViaticos"
          >
                  <RiFileExcel2Fill/> Descargar Reporte
          </button>


          <div className="modal fade" id="modalReporteViaticos" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Reporte de Viaticos</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                {/* CUERPO DEL MODAL */}
                <div className="modal-body">
                  
                  <div className='row'>

                    {/* FECHA INICIO */}

                    <div className='col-12 mb-3'>

                      <span className="badge text-bg-secondary mb-2">Fecha Inicio:</span>

                      <input
                          className='form-control'
                          type="date"
                          name="start"
                          onChange={handleChange}
                      />

                    </div>

                    {/* FECHA SALIDA */}

                    <div className='col-12 mb-3'>

                      <span className="badge text-bg-secondary mb-2">Fecha Final:</span>

                      <input
                          className='form-control'
                          type="date"
                          name="end"
                          onChange={handleChange}
                      />

                    </div>

                  </div>

                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={excelExport}
                  >
                    <AiOutlineCloudDownload/> Descargar Excel
                  </button>
                </div>
              </div>
            </div>
          </div>

        </React.Fragment>

    )

}

export default ReporteViaticos;