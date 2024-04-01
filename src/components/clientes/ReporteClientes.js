import React, { useState, useEffect } from 'react'
import {RiFileExcel2Fill} from 'react-icons/ri';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

const ReporteClientes = ({clientes}) => {

    const [data, setData] = useState([]);

    // ===============================================
    // EXPORTAR EXCEL
    // ===============================================

    const excelExport = () => {

        if(data.length === 0){

            Swal.fire({
                icon: 'warning',
                title: 'No hay registros!',
            })

        }else{

            const filename = 'reporteClientes.xlsx';

            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Tabla de datos');
            XLSX.writeFile(workbook, filename);

        }

    }

    useEffect(() => {

        setData(clientes)

    },[clientes]);

    return (

        <button 
            className='btn btn-success col-2'
            onClick={excelExport}
        >
            <RiFileExcel2Fill/> Descargar Excel
        </button>

    )

}

export default ReporteClientes