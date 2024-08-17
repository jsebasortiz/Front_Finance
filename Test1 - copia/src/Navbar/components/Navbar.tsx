import React, { useState } from 'react';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import {
    FaCircle, FaGrin, FaSignOutAlt, FaMoon, FaShoppingCart, FaUser,
    FaBell, FaSearch, FaStar, FaCog
} from 'react-icons/fa';

import { Link } from 'react-router-dom';
import Header from '../../Header/components/Header';

const MainMenu: React.FC = () => {
    const [menuFixed, setMenuFixed] = useState<boolean>(false);

    const handleToggle = () => {
        setMenuFixed(prevState => {
            const newState = !prevState;
            console.log('Menu Fixed:', newState); // Muestra el estado actualizado en el console log
            return newState;
        });
    };

    return (
        <>
            <Header />
            <div className={`main-menu menu-light menu-accordion menu-shadow ${menuFixed ? 'menu-fixed' : 'menu-closed'}`} data-scroll-to-active="true">
                <div className="navbar-header">
                    <ul className="nav navbar-nav flex-row">
                        <li className="nav-item me-auto">
                            <a className="navbar-brand" href="#">
                                <span className="brand-logo">
                                    {/* Imagen del logo, con tamaño ajustado */}
                                    <img src="./app-assets/images/ico/R2.png" alt="Logo" height="40" /> {/* Cambié la altura a 40 */}
                                </span>
                                <h2 className="brand-text" style={{ color: 'red' }}>Univalle</h2> {/* Cambié el color a rojo */}
                            </a>
                        </li>


                        <li className="nav-item nav-toggle">
                            <a className="nav-link modern-nav-toggle pe-0" onClick={handleToggle}>
                                {menuFixed ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x d-block d-xl-none text-primary toggle-icon font-medium-4">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-circle d-none d-xl-block collapse-toggle-icon font-medium-4">
                                        <circle cx="12" cy="12" r="10"></circle>
                                    </svg>
                                )}
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="shadow-bottom"></div>
                <div className="main-menu-content">
                    <ul className="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
                        <li className="navigation-header">
                            <span>Configuración</span>
                            <i data-feather="more-horizontal"></i>
                        </li>
                        <li className="nav-item">
                            <a className="d-flex align-items-center" href="#">
                                <FaCog />
                                <span className="menu-title text-truncate">Configuración</span>
                            </a>
                            <ul className="menu-content">
                                <li>
                                    <Link to="/content1" className="d-flex align-items-center">
                                        <FaCircle />
                                        <span className="menu-item text-truncate">Conten1</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/content2" className="d-flex align-items-center">
                                        <FaCircle />
                                        <span className="menu-item text-truncate">Conten2</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/content1" className="d-flex align-items-center">
                                        <FaCircle />
                                        <span className="menu-item text-truncate">Conten3</span>
                                    </Link>
                                </li>


                            </ul>
                        </li>
                        <li className="navigation-header">
                            <span>Consultas</span>
                            <i data-feather="more-horizontal"></i>
                        </li>
                        <li className="nav-item">
                            <a className="d-flex align-items-center" href="#">
                                <FaSearch />
                                <span className="menu-title text-truncate">Consultas</span>
                            </a>
                            <ul className="menu-content">
                                <li>
                                    <a className="d-flex align-items-center" href="#">
                                        <FaCircle />
                                        <span className="menu-item text-truncate">Recorridos</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="d-flex align-items-center" href="#">
                                        <FaCircle />
                                        <span className="menu-item text-truncate">Datos de carga</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="d-flex align-items-center" href="#">
                                        <FaCircle />
                                        <span className="menu-item text-truncate">Recursos</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="d-flex align-items-center" href="#">
                                        <FaCircle />
                                        <span className="menu-item text-truncate">Ejecuciones</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="navbar-footer">
                    <ul className="nav navbar-nav flex-row align-items-center ms-auto">
                        <li className="nav-item">
                            <Button variant="link" className="nav-link" onClick={() => console.log('Cerrar sesión')}>
                                <FaSignOutAlt />
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default MainMenu;