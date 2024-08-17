// Importaciones de React y otros módulos
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importaciones de componentes propios
import Navbar from './Navbar/components/Navbar.js';  // Navbar de tu aplicación
import MainMenu from './Header/components/Header.js'; // MainMenu con las opciones
import Content from './Content/components/Content.js';  // Contenido de la página 1
import Content2 from './Content/components/Content2.js';  // Contenido de la página 2
import Footer from './Footer/components/Footer.js';  // Footer separado

// Importaciones de estilos adicionales
import '../app-assets/css/bootstrap.min.css';
import '../app-assets/css/colors.min.css';
import '../app-assets/css/components.min.css';
import '../app-assets/css/plugins/extensions/ext-component-context-menu.min.css';
// (Continúa importando todos los demás archivos CSS que sean necesarios)

// Importar JS del Tema
import '../app-assets/js/core/app-menu.js';
import '../app-assets/js/core/app.js';
import './js/scripts/customizer.js'; // Importa el archivo JS
import './js/scripts/documentation.js'; // Importa el archivo JS

// Componente principal de la aplicación
const App: React.FC = () => {
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
};

// Renderizado en el DOM
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
