// Importaciones de React y otros módulos
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importaciones de componentes propios
import Navbar from './Navbar/components/Navbar.jsx';  // Navbar de tu aplicación
import MainMenu from './Header/components/Header.jsx'; // MainMenu con las opciones
import Content2 from './Content/components/Content2.jsx';  // Contenido de la página 2
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
import Content1 from './Content/components/Content.tsx';

// Componente Layout para envolver las rutas que comparten una estructura común
// Componente Layout para envolver las rutas que comparten una estructura común
const Layout: React.FC = () => (
    <>
        <Navbar />  {/* Barra de navegación */}
        <MainMenu />  {/* Menú lateral */}
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
                element: <Navigate to="/content1" />  // Redirige a /content1 por defecto
            },
            {
                path: '/content1',
                element: <Content1 />  // Muestra el componente Content1
            },
            {
                path: '/content2',
                element: <Content2 />  // Muestra el componente Content2
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