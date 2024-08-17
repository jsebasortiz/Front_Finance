import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar/components/Navbar';  // Navbar de tu aplicación
import MainMenu from './Header/components/Header'; // MainMenu con las opciones
import Content from './Content/components/Content';  // Contenido de la página 1
import Content2 from './Content/components/Content2';  // Contenido de la página 2
import Footer from './Footer/components/Footer';  // Footer separado

function App() {
    return (
        <Router>
            <div>
                <Navbar />  {/* Barra de navegación */}
                <MainMenu />  {/* Menú lateral */}
                <div className="content-area">  {/* Área de contenido que cambiará dinámicamente */}
                    <Routes>
                        {/* Redirige la ruta raíz a /content1 */}
                        <Route path="/" element={<Navigate to="/content1" />} />
                        {/* Definimos las rutas para mostrar Content y Content2 */}
                        <Route path="/content1" element={<Content />} />
                        <Route path="/content2" element={<Content2 />} />
                    </Routes>
                </div>
                {/* Footer se muestra en todas las rutas */}
                <Footer />
            </div>
        </Router>
    );
}

export default App;
