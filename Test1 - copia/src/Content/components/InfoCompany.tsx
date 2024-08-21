import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";
import { CompanyType } from "../../Company/Types/Company";
import { GetCompanyById, UpdateCompany } from "../../Company/API/CompanyAPI";

const CompanyPresentation: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
  const [company, setCompany] = useState<CompanyType>({
    companyId: 0,
    companyName: "",
    nit: 0,
    address: "",
    email: "",
    phone: 0,
    economicActivity: "",
    ciiuCode: "",
  });

  useEffect(() => {
    const fetchCompanyData = async () => {
      const data = await GetCompanyById(7);
      if (data) {
        setCompany(data);
      }
    };

    fetchCompanyData();
  }, []);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompany((prevCompany) => ({
      ...prevCompany,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const success = await UpdateCompany(company);
    if (success) {
      alert("Los cambios han sido guardados con éxito.");
      setShowModal(false);
    } else {
      alert("Error al actualizar la empresa.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="app-content content">
      <div className="content-wrapper container-xxl p-0">
        <div className="content-body">
          <Card className="shadow-lg animate__animated animate__fadeInUp mb-4">
            <Card.Body>
              <h2 className="text-center mb-4 company-title">Presentación de la Empresa</h2>
              <div className="company-detail mb-3">
                <strong>Razón Social:</strong> {company.companyName}
              </div>
              <div className="company-detail mb-3">
                <strong>NIT:</strong> {company.nit}
              </div>
              <div className="company-detail mb-3">
                <strong>Dirección:</strong> {company.address}
              </div>
              <div className="company-detail mb-3">
                <strong>Correo Electrónico:</strong> {company.email}
              </div>
              <div className="company-detail mb-3">
                <strong>Celular:</strong> {company.phone}
              </div>
              <div className="company-detail mb-3">
                <strong>Actividad Económica:</strong> {company.economicActivity}
              </div>
              <div className="company-detail mb-3">
                <strong>Código CIIU:</strong> {company.ciiuCode}
              </div>
              <Button className="edit-button" variant="primary" onClick={handleShow}>
                Editar
              </Button>
            </Card.Body>
          </Card>

          {/* Modal de edición */}
          <Modal show={showModal} onHide={handleClose} className="animate__animated animate__fadeInDown">
            <Modal.Header closeButton>
              <Modal.Title>Editar Información de la Empresa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formCompanyName" className="mb-3">
                      <Form.Label>Razón Social</Form.Label>
                      <Form.Control
                        type="text"
                        name="companyName"
                        value={company.companyName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formNIT" className="mb-3">
                      <Form.Label>NIT</Form.Label>
                      <Form.Control
                        type="text"
                        name="nit"
                        value={company.nit}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formAddress" className="mb-3">
                      <Form.Label>Dirección</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={company.address}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formEmail" className="mb-3">
                      <Form.Label>Correo Electrónico</Form.Label>
                      <Form.Control
                        type="text"
                        name="email"
                        value={company.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formPhone" className="mb-3">
                      <Form.Label>Celular</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={company.phone}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formEconomicActivity" className="mb-3">
                      <Form.Label>Actividad Económica</Form.Label>
                      <Form.Control
                        type="text"
                        name="economicActivity"
                        value={company.economicActivity}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formCiiuCode" className="mb-3">
                      <Form.Label>Código CIIU</Form.Label>
                      <Form.Control
                        type="text"
                        name="ciiuCode"
                        value={company.ciiuCode}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-grid">
                  <Button variant="success" onClick={handleSave}>
                    Guardar Cambios
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CompanyPresentation;
