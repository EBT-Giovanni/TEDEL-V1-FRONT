import React from 'react'
import { Document, Page, StyleSheet, View, Text, Image } from '@react-pdf/renderer';
import logoTedel from "../../../img/tedellogo.png"

// ===============================================
// ESTILOS PARA PDF
// ===============================================

const styles = StyleSheet.create({

    //GENERAL

   /*  container: {
        display: 'flex',
        marginBottom: '10px',
        border: '1px 1px 1px 1px solid black'
    }, */
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    row2: {
        display: 'flex',
        flexDirection: 'row'
        
    },
    cabeceraTabla: {
        textAlign:'center',
        width: '100%',
        fontSize: '12px',
       //backgroundColor: '#000080',
        color: "#000000",
        fontWeight: 'bold'
    },
    viewInformacion:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    viewFechaFolio: {
        width: '40%',
        display: 'flex',
        marginRight: '10px',
        height: '30px'

    },
    containerFechaFolio:{
        width: '100%',
        textAlign: "center",
        justifyContent: 'space-between',
        fontSize: '12px',
        backgroundColor: '#000080',
        color: "#FFFFFF",
    },
    containerFolioText:{
        width: '100%',
        justifyContent: 'space-between',
        fontSize: '12px',
        textAlign: "center",
    },
    containerFechaText:{
        width: '100%',
        justifyContent: 'space-between',
        fontSize: '9px',
        textAlign: "center",
    },
    viewCliente:{
        width: '50%',
        //paddingLeft: "10px",
        marginBottom : '15px',
        border: '1px solid black',
        left: '15px'
    },
    headerCliente:{
        textAlign:'center',
        width: '100%',
        fontSize: '12px',
        backgroundColor: '#000080',
        color: "#FFFFFF",
        fontWeight: 'bold'
    },
    nombreCliente:{
        fontSize: '15px',
        fontWeight:"bold",
        paddingLeft: "10px"
    },
    textoCliente:{
        fontSize: '12px',
        paddingLeft: "10px"
    },
    viewOrdenCompra : {
        width: '100%',
        justifyContent: 'space-between',
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingBottom : '15px'
    },
    textoOrdenCompra:{
        width:'100%',
        fontSize: '12px',
        justifyContent: 'space-between',
        textAlign: 'center',
        paddingLeft: "10px",
        paddingRight: "10px",
    },
    headerOrdenCompra:{
        textAlign:'center',
        width: '100%',
        fontSize: '12px',
        backgroundColor: '#000080',
        color: "#FFFFFF",
    },
    viewArticulo : {
        width: '100%',
        //border: '1px solid black',
        justifyContent: 'space-between',
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingBottom : '15px'
    },
    headerArticulo:{
        textAlign:'center',
        width: '100%',
        fontSize: '12px',
        backgroundColor: '#000080',
        color: "#FFFFFF",
    },
    textoArticulo:{
        width:'100%',
        fontSize: '10px',
        justifyContent: 'space-between',
        textAlign: 'center',
        paddingLeft: "10px",
        paddingRight: "10px",
    },
    subInformacion:{
        width:'100%'
    },
    textoArticulominNombre:{
        fontSize: '6px',
        textAlign: 'center',
        paddingLeft: "50px",
        paddingRight: "10px",
    },
    textoArticulominUmed:{
        fontSize: '6px',
        textAlign: 'center',
        paddingLeft: "80px",
        paddingRight: "10px",
    },
    cellFecha: {
        fontSize: '10px',
        textAlign: 'center',
        backgroundColor: '#000080',
        color: "#FFFFFF",
        //border: '1px 1px 1px 1px solid black'

    },
    viewDatosEmpresa: {
        width: '60%',
        paddingBottom : '15px'
    },
    viewDatosGenerales : {
        width: '100%',
        //border: '1px solid red',
        justifyContent: 'space-between',
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingBottom : '15px'
    },
    headerDatosGenerales:{
        textAlign:'center',
        width: '100%',
        fontSize: '12px',
        backgroundColor: '#000080',
        color: "#FFFFFF",
    },
    textoDatosGenerales:{
        width:'100%',
        fontSize: '10px',
        justifyContent: 'space-between',
        textAlign: 'center',
        paddingLeft: "10px",
        paddingRight: "10px",
    },
    viewMercancia : {
        width: '100%',
        //border: '1px solid red',
        justifyContent: 'space-between',
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingBottom : '15px'
    },
    headerMercancia:{
        textAlign:'center',
        width: '100%',
        fontSize: '12px',
        backgroundColor: '#000080',
        color: "#FFFFFF",
    },
    textoMercancia:{
        width:'100%',
        fontSize: '10px',
        justifyContent: 'space-between',
        textAlign: 'center',
        paddingLeft: "10px",
        paddingRight: "10px",
    },
    viewCaja : {
        width: '100%',
        //border: '1px solid red',
        justifyContent: 'space-between',
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingBottom : '15px'
    },
    headerCaja :{
        textAlign:'center',
        width: '100%',
        fontSize: '12px',
        backgroundColor: '#000080',
        color: "#FFFFFF",
    },
    textoCaja :{
        width:'100%',
        fontSize: '10px',
        justifyContent: 'space-between',
        textAlign: 'center',
        paddingLeft: "10px",
        paddingRight: "10px",
    },
    viewTractor : {
        width: '100%',
        //border: '1px solid red',
        justifyContent: 'space-between',
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingBottom : '15px'
    },
    headerTractor :{
        textAlign:'center',
        width: '100%',
        fontSize: '12px',
        backgroundColor: '#000080',
        color: "#FFFFFF",
    },
    textoTractor :{
        width:'100%',
        fontSize: '10px',
        justifyContent: 'space-between',
        textAlign: 'center',
        paddingLeft: "10px",
        paddingRight: "10px",
    },
    viewOperador : {
        width: '100%',
        border: '1px solid red',
        justifyContent: 'space-between',
        paddingLeft: "10px",
        paddingRight: "10px",
    },
    headerOperador :{
        textAlign:'center',
        width: '100%',
        fontSize: '12px',
        backgroundColor: '#000080',
        color: "#FFFFFF",
    },
    textoOperador :{
        width:'100%',
        fontSize: '10px',
        justifyContent: 'space-between',
        textAlign: 'center',
        paddingLeft: "10px",
        paddingRight: "10px",
    },
    marginBotom: {
        borderBottom: '1px solid black',
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto"
    },
    blueFill:{
        backgroundColor: '#000080',
        color: "#FFFFFF",
        borderColor: "black",
        width: '20%',
        textAlign: 'right'
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
        textAlign: 'right',
        marginRight: '3%',
        fontFamily: 'Helvetica-Bold',
        fontSize: 17,
        padding: "10px",
        color: "#15A6EA"
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
        paddingLeft: "15px",
        fontSize: 10,
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

});

// ===============================================
// PDF
// ===============================================
function formatFechaHoraISO8601ToCustom(isoDate) {
    // Parsear la fecha y hora en formato ISO 8601
    const date = new Date(isoDate);
  
    // Función para obtener el nombre del mes a partir de su número
    function getNombreMes(mes) {
      const meses = [
        "ene", "feb", "mar", "abr", "may", "jun",
        "jul", "ago", "sep", "oct", "nov", "dic"
      ];
      return meses[mes];
    }
  
    // Obtener los componentes de la fecha y hora
    const dia = date.getUTCDate();
    const mes = date.getUTCMonth();
    const año = date.getUTCFullYear();
    const horas = date.getUTCHours().toString().padStart(2, '0');
    const minutos = date.getUTCMinutes().toString().padStart(2, '0');
    const segundos = date.getUTCSeconds().toString().padStart(2, '0');
  
    // Formatear la cadena
    const fechaHoraFormateada = `${dia}/${getNombreMes(mes)}/${año} ${horas}:${minutos}:${segundos}`;
    return fechaHoraFormateada;
  }
  
const ProformaPDF = ({data}) => {
    console.log(data)
    return (

        <Document>

            <Page>

                {/* CABECERA */}

                    <Text style={styles.headerTitle}>CARTA PORTE</Text>
                    <View style={styles.viewInformacion}>
                        <View style={styles.viewDatosEmpresa}>
                                <Text style={styles.textInfo}>TEDEL TRUCKING SA DE CV:</Text>
                                <Text style={styles.textInfo}>JESUS CARRANZA 1227</Text>
                                <Text style={styles.textInfo}>CENTRO</Text>
                                <Text style={styles.textInfo}>NUEVO LAREDO, TAMAULIPAS CP:88000</Text>
                                <Text style={styles.textInfo}>RFC: TTR230127AC4</Text>
                        </View>
                        <View style={styles.viewFechaFolio}>
                            <View style={styles.row}>
                                <Text style={styles.containerFechaFolio}>Fecha:</Text>
                                <Text style={styles.containerFechaFolio}>Folio:</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.containerFechaText}>{ formatFechaHoraISO8601ToCustom(data.timestamp)}</Text>
                                <Text style={styles.containerFolioText}>CCP-001</Text>
                            </View>
                        </View>
                    </View>

                {/* ==========CLIENTE=============== */}

                    {/* ================================ */}
                    <View style={styles.viewCliente}>
                        <View style={styles.row}>
                            <Text style={styles.headerCliente}>Cliente:</Text>
                        </View>
                        <View style={styles.row}><Text style={styles.nombreCliente}>{data.cliente}</Text></View>
                        <View style={styles.row}><Text style={styles.textoCliente}>direccion</Text></View>
                        <View style={styles.row}><Text style={styles.textoCliente}>direccion</Text></View>
                        <View style={styles.row}><Text style={styles.textoCliente}>RFC: data</Text></View>
                        <View style={styles.row}><Text style={styles.textoCliente}>Domicilio Fiscal: data</Text></View>
                        <View style={styles.row}><Text style={styles.textoCliente}>Régimen Fiscal: data</Text></View>                        
                    </View>
                    {/* ================================ */}


                    {/* ===========ORDEN COMPRA================ */}
                    <View style={styles.viewOrdenCompra}>
                        <View style={styles.row}>
                            <Text style={styles.headerOrdenCompra}>Orden de Compra</Text>
                            <Text style={styles.headerOrdenCompra}>Condiciones</Text>
                            <Text style={styles.headerOrdenCompra}>Vendedor</Text>
                            <Text style={styles.headerOrdenCompra}>Via de embarque</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.textoOrdenCompra}></Text>
                            <Text style={styles.textoOrdenCompra}>30 dias</Text>
                            <Text style={styles.textoOrdenCompra}></Text>
                            <Text style={styles.textoOrdenCompra}></Text>
                        </View>
                    </View>
                    {/* ================================ */}

                    <View style={styles.viewArticulo}>
                        <View style={styles.row}>
                            <Text style={styles.headerArticulo}>Articulo</Text>
                            <Text style={styles.headerArticulo}>Nombre</Text>
                            <Text style={styles.headerArticulo}>U.med</Text>
                            <Text style={styles.headerArticulo}>Unidades</Text>
                            <Text style={styles.headerArticulo}>Precio</Text>
                            <Text style={styles.headerArticulo}>Descto.</Text>
                            <Text style={styles.headerArticulo}>Importe</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.textoArticulo}>Articulo</Text>
                            <Text style={styles.textoArticulo}>FLETE DE EXPORTACION</Text>
                            <Text style={styles.textoArticulo}>SERV</Text>
                            <Text style={styles.textoArticulo}>Unidades</Text>
                            <Text style={styles.textoArticulo}>Precio</Text>
                            <Text style={styles.textoArticulo}>Descto.</Text>
                            <Text style={styles.textoArticulo}>Importe</Text>
                        </View>
                    </View>
                        
                    {/* /////////////////////////////////////////////// */}

                    <View style={styles.viewDatosGenerales}>
                        <View style={styles.row}>
                            <Text style={styles.cabeceraTabla}>Datos Generales</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.headerDatosGenerales}>Origen Razón Social</Text>
                            <Text style={styles.headerDatosGenerales}>Origen RFC</Text>
                            <Text style={styles.headerDatosGenerales}>Origen Dirección</Text>
                            <Text style={styles.headerDatosGenerales}>Flete Internacional</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.textoDatosGenerales}>{data.origen_razon_social}</Text>
                            <Text style={styles.textoDatosGenerales}>{data.origen_rfc}</Text>
                            <Text style={styles.textoDatosGenerales}>{data.origen_direccion}</Text>
                            <Text style={styles.textoDatosGenerales}>{data.flete_internacional}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.headerDatosGenerales}>Entrada / Salida</Text>
                            <Text style={styles.headerDatosGenerales}>Distancia Recorrida</Text>
                            <Text style={styles.headerDatosGenerales}>Destino Razon Social</Text>
                            <Text style={styles.headerDatosGenerales}>Destino RFC</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.textoDatosGenerales}>{data.entrada_salida}</Text>
                            <Text style={styles.textoDatosGenerales}>{data.distancia_recorrida}</Text>
                            <Text style={styles.textoDatosGenerales}>{data.destino_razon_social}</Text>
                            <Text style={styles.textoDatosGenerales}>{data.destino_rfc}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.headerDatosGenerales}>Destino Dirección</Text>
                            <Text style={styles.headerDatosGenerales}>País de carga</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.textoDatosGenerales}>{data.destino_direccion}</Text>
                            <Text style={styles.textoDatosGenerales}>{data.pais_de_carga}</Text>
                        </View>
                    </View>
                    
                    
                    <View style={styles.viewMercancia}>
                        <View style={styles.row}>
                            <Text style={styles.cabeceraTabla}>Mercancia</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.headerMercancia}>Tipo</Text>
                            <Text style={styles.headerMercancia}>Cantidad</Text>
                            <Text style={styles.headerMercancia}>Peso</Text>
                            <Text style={styles.headerMercancia}>Fracción Arancelaria</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.textoMercancia}>{data.mercancia_tipo}</Text>
                            <Text style={styles.textoMercancia}>{data.mercancia_cantidad}</Text>
                            <Text style={styles.textoMercancia}>{data.mercancia_peso}</Text>
                            <Text style={styles.textoMercancia}>{data.mercancia_fraccion_arancelaria}</Text>
                        </View>
                    </View>

                    <View style={styles.viewCaja}>
                        <View style={styles.row}>
                            <Text style={styles.cabeceraTabla}>Remolque</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.headerCaja}>Número</Text>
                            <Text style={styles.headerCaja}>Tipo</Text>
                            <Text style={styles.headerCaja}>Placas</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.textoCaja}>{data.caja_numero}</Text>
                            <Text style={styles.textoCaja}>{data.caja_tipo}</Text>
                            <Text style={styles.textoCaja}>{data.caja_placas}</Text>
                        </View>
                    </View>

                    <View style={styles.viewTractor}>
                        <View style={styles.row}>
                            <Text style={styles.cabeceraTabla}>Tractor</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.headerTractor}>Placas</Text>
                            <Text style={styles.headerTractor}>Año</Text>
                            <Text style={styles.headerTractor}>Aseguradora</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.textoTractor}>{data.tractor_placas}</Text>
                            <Text style={styles.textoTractor}>{data.tractor_anio}</Text>
                            <Text style={styles.textoTractor}>{data.tractor_aseguradora}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.headerTractor}>Numero Economico</Text>
                            <Text style={styles.headerTractor}>Permiso SCT</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.textoTractor}>{data.tractor_no_economico}</Text>
                            <Text style={styles.textoTractor}>{data.tractor_permiso_sct}</Text>
                        </View>
                    </View>

                    <View style={styles.viewTractor}>
                        <View style={styles.row}>
                            <Text style={styles.cabeceraTabla}>Operador</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.headerTractor}>Nombre</Text>
                            <Text style={styles.headerTractor}>CURP</Text>
                            <Text style={styles.headerTractor}>RFC</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.textoTractor}>{data.operador_nombre}</Text>
                            <Text style={styles.textoTractor}>{data.operador_curp}</Text>
                            <Text style={styles.textoTractor}>{data.operador_rfc}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.headerTractor}>Licencia</Text>
                            <Text style={styles.headerTractor}>Direccion</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.textoTractor}>{data.operador_licencia}</Text>
                            <Text style={styles.textoTractor}>{data.operador_direccion}</Text>
                        </View>
                    </View>

            </Page>

        </Document>

    )

}

export default ProformaPDF