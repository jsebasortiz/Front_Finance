import React, { useState } from 'react';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import {
    FaCircle, FaGrin, FaSignOutAlt, FaMoon, FaShoppingCart, FaUser,
    FaBell, FaSearch, FaStar, FaCog
} from 'react-icons/fa';

import { AiOutlineMessage, AiOutlineCalendar, AiOutlineCheckSquare } from 'react-icons/ai';
import { BiMailSend } from 'react-icons/bi';
import {

} from 'react-icons/fa';


const Header: React.FC = () => {
    return (
        <nav className="header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-light navbar-shadow container-xxl">
            <div className="navbar-container d-flex content">
                <div className="bookmark-wrapper d-flex align-items-center">
                    <ul className="nav navbar-nav d-xl-none">
                        <li className="nav-item">
                            <a className="nav-link menu-toggle" href="#">
                                <FaSearch className="ficon" />
                            </a>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav bookmark-icons">
                        {/* Icons */}
                        <li className="nav-item d-none d-lg-block">
                            <a className="nav-link" href="#" data-bs-toggle="tooltip" title="Email">
                                <BiMailSend className="ficon" />
                            </a>
                        </li>
                        <li className="nav-item d-none d-lg-block">
                            <a className="nav-link" href="#" data-bs-toggle="tooltip" title="Chat">
                                <AiOutlineMessage className="ficon" />
                            </a>
                        </li>
                        <li className="nav-item d-none d-lg-block">
                            <a className="nav-link" href="#" data-bs-toggle="tooltip" title="Calendar">
                                <AiOutlineCalendar className="ficon" />
                            </a>
                        </li>
                        <li className="nav-item d-none d-lg-block">
                            <a className="nav-link" href="#" data-bs-toggle="tooltip" title="Todo">
                                <AiOutlineCheckSquare className="ficon" />
                            </a>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav">
                        <li className="nav-item d-none d-lg-block">
                            <a className="nav-link bookmark-star">
                                <FaSearch className="ficon text-warning" />
                                <div className="bookmark-input search-input">
                                    <div className="bookmark-input-icon"><FaSearch /></div>
                                    <input
                                        className="form-control input"
                                        type="text"
                                        placeholder="Bookmark"
                                        tabIndex={0}
                                    />
                                    <ul className="search-list search-list-bookmark"></ul>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* User and Notifications */}
                <ul className="nav navbar-nav align-items-center ms-auto">
                    {/* Language Dropdown */}
                    <li className="nav-item dropdown dropdown-language">
                        <a className="nav-link dropdown-toggle" id="dropdown-flag" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src="/path-to-flag-image.png" alt="English" height="16" />
                            <span className="selected-language">English</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown-flag">
                            <a className="dropdown-item" href="#"><img src="/path-to-flag-image.png" alt="English" height="16" /> English</a>
                            <a className="dropdown-item" href="#"><img src="/path-to-french-flag.png" alt="French" height="16" /> French</a>
                        </div>
                    </li>
                    {/* Dark Mode Toggle */}
                    <li className="nav-item d-none d-lg-block">
                        <a className="nav-link nav-link-style">
                            <FaMoon className="ficon" />
                        </a>
                    </li>
                    {/* Search Icon */}
                    <li className="nav-item nav-search">
                        <a className="nav-link nav-link-search">
                            <FaSearch className="ficon" />
                        </a>
                        <div className="search-input">
                            <div className="search-input-icon"><FaSearch /></div>
                            <input
                                className="form-control input"
                                type="text"
                                placeholder="Explore Vuexy..."
                                tabIndex={-1}
                                data-search="search"
                            />
                            <div className="search-input-close"><FaSearch /></div>
                            <ul className="search-list search-list-main"></ul>
                        </div>
                    </li>
                    {/* Cart Dropdown */}
                    <li className="nav-item dropdown dropdown-cart me-25">
                        <a className="nav-link" href="#" data-bs-toggle="dropdown">
                            <FaShoppingCart className="ficon" />
                            <span className="badge rounded-pill bg-primary badge-up cart-item-count">6</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-media dropdown-menu-end">
                            <li className="dropdown-menu-header">
                                <div className="dropdown-header d-flex">
                                    <h4 className="notification-title mb-0 me-auto">My Cart</h4>
                                    <div className="badge rounded-pill badge-light-primary">4 Items</div>
                                </div>
                            </li>
                            <li className="scrollable-container media-list">
                                <div className="list-item align-items-center">
                                    <img className="d-block rounded me-1" src="/path-to-product-image.png" alt="product" width="62" />
                                    <div className="list-item-body flex-grow-1">
                                        <i className="ficon cart-item-remove" />
                                        <div className="media-heading">
                                            <h6 className="cart-item-title"><a className="text-body" href="#">Apple watch 5</a></h6>
                                            <small className="cart-item-by">By Apple</small>
                                        </div>
                                        <h5 className="cart-item-price">$374.90</h5>
                                    </div>
                                </div>
                            </li>
                            <li className="dropdown-menu-footer">
                                <a className="btn btn-primary w-100" href="#">Checkout</a>
                            </li>
                        </ul>
                    </li>
                    {/* Notifications */}
                    <li className="nav-item dropdown dropdown-notification me-25">
                        <a className="nav-link" href="#" data-bs-toggle="dropdown">
                            <FaBell className="ficon" />
                            <span className="badge rounded-pill bg-danger badge-up">5</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-media dropdown-menu-end">
                            <li className="dropdown-menu-header">
                                <div className="dropdown-header d-flex">
                                    <h4 className="notification-title mb-0 me-auto">Notifications</h4>
                                    <div className="badge rounded-pill badge-light-primary">6 New</div>
                                </div>
                            </li>
                            <li className="scrollable-container media-list">
                                <a className="d-flex" href="#">
                                    <div className="list-item d-flex align-items-start">
                                        <div className="me-1">
                                            <div className="avatar">
                                                <img src="/path-to-avatar-image.jpg" alt="avatar" width="32" height="32" />
                                            </div>
                                        </div>
                                        <div className="list-item-body flex-grow-1">
                                            <p className="media-heading"><span className="fw-bolder">Congratulations Sam 🎉</span> Winner!</p>
                                            <small className="notification-text">Won the monthly best seller badge.</small>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li className="dropdown-menu-footer">
                                <a className="btn btn-primary w-100" href="#">Read all notifications</a>
                            </li>
                        </ul>
                    </li>
                    {/* User Dropdown */}
                    <li className="nav-item dropdown dropdown-user">
                        <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                            <div className="d-flex align-items-center">
                                <div className="user-info text-end me-2">
                                    <span className="user-name fw-bolder d-block">John Doe</span>
                                    <span className="user-status text-muted d-block">Admin</span>
                                </div>
                                <div className="avatar">
                                    <img className="round" src="/path-to-avatar-image.jpg" alt="avatar" height="40" width="40" />
                                </div>
                            </div>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <a className="dropdown-item" href="#">
                                    <FaUser className="me-2" /> Profile
                                </a>
                            </li>
                            <li className="dropdown-divider"></li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <FaSignOutAlt className="me-2" /> Logout
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
};


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
                                    <a className="d-flex align-items-center" href="#">
                                        <FaCircle />
                                        <span className="menu-item text-truncate">Ruta/micro</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="d-flex align-items-center" href="#">
                                        <FaCircle />
                                        <span className="menu-item text-truncate">Agendar recorrido</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="d-flex align-items-center" href="#">
                                        <FaCircle />
                                        <span className="menu-item text-truncate">Clientes</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="d-flex align-items-center" href="#">
                                        <FaCircle />
                                        <span className="menu-item text-truncate">Agen multiusuarios</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="d-flex align-items-center" href="#">
                                        <FaCircle />
                                        <span className="menu-item text-truncate">Periodos</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="d-flex align-items-center" href="#">
                                        <FaCircle />
                                        <span className="menu-item text-truncate">Operarios</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="d-flex align-items-center" href="#">
                                        <FaCircle />
                                        <span className="menu-item text-truncate">Camiones</span>
                                    </a>
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