import React from 'react'
import {PDFViewer} from '@react-pdf/renderer';
import {AiOutlineCloudDownload} from 'react-icons/ai';
import ProformaPDF from '../pdf/ProformaPDF';

const ModalViewPDF = ({data}) => {

    return (

        <div>

            <div className="modal fade" id="modalPDFProforma"  aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog modal-xl">

                    <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title" id="exampleModalLabel">CARTA INSTRUCCION</h5>

                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                    </div>

                    <div className="modal-body">

                        <PDFViewer style={{"width":"100%", "height":"400px"}}>
                            <ProformaPDF data={data}/>
                        </PDFViewer>

                    </div>

                    <div className="modal-footer">

                        <button type="button" className="btn btn-primary"><AiOutlineCloudDownload/>Descargar</button>

                    </div>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default ModalViewPDF