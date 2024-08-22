// Importaciones de React y otros módulos
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importaciones de componentes propios
import Navbar from './Navbar/components/Navbar.jsx';  // Navbar de tu aplicación
import MainMenu from './Header/components/Header.jsx'; // MainMenu con las opciones
import Content2 from './Company/components/Content2.js';  // Contenido de la página 2
import Footer from './Footer/components/Footer.jsx';  // Footer separado

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
import Content1 from './Company/components/Content.tsx';
import CompanyPresentation from './Company/components/InfoCompany.tsx';
import BranchCRUD from './Branch/Components/BranchComponents.tsx';
import EconomicActivityCRUD from './EconomicActivity/Components/EconomicActivityComponents.tsx'
import InventoryCRUD from './Inventory/Components/InventoryTest.tsx';

// Componente Layout para envolver las rutas que comparten una estructura común
// Componente Layout para envolver las rutas que comparten una estructura común
const Layout: React.FC = () => (
    <>
        <Navbar />  {/* Barra de navegación */}
        <MainMenu />  {/* Header */}
        <div className="content-area">
            <Outlet />  {/* Aquí es donde las rutas hijas serán renderizadas */}
        </div>
        <Footer />  {/* Footer presente en todas las rutas */}
    </>
);

// Configuración de rutas utilizando createBrowserRouter
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,  // Renderiza el Layout en la ruta raíz
        children: [
            {
                index: true,
                path: '/company',
                element: <CompanyPresentation />  
            },
            {
                index: true,
                path: '/economicActivity',
                element: <EconomicActivityCRUD />  
            },

            {
                path: '/branch',
                element: <BranchCRUD /> 
            },
            {
                path: '/inventory',
                element: <InventoryCRUD /> 
            }
        ]
    }
]);

// Renderizado en el DOM
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);