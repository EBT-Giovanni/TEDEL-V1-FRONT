import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Login } from './pages/login';
// import { ResetPassword } from './pages/resetPassword';
// import { ForgotPassword } from './pages/forgotPassword';
import { Dashboard } from './pages/dashboard';
import MainLayout from './components/mainLayout';
import Usuarios from './pages/Usuarios';
import Cajas from './pages/Cajas';
import EstatusOrden from './pages/EstatusOrden';
import EstatusTractores from './pages/EstatusTractores';
import Licencias from './pages/Licencias';
import Documentos from './pages/Documentos';
import Rutas from './pages/Rutas';
import Operadores from './pages/Operadores';
import Clientes from './pages/Clientes';
import MainRutas from './pages/MainRutas';
import CatDestinoOrigen from './pages/CatDestinoOrigen';
import Tractores from './pages/Tractores';
import Ordenes from './pages/Ordenes';
import EstatusOperador from './pages/EstatusOperador';
import EstatusCaja from './pages/EstatusCaja';
import Despacho from './pages/Despacho';
import Entregas from './pages/Entregas';
import Direcciones from './pages/Direcciones';
import GestionBiaticos from './pages/GestionBiaticos';
import ProformaCreate from './pages/ProformaCreate';
import ProformaView from './pages/ProformaView';
import GastosOperador from './pages/GastosOperador';
import CajasActivas from './pages/logistica/CajasActivas';
import OrdenesLogistica from './pages/logistica/OrdenesLogistica';
import Proovedores from './pages/logistica/Proovedores';
import DespachoLogistica from './pages/logistica/DespachoLogistica';
import CajasLogistica from './pages/logistica/CajasLogistica';
import ClientesLogistica from './pages/logistica/ClientesLogistica';
import TractoresLogistica from './pages/logistica/TractoresLogistica';
import RutasLogistica from './pages/logistica/RutasLogistica';
import ProformasLogisticaCrear from './pages/ProformaLogisticaCreate';
import ProformasLogisticaView from './pages/ProformaLogisticaView';
import VistaViaticosOperador from './pages/VistaViaticosOperador';
import VistaSeguimientoViaje from './pages/VistaSeguimientoViaje';
import SaldosOperador from './pages/SaldosOperador';
import OrdenesTemperatura from './pages/OrdenesTemperatura';
import OrdenesFacturas from './pages/OrdenesFacturas';

function App() {

  return (

    <Router>

      <Routes>

        <Route path="/" element={<Login/>} />
        {/* <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} /> */}
        <Route path="/dashboard" element={<MainLayout/>} >

          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path='usuarios' element={<Usuarios/>} />
          <Route path='cajas' element={<Cajas/>} />
          <Route path='estatus_orden' element={<EstatusOrden/>} />
          <Route path='estatus_tractores' element={<EstatusTractores/>} />
          <Route path='estatus_operador' element={<EstatusOperador/>} />
          <Route path='estatus_caja' element={<EstatusCaja/>} />
          <Route path='licencias' element={<Licencias/>} />
          <Route path='documentos' element={<Documentos/>} />
          <Route path='tipo_rutas' element={<Rutas/>} />
          <Route path='cat_destinos' element={<CatDestinoOrigen/>} />
          <Route path='operadores' element={<Operadores/>} />
          <Route path='clientes' element={<Clientes/>} />
          <Route path='rutas' element={<MainRutas/>} />
          <Route path='tractores' element={<Tractores/>} />
          <Route path='ordenes' element={<Ordenes/>} />
          <Route path='despacho' element={<Despacho/>} />
          <Route path='cerrar_despacho' element={<GastosOperador/>} />
          <Route path='direcciones' element={<Direcciones/>} />
          <Route path='biaticos' element={<GestionBiaticos/>} />
          <Route path='proforma_create' element={<ProformaCreate/>} />
          <Route path='proforma_view' element={<ProformaView/>} />
          <Route path='viaticos_vista' element={<VistaViaticosOperador/>} />
          <Route path='seguimiento_viaje_vista' element={<VistaSeguimientoViaje/>} />
          <Route path='saldos' element={<SaldosOperador/>} />
          <Route path='ordenes_t' element={<OrdenesTemperatura/>} />
          <Route path='ordenes_facturas' element={<OrdenesFacturas/>} />

          {/* LOGISTICA */}

          <Route path='cajas_activas' element={<CajasActivas/>} />
          <Route path='ordenes_logistica' element={<OrdenesLogistica/>} />
          <Route path='proveedores_logistica' element={<Proovedores/>} />
          <Route path='despacho_logistica' element={<DespachoLogistica/>} />
          <Route path='cajas_logistica' element={<CajasLogistica/>} />
          <Route path='clientes_logistica' element={<ClientesLogistica/>} />
          <Route path='tractores_logistica' element={<TractoresLogistica/>} />
          <Route path='rutas_logistica' element={<RutasLogistica/>} />
          <Route path='proforma_logistica_create' element={<ProformasLogisticaCrear/>} />
          <Route path='proforma_logistica_view' element={<ProformasLogisticaView/>} />

          

        </Route>

      </Routes>

    </Router>

  );

}

export default App;
