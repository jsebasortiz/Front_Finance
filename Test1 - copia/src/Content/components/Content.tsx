import React from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';

const Content: React.FC = () => {
    return (
        <div className="app-content content">
            <div className="content-overlay"></div>
            <div className="header-navbar-shadow"></div>
            <div className="content-wrapper container-xxl p-0">
                <div className="content-header row"></div>
                <div className="content-body">
                    <h3>Lista de categorías</h3>
                    <p>Lista de categorías por nombre, tipo y descripción</p>
                    {/* Permission Table */}
                    <div className="card">
                        <div className="card-datatable table-responsive">
                            <Table className="datatables-permissions table">
                                <thead className="table-light">
                                    <tr>
                                        <th></th>
                                        <th>Tipo de categoría</th>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Aquí puedes agregar las filas de la tabla */}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    {/* Add Permission Modal */}
                    <Modal id="addPermissionModal" tabIndex="-1" aria-hidden="true">
                        <Modal.Dialog centered>
                            <Modal.Header className="bg-transparent">
                                <Button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></Button>
                            </Modal.Header>
                            <Modal.Body className="px-sm-5 pb-5">
                                <div className="text-center mb-2">
                                    <h1 className="mb-1">Agregue nueva categoría</h1>
                                    <p>La categoría necesita los siguientes valores.</p>
                                </div>
                                <Form id="addPermissionForm" className="row" onSubmit={(e) => e.preventDefault()}>
                                    <Form.Group className="col-12 mt-2">
                                        <Form.Label htmlFor="modalTipoDeCategoria">Tipo de Categoría</Form.Label>
                                        <Form.Control type="text" id="modalTipoDeCategoria" name="modalTipoDeCategoria" placeholder="Tipo de Categoría" required />
                                    </Form.Group>
                                    <Form.Group className="col-12 mt-2">
                                        <Form.Label htmlFor="modalNombre">Nombre</Form.Label>
                                        <Form.Control type="text" id="modalNombre" name="modalNombre" placeholder="Nombre" required />
                                    </Form.Group>
                                    <Form.Group className="col-12 mt-2">
                                        <Form.Label htmlFor="modalDescripcion">Descripción</Form.Label>
                                        <Form.Control as="textarea" id="modalDescripcion" name="modalDescripcion" placeholder="Descripción" required />
                                    </Form.Group>
                                    <div className="col-12 mt-75"></div>
                                    <div className="col-12 text-center">
                                        <Button type="submit" className="btn btn-primary mt-2 me-1">Crear Categoría</Button>
                                        <Button type="reset" className="btn btn-outline-secondary mt-2" data-bs-dismiss="modal" aria-label="Close">Descartar</Button>
                                    </div>
                                </Form>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal>
                    {/* Edit Category Modal */}
                    <Modal id="editPermissionModal" tabIndex="-1" aria-hidden="true">
                        <Modal.Dialog centered>
                            <Modal.Header className="bg-transparent">
                                <Button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></Button>
                            </Modal.Header>
                            <Modal.Body className="p-3 pt-0">
                                <div className="text-center mb-2">
                                    <h1 className="mb-1">Editar Categoría</h1>
                                    <p>Edita la categoría según tus necesidades.</p>
                                </div>
                                <div className="alert alert-warning" role="alert">
                                    <h6 className="alert-heading">¡Advertencia!</h6>
                                    <div className="alert-body">Al editar el nombre de la categoría, podrías romper la funcionalidad del sistema de categorías. Asegúrate de estar absolutamente seguro antes de proceder.</div>
                                </div>
                                <Form id="editPermissionForm" className="row" onSubmit={(e) => e.preventDefault()}>
                                    <Form.Group className="col-12 mt-2">
                                        <Form.Label htmlFor="editTipoDeCategoria">Tipo de Categoría</Form.Label>
                                        <Form.Control type="text" id="editTipoDeCategoria" name="editTipoDeCategoria" placeholder="Tipo de Categoría" required />
                                    </Form.Group>
                                    <Form.Group className="col-12 mt-2">
                                        <Form.Label htmlFor="editNombre">Nombre</Form.Label>
                                        <Form.Control type="text" id="editNombre" name="editNombre" placeholder="Nombre" required />
                                    </Form.Group>
                                    <Form.Group className="col-12 mt-2">
                                        <Form.Label htmlFor="editDescripcion">Descripción</Form.Label>
                                        <Form.Control as="textarea" id="editDescripcion" name="editDescripcion" placeholder="Descripción" required />
                                    </Form.Group>
                                    <input type="hidden" id="editPermissionId" name="editPermissionId" />
                                    <div className="col-12 mt-75">
                                        <Button type="submit" className="btn btn-primary mt-2">Actualizar</Button>
                                        <Button type="reset" className="btn btn-outline-secondary mt-2" data-bs-dismiss="modal" aria-label="Close">Descartar</Button>
                                    </div>
                                </Form>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal>
                </div>
                {/* BEGIN: Footer */}
                <footer className="footer footer-static footer-light">
                    <p className="clearfix mb-0">
                        <span className="float-md-start d-block d-md-inline-block mt-25">COPYRIGHT &copy; 2024
                            <a className="ms-25" href="#" target="_blank" rel="noopener noreferrer">Switchs</a>
                            <span className="d-none d-sm-inline-block">, All rights Reserved</span>
                        </span>
                        <span className="float-md-end d-none d-md-block">Hand-crafted & Made with
                            <i data-feather="heart"></i>
                        </span>
                    </p>
                </footer>
                <button className="btn btn-primary btn-icon scroll-top" type="button">
                    <i data-feather="arrow-up"></i>
                </button>
                {/* END: Footer */}
            </div>
        </div>
    );
};

export default Content;
