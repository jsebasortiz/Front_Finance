import React from 'react';
import Navbar from './Navbar/components/Navbar'; // Asegúrate de que esta ruta sea correcta
import Content from './Content/components/Content'; // Asegúrate de que esta ruta sea correcta
import Header from './Header/components/Header';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

function Example() {
    return (
        <div>
            <Navbar/>
            <Content/>
        </div>
    );
}

export default Example;
