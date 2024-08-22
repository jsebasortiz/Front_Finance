import React, { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { InventoryType } from '../Types/Inventory';
import {
  GetInventory,
  CreateInventory,
  UpdateInventory,
  DeleteInventory,
} from '../API/InventoryAPI';

const InventarioForm = () => {
  const [inventario, setInventario] = useState<InventoryType[]>([]);
  const [currentInventario, setCurrentInventario] = useState<InventoryType | null>(null);
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getInventario();
  }, []);

  const getInventario = async () => {
    const data = await GetInventory();
    if (data) {
      setInventario(data.map(item => ({
        ...item,
        nombreEquipo: item.nombreEquipo.trim(),
        numeroSerie: item.numeroSerie.trim(),
        numeroInventario: item.numeroInventario.trim(),
        comentario: item.comentario.trim(),
        nombreUsuario: item.nombreUsuario.trim(),
        tipoDispositivo: item.tipoDispositivo.trim(),
        fabricante: item.fabricante.trim(),
        estado: item.estado.trim(),
        nombreEstado: item.nombreEstado.trim()
      })));
    }
  };

  const handleShowModal = (operation: number, item: InventoryType | null = null) => {
    setOperation(operation);
    setCurrentInventario(item || {
      nombreEquipo: '',
      numeroSerie: '',
      numeroInventario: '',
      comentario: '',
      nombreUsuario: '',
      tipoDispositivo: '',
      fabricante: '',
      estado:"",
      nombreEstado: ''
    });
    setTitle(operation === 1 ? 'Añadir Inventario' : 'Actualizar Inventario');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentInventario(null);
  };

  const handleSave = async () => {
    if (!currentInventario) return;
  
    try {
      if (operation === 1) {
        const createdInventario = await CreateInventory(currentInventario);
        console.log("se creo");
        if (createdInventario) {
          console.log("llamar inventario");
            getInventario();
            alert('Inventario creado correctamente.');
        }
      } else if (currentInventario.id) {
        const updatedInventario = await UpdateInventory(currentInventario.id, currentInventario);
        if (updatedInventario) {
          alert('Inventario actualizado correctamente.');
          console.log("llamar error");
          getInventario();
        }
      }
      handleCloseModal();
    } catch (error) {
      alert('Error al guardar el inventario.');
    }
  };
  

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este inventario?')) {
      try {
        const success = await DeleteInventory(id);
        if (success) {
          alert('Inventario eliminado correctamente.');
          getInventario();
        } else {
          alert('No se pudo eliminar el inventario.');
        }
      } catch (error) {
        console.error('Error al eliminar el inventario:', error);
        alert('Error inesperado al intentar eliminar el inventario.');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentInventario((prevState) => {
      if (!prevState) return null;
      return { ...prevState, [name]: value };
    });
  };

  return (
    <div className='App'>
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-md-4 offset-4'>
            <div className='d-grid mx-auto'>
              <Button
                style={{ backgroundColor: 'blue', color: 'white', border: 'none' }}
                className='btn btn-dark'
                onClick={() => handleShowModal(1)}
              >
                <i className='fa-solid fa-circle-plus'></i> Añadir
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-4'>
        <div className='col-12 col-lg-12'>
          <div className='table-responsive'>
            <Table bordered hover>
              <thead>
                <tr>
                  <th># DE INVENTARIO</th>
                  <th>NOMBRE</th>
                  <th># DE SERIE</th>
                  <th>COMENTARIO</th>
                  <th>USUARIO</th>
                  <th>TIPO DE DISPOSITIVO</th>
                  <th>FABRICANTE</th>
                  <th>ESTADO</th>
                  <th>NOMBRE DE ESTADO</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody className='table-group-divider'>
                {inventario.map((item) => (
                  <tr key={item.id}>
                    <td>{item.numeroInventario}</td>
                    <td>{item.nombreEquipo}</td>
                    <td>{item.numeroSerie}</td>
                    <td>{item.comentario}</td>
                    <td>{item.nombreUsuario}</td>
                    <td>{item.tipoDispositivo}</td>
                    <td>{item.fabricante}</td>
                    <td>{item.estado}</td>
                    <td>{item.nombreEstado}</td>
                    <td>
                      <Button
                        style={{ backgroundColor: 'blue', color: 'white', border: 'none' }}
                        onClick={() => handleShowModal(2, item)}
                      >
                        <i className='fa-solid fa-edit'></i>
                      </Button>
                      <Button variant='danger' onClick={() => item.id !== undefined && handleDelete(item.id)}>
                        <i className='fa-solid fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {currentInventario && (
              <>
                <div className='input-group mb-3'>
                  <span className='input-group-text'>
                    <i className='fa-solid fa-gift'></i>
                  </span>
                  <input
                    type='text'
                    name='nombreEquipo'
                    className='form-control'
                    placeholder='Nombre del Equipo'
                    value={currentInventario.nombreEquipo}
                    onChange={handleChange}
                  />
                </div>
                <div className='input-group mb-3'>
                  <span className='input-group-text'>
                    <i className='fa-solid fa-barcode'></i>
                  </span>
                  <input
                    type='text'
                    name='numeroSerie'
                    className='form-control'
                    placeholder='Número de Serie'
                    value={currentInventario.numeroSerie}
                    onChange={handleChange}
                  />
                </div>
                <div className='input-group mb-3'>
                  <span className='input-group-text'>
                    <i className='fa-solid fa-cube'></i>
                  </span>
                  <input
                    type='text'
                    name='numeroInventario'
                    className='form-control'
                    placeholder='Número de Inventario'
                    value={currentInventario.numeroInventario}
                    onChange={handleChange}
                  />
                </div>
                <div className='input-group mb-3'>
                  <span className='input-group-text'>
                    <i className='fa-solid fa-comment'></i>
                  </span>
                  <textarea
                    className='form-control'
                    name='comentario'
                    placeholder='Comentario'
                    rows={3}
                    value={currentInventario.comentario}
                    onChange={handleChange}
                  />
                </div>
                <div className='input-group mb-3'>
                  <span className='input-group-text'>
                    <i className='fa-solid fa-user'></i>
                  </span>
                  <input
                    type='text'
                    name='nombreUsuario'
                    className='form-control'
                    placeholder='Nombre del Usuario'
                    value={currentInventario.nombreUsuario}
                    onChange={handleChange}
                  />
                </div>
                <div className='input-group mb-3'>
                  <span className='input-group-text'>
                    <i className='fa-solid fa-desktop'></i>
                  </span>
                  <input
                    type='text'
                    name='tipoDispositivo'
                    className='form-control'
                    placeholder='Tipo de Dispositivo'
                    value={currentInventario.tipoDispositivo}
                    onChange={handleChange}
                  />
                </div>
                <div className='input-group mb-3'>
                  <span className='input-group-text'>
                    <i className='fa-solid fa-industry'></i>
                  </span>
                  <input
                    type='text'
                    name='fabricante'
                    className='form-control'
                    placeholder='Fabricante'
                    value={currentInventario.fabricante}
                    onChange={handleChange}
                  />
                </div>
                <div className='input-group mb-3'>
                  <span className='input-group-text'>
                    <i className='fa-solid fa-heartbeat'></i>
                  </span>
                  <input
                    type='text'
                    name='estado'
                    className='form-control'
                    placeholder='Estado'
                    value={currentInventario.estado}
                    onChange={handleChange}
                  />
                </div>
                <div className='input-group mb-3'>
                  <span className='input-group-text'>
                    <i className='fa-solid fa-clipboard'></i>
                  </span>
                  <input
                    type='text'
                    name='nombreEstado'
                    className='form-control'
                    placeholder='Nombre del Estado'
                    value={currentInventario.nombreEstado}
                    onChange={handleChange}
                  />
                </div>
                <div className='d-grid col-6 mx-auto'>
                  <Button className='btn btn-success' onClick={handleSave}>
                    <i className='fa-solid fa-floppy-disk'></i> Guardar
                  </Button>
                </div>
              </>
            )}
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default InventarioForm;
