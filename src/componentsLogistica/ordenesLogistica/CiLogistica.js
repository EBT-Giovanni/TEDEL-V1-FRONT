import React, { useState, useEffect } from 'react'
import { Document, Page, Text, Image, StyleSheet, View  } from '@react-pdf/renderer';
import logoTedel from '../../img/tedellogo.png';
import Cookies from 'js-cookie';
import axios from 'axios';
import { baseURL } from '../../config/config';

// ===============================================
// SEGMENTO PARA MOSTRAR ARCHIVOS
// ===============================================

const styles = StyleSheet.create({

    //GENERAL

    container: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '10px',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    cell: {
        width: '30%',
        padding: '10px',
    },
    marginBotom: {
        borderBottom: '1px solid black',
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto"
    },
    
    //CABECERA

    textDireccion: {
        fontSize: 9
    },
    numOrden: {
        textAlign: 'center',
        color: "red",
        fontFamily: 'Helvetica-Bold',
    },
    ordenNo: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 15,
        textAlign: 'center',
        paddingTop: "10px"
    },

    //TITULO CABECERA

    headerTitle: {
        textAlign: 'center',
        fontFamily: 'Helvetica-Bold',
        fontSize: 17,
        padding: "10px"
    },

    //DATOS TEDEL

    cellTitle: {
        fontFamily: 'Helvetica-Bold',
        width: '15%',
        paddingBottom: "5px",
        paddingLeft: "10px"
    },
    cellInfo: {
        width: '35%',
        paddingLeft: '0px',
        paddingBottom: "5px",
        paddingLeft: "10px",
    },
    textInfo: {
        paddingLeft: "10px",
        fontSize: 12,
    },

    //DATOS ORDEN

    cellTitleOrden: {
        fontFamily: 'Helvetica-Bold',
        width: '17%',
        paddingBottom: "5px",
        paddingLeft: "10px"
    },
    cellInfoOrden: {
        width: '33%',
        paddingLeft: '0px',
        paddingBottom: "5px",
        paddingLeft: "10px",
    },

    //DATOS RECOLECCION

    cellTitleRe: {
        fontFamily: 'Helvetica-Bold',
        width: '15%',
        paddingBottom: "5px",
        paddingLeft: "10px"
    },
    cellInfoRe: {
        width: '35%',
        paddingLeft: '0px',
        paddingBottom: "5px",
        paddingLeft: "10px",
    },

    // FOOTER

    footer: {
        paddingTop: "20px",
        textAlign: 'center',
        fontSize: 10,
        color: 'grey'
    },
    footerText: {
        fontFamily: 'Helvetica'
    }

});

const CiLogistica = ({data}) => {

    //=======================================

    return (

        <Document>

            <Page>

                <View style={styles.container}>

                    {/* CABECERA */}

                    <View style={styles.row}>

                        <View style={styles.cell}>

                            <Text style={styles.textDireccion}>Tedel Trucking SA de CV</Text>
                            <Text style={styles.textDireccion}>Jesus Carranza #1227, Sector Centro, CP. 88000.</Text>
                            <Text style={styles.textDireccion}>Nuevo Laredo, Tamps. MX.</Text>
                            <Text style={styles.textDireccion}>8671377082</Text>

                        </View>

                        <View style={styles.cell}>

                            <Image src={logoTedel}/>

                        </View>

                        <View style={styles.cell}>

                            <Text style={styles.ordenNo}>Orden No.</Text>
                            <Text style={styles.numOrden}>{data["noOrden"]}</Text>

                        </View>

                    </View>

                    {/* ================================ */}

                    <View style={styles.marginBotom}></View>

                    {/* ================================ */}

                    {/* DATOS TEDEL */}

                    <View style={styles.row}>

                        <View style={{...styles.cellTitle, paddingTop: "10px"}}>

                            <Text style={styles.textInfo}>Carrier:</Text>

                        </View>

                        <View style={{...styles.cellInfo, paddingTop: "10px"}}>

                            <Text style={styles.textInfo}>
                                {data['proveedor']}
                            </Text>

                        </View>

                        <View style={{...styles.cellTitle, paddingTop: "10px"}}>

                            <Text style={styles.textInfo}>Contacto:</Text>

                        </View>

                        <View style={{...styles.cellInfo, paddingRight: '10px', paddingTop: "10px"}}>

                            <Text style={styles.textInfo}>Carlos Silva</Text>

                        </View>

                    </View>

                    {/* /////////////////////////////////////////////// */}

                    <View style={styles.row}>

                        <View style={{...styles.cellTitle, paddingBottom: "10px"}}>

                            <Text style={styles.textInfo}>Fecha:</Text>

                        </View>

                        <View style={{...styles.cellInfo, paddingBottom: "10px"}}>

                            <Text style={styles.textInfo}>{data["fechaActual"]}</Text>

                        </View>

                        <View style={{...styles.cellTitle, paddingBottom: "10px"}}>

                            <Text style={styles.textInfo}>Telefono:</Text>

                        </View>

                        <View style={{...styles.cellInfo, paddingRight: '10px', paddingBottom: "10px"}}>

                            <Text style={styles.textInfo}>956-606-2680</Text>

                        </View>

                    </View>

                    {/* ================================ */}
                    <View style={styles.marginBotom}></View>
                    {/* ================================ */}

                    {/* DATOS ORDEN */}

                    <View style={styles.headerTitle}>

                        <Text>Orden</Text>

                    </View>

                    {/* ================================ */}
                    <View style={styles.marginBotom}></View>
                    {/* ================================ */}

                    <View style={styles.row}>

                        <View style={{...styles.cellTitleOrden, paddingTop: "10px"}}>

                            <Text style={styles.textInfo}>No. Orden:</Text>

                        </View>

                        <View style={{...styles.cellInfoOrden, paddingTop: "10px"}}>

                            <Text style={styles.textInfo}>{data["noOrden"]}</Text>

                        </View>

                        <View style={{...styles.cellTitleOrden, paddingTop: "10px"}}>

                            <Text style={styles.textInfo}>Commodity:</Text>

                        </View>

                        <View style={{...styles.cellInfoOrden, paddingRight: '10px', paddingTop: "10px"}}>

                            <Text style={styles.textInfo}>{data["commodity"]}</Text>

                        </View>

                    </View>

                    {/* /////////////////////////////////////////////// */}

                    <View style={styles.row}>

                        <View style={styles.cellTitleOrden}>

                            <Text style={styles.textInfo}>KM:</Text>

                        </View>

                        <View style={styles.cellInfoOrden}>

                            <Text style={styles.textInfo}>{data["km"]} km</Text>

                        </View>

                        <View style={styles.cellTitleOrden}>

                            <Text style={styles.textInfo}>Peso:</Text>

                        </View>

                        <View style={{...styles.cellInfoOrden, paddingRight: '10px'}}>

                            <Text style={styles.textInfo}>{data["peso"]} k</Text>

                        </View>

                    </View>

                    {/* /////////////////////////////////////////////// */}

                    <View style={styles.row}>

                        <View style={styles.cellTitleOrden}>

                            <Text style={styles.textInfo}>Temp:</Text>

                        </View>

                        <View style={styles.cellInfoOrden}>

                            <Text style={styles.textInfo}>{data["temperatura"]}</Text>

                        </View>

                        <View style={styles.cellTitleOrden}>

                            <Text style={styles.textInfo}>Referencia:</Text>

                        </View>

                        <View style={{...styles.cellInfoOrden, paddingRight: '10px'}}>

                            <Text style={styles.textInfo}>{data["referencia"]}</Text>

                        </View>

                    </View>

                    {/* /////////////////////////////////////////////// */}

                    <View style={styles.row}>

                        <View style={styles.cellTitleOrden}>

                            <Text style={styles.textInfo}>BOL:</Text>

                        </View>

                        <View style={styles.cellInfoOrden}>

                            <Text style={styles.textInfo}>{data["bol"]}</Text>

                        </View>

                        <View style={styles.cellTitleOrden}>

                            <Text style={styles.textInfo}></Text>

                        </View>

                        <View style={{...styles.cellInfoOrden, paddingRight: '10px'}}>

                            <Text style={styles.textInfo}></Text>

                        </View>

                    </View>

                    {/* /////////////////////////////////////////////// */}

                    {/* ================================ */}
                    <View style={styles.marginBotom}></View>
                    {/* ================================ */}

                    {/* DATOS ORIGEN */}

                    <View style={styles.headerTitle}>

                        <Text>Recoleccion</Text>

                    </View>

                    {/* ================================ */}
                    <View style={styles.marginBotom}></View>
                    {/* ================================ */}

                    <View style={styles.row}>

                        <View style={{...styles.cellTitleRe, paddingTop: "10px"}}>

                            <Text style={styles.textInfo}>Nombre:</Text>

                        </View>

                        <View style={{...styles.cellInfoRe, paddingTop: "10px"}}>

                            <Text style={styles.textInfo}>{data["nombreRecoleccion"]}</Text>

                        </View>

                        <View style={{...styles.cellTitleRe, paddingTop: "10px"}}>

                            <Text style={styles.textInfo}>Direccion:</Text>

                        </View>

                        <View style={{...styles.cellInfoRe, paddingRight: '10px', paddingTop: "10px"}}>

                            <Text style={styles.textInfo}>{data["direccionRecoleccion"]}</Text>

                        </View>

                    </View>

                    {/* /////////////////////////////////////////////// */}

                    <View style={styles.row}>

                        <View style={{...styles.cellTitleRe, paddingBottom: "10px"}}>

                            <Text style={styles.textInfo}>Contacto:</Text>

                        </View>

                        <View style={{...styles.cellInfoRe, paddingBottom: "10px"}}>

                            <Text style={styles.textInfo}>{``}</Text>

                        </View>

                        <View style={{...styles.cellTitleRe, paddingBottom: "10px"}}>

                            <Text style={styles.textInfo}>Telefono:</Text>

                        </View>

                        <View style={{...styles.cellInfoRe, paddingRight: '10px', paddingBottom: "10px"}}>

                            <Text style={styles.textInfo}>{``}</Text>

                        </View>

                    </View>

                    {/* /////////////////////////////////////////////// */}

                    <View style={styles.row}>

                        <View style={{...styles.cellTitleRe, paddingBottom: "10px"}}>

                            <Text style={styles.textInfo}>Fecha:</Text>

                        </View>

                        <View style={{...styles.cellInfoRe, paddingBottom: "10px"}}>

                            <Text style={styles.textInfo}>{data["fechaRecoleccion"]}</Text>

                        </View>

                        <View style={{...styles.cellTitleRe, paddingBottom: "10px"}}>

                            <Text style={styles.textInfo}></Text>

                        </View>

                        <View style={{...styles.cellInfoRe, paddingRight: '10px', paddingBottom: "10px"}}>

                            <Text style={styles.textInfo}></Text>

                        </View>

                    </View>

                    {/* ================================ */}
                    <View style={styles.marginBotom}></View>
                    {/* ================================ */}

                    {/* DATOS ENTREGA */}

                    <View style={styles.headerTitle}>

                        <Text>Entrega</Text>

                    </View>

                    {/* ================================ */}
                    <View style={styles.marginBotom}></View>
                    {/* ================================ */}

                    <View style={styles.row}>

                        <View style={{...styles.cellTitleRe, paddingTop: "10px"}}>

                            <Text style={styles.textInfo}>Nombre:</Text>

                        </View>

                        <View style={{...styles.cellInfoRe, paddingTop: "10px"}}>

                            <Text style={styles.textInfo}>{data["nombreEntrega"]}</Text>

                        </View>

                        <View style={{...styles.cellTitleRe, paddingTop: "10px"}}>

                            <Text style={styles.textInfo}>Direccion:</Text>

                        </View>

                        <View style={{...styles.cellInfoRe, paddingRight: '10px', paddingTop: "10px"}}>

                            <Text style={styles.textInfo}>{data["direccionEntrega"]}</Text>

                        </View>

                    </View>

                    {/* /////////////////////////////////////////////// */}

                    <View style={styles.row}>

                        <View style={{...styles.cellTitleRe, paddingBottom: "10px"}}>

                            <Text style={styles.textInfo}>Contacto:</Text>

                        </View>

                        <View style={{...styles.cellInfoRe, paddingBottom: "10px"}}>

                            <Text style={styles.textInfo}>{``}</Text>

                        </View>

                        <View style={{...styles.cellTitleRe, paddingBottom: "10px"}}>

                            <Text style={styles.textInfo}>Telefono:</Text>

                        </View>

                        <View style={{...styles.cellInfoRe, paddingRight: '10px', paddingBottom: "10px"}}>

                            <Text style={styles.textInfo}>{``}</Text>

                        </View>

                    </View>

                    {/* /////////////////////////////////////////////// */}

                    <View style={styles.row}>

                        <View style={{...styles.cellTitleRe, paddingBottom: "10px"}}>

                            <Text style={styles.textInfo}>Fecha:</Text>

                        </View>

                        <View style={{...styles.cellInfoRe, paddingBottom: "10px"}}>

                            <Text style={styles.textInfo}>{data["fechaEntrega"]}</Text>

                        </View>

                        <View style={{...styles.cellTitleRe, paddingBottom: "10px"}}>

                            <Text style={styles.textInfo}></Text>

                        </View>

                        <View style={{...styles.cellInfoRe, paddingRight: '10px', paddingBottom: "10px"}}>

                            <Text style={styles.textInfo}></Text>

                        </View>

                    </View>

                    {/* ================================ */}
                    <View style={styles.marginBotom}></View>
                    {/* ================================ */}

                    {/* DATOS DE PAGO */}

                    <View style={styles.headerTitle}>

                        <Text>Pago</Text>

                    </View>

                    {/* ================================ */}
                    <View style={styles.marginBotom}></View>
                    {/* ================================ */}

                    {/* EXPORTACION */}

                    {data["impoExpo"] === "Exportacion" && (

                        <>
                        
                        <View style={styles.row}>

                            <View style={{ ...styles.cellTitleRe, paddingTop: "10px" }}>

                                <Text style={styles.textInfo}>Moneda</Text>

                            </View>

                            <View style={{ ...styles.cellInfoRe, paddingTop: "10px" }}>

                                <Text style={styles.textInfo}>{data["moneda"]}</Text>

                            </View>

                            <View style={{ ...styles.cellTitleRe, paddingTop: "10px" }}>

                                <Text style={styles.textInfo}>Tarifa:</Text>

                            </View>

                            <View style={{ ...styles.cellInfoRe, paddingRight: '10px', paddingTop: "10px" }}>

                                <Text style={styles.textInfo}>$ {parseFloat(data["tarifaOrden"]).toFixed(2)}</Text>

                            </View>

                        </View>

                        <View style={{...styles.marginBotom, width: "30%", marginRight: "120px"}}></View>

                        <View style={styles.row}>

                            <View style={styles.cellTitleRe}>

                                <Text style={styles.textInfo}></Text>

                            </View>

                            <View style={styles.cellInfoRe}>

                                <Text style={styles.textInfo}></Text>

                            </View>

                            <View style={{...styles.cellTitleRe, paddingTop: "10px"}}>

                                <Text style={styles.textInfo}>TOTAL:</Text>

                            </View>

                            <View style={{...styles.cellInfoRe, paddingRight: '10px', paddingTop: "10px"}}>

                                <Text style={styles.textInfo}>$ {parseFloat(data["tarifaOrden"]).toFixed(2)}</Text>

                            </View>

                        </View>

                        </>

                    )}

                    {/* PAGO MEXICANO */}

                    {data["impoExpo"] === "Importacion" && (

                        <>
                        
                        <View style={styles.row}>

                            <View style={{ ...styles.cellTitleRe, paddingTop: "10px" }}>

                                <Text style={styles.textInfo}>Moneda</Text>

                            </View>

                            <View style={{ ...styles.cellInfoRe, paddingTop: "10px" }}>

                                <Text style={styles.textInfo}>{data["moneda"]}</Text>

                            </View>

                            <View style={{ ...styles.cellTitleRe, paddingTop: "10px", width: "20%"}}>

                                <Text style={styles.textInfo}>Tarifa:</Text>

                            </View>

                            <View style={{ ...styles.cellInfoRe, paddingRight: '10px', paddingTop: "10px" }}>

                                <Text style={styles.textInfo}>$ {parseFloat(data["tarifaOrden"]).toFixed(2)}</Text>

                            </View>

                        </View>
                        
                        <View style={styles.row}>

                            <View style={styles.cellTitleRe}>

                                <Text style={styles.textInfo}></Text>

                            </View>

                            <View style={styles.cellInfoRe}>

                                <Text style={styles.textInfo}></Text>

                            </View>

                            <View style={{...styles.cellTitleRe, width: "20%"}}>

                                <Text style={styles.textInfo}>IVA ({data["ivaCliente"]}%):</Text>

                            </View>

                            <View style={{ ...styles.cellInfoRe, paddingRight: '10px' }}>

                                <Text style={styles.textInfo}>$ {parseFloat(data["ivaCantidad"]).toFixed(2)}</Text>

                            </View>

                        </View>

                        <View style={styles.row}>

                            <View style={styles.cellTitleRe}>

                                <Text style={styles.textInfo}></Text>

                            </View>

                            <View style={styles.cellInfoRe}>

                                <Text style={styles.textInfo}></Text>

                            </View>

                            <View style={{...styles.cellTitleRe, width: "20%"}}>

                                <Text style={styles.textInfo}>Ret (4%):</Text>

                            </View>

                            <View style={{...styles.cellInfoRe, paddingRight: '10px'}}>

                                <Text style={styles.textInfo}>$ {parseFloat(data["retencionCantidad"]).toFixed(2)}</Text>

                            </View>

                        </View>

                        <View style={{...styles.marginBotom, width: "30%", marginRight: "120px"}}></View>

                        <View style={styles.row}>

                            <View style={styles.cellTitleRe}>

                                <Text style={styles.textInfo}></Text>

                            </View>

                            <View style={styles.cellInfoRe}>

                                <Text style={styles.textInfo}></Text>

                            </View>

                            <View style={{...styles.cellTitleRe, paddingTop: "10px"}}>

                                <Text style={styles.textInfo}>TOTAL:</Text>

                            </View>

                            <View style={{...styles.cellInfoRe, paddingRight: '10px', paddingTop: "10px"}}>

                                <Text style={styles.textInfo}>$ {parseFloat(data["total"]).toFixed(2)}</Text>

                            </View>

                        </View>
                            
                        </>

                    )}

                </View>
            
            </Page>

        </Document>

    )

}

export default CiLogistica