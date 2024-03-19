import React from 'react'
import Tabla from '../../Tabla';
import {AiOutlineDownload} from 'react-icons/ai';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

const ModalHistorico = ({data}) => {

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

            const filename = 'HistoricoProforma.xlsx';

            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Tabla de datos');
            XLSX.writeFile(workbook, filename);

        }

    }

    // ===============================================
    // COLUMNAS PARA LA TABLA
    // ===============================================

    const columns = [

        {
            name: 'Num. Orden',
            selector: row => row.rel_orden,
            sortable: true,
        },
        {
            name: 'Cliente',
            selector: row => row.cliente,
            sortable: true
        },
        {
            name: 'Tractor',
            selector: row => row.tractor_no_economico,
            sortable: true,
        },
        {
            name: 'Chofer',
            selector: row => row.operador_nombre,
            sortable: true,
        },
        {
            name: 'Caja',
            selector: row => row.caja_numero,
            sortable: true,
        },

    ];

    return (

        <div>

            <div className="modal fade" id="modalHistoricoProforma"  aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog modal-xl">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">HISTORICO</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>

                        <div className="modal-body">

                            <Tabla columns = {columns} data = {data}/>

                        </div>

                        <div className="modal-footer">
                            <button className='btn btn-success' onClick={excelExport}><AiOutlineDownload/> Descargar Historico</button>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default ModalHistorico