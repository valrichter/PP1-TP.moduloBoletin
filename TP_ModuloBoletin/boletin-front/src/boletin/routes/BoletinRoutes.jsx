import { Routes, Route, Navigate} from "react-router-dom"
import { AlumnoBoletinLegajo, Padre, Dashboard, DirectivoBoletinPromedio, Metas } from "../pages"
import { Consumo } from "../pages/Consumo"
import { DirectivoBoletinAnual } from "../pages/DirectivoBoletinAnual"

export const BoletinRoutes = () => {
  return (

    <>
    
        {/* <SideBar/> */}

        <div className="dashboard-content px-3 pt-4">
            <Routes>

                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/directivo-promedio" element={<DirectivoBoletinPromedio/>} />
                <Route path="/directivo-anual" element={<DirectivoBoletinAnual/>} />
                <Route path="/padre" element={<Padre/>} />
                <Route path="/alumno-legajo" element={<AlumnoBoletinLegajo/>} />
                <Route path="/metas" element={<Metas/>} />
                <Route path="/consumo" element={<Consumo/>} />
                {/* Para cualquier otra ruta */}
                <Route path="/" element={<Navigate to="/dashboard" />} />
                
            </Routes>
        </div>
    
    </>


    )
}
