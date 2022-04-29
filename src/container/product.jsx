import React, { useState } from 'react';
import IndexProductos from '../hooks/index'
import { Container, Table, Button, Modal, FormControl } from 'react-bootstrap';
import '../style/Product.css'
import axios from 'axios';

const API = 'https://api.escuelajs.co/api/v1/products/'

const ProductosLista = () => {
    const productosIndividual = IndexProductos(API)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [form, setForm] = useState({title:'', price:'', description:'', categoryId: 1, images: []})

    const descripciondeProducto = event => {
        setForm({
            ...form,
            [event.target.name]:event.target.value
        })
    }

    function nuevo(){
        axios.post(API, {...form})
        
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    function eliminarProd(id) {
        axios.delete(`${API}${id}`)
        .then(function (deleted) {
            console.log(deleted)
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    return (
        <Container fluid className="contenedorProductos">
            <Button variant="primary" onClick={handleShow}>
                Agregar Nuevo Producto
            </Button>

            <Modal 
                show={show} 
                onHide={handleClose} 
                backdrop="static" 
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Crear un Nuevo Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="inputProducto">
                        <p><br />Ingrese el titulo del producto</p>
                        <FormControl 
                            name="title" 
                            aria-label="Small" 
                            aria-describedby="inputGroup-sizing-sm" 
                            onChange={descripciondeProducto}
                        />
                        <p><br />Ingrese el precio del producto</p>
                        <FormControl 
                            type="number"
                            name="price" 
                            aria-label="Small" 
                            aria-describedby="inputGroup-sizing-sm" 
                            onChange={descripciondeProducto}
                        />
                        <p><br />Ingrese la descripcion del producto</p>
                        <FormControl 
                            name="description" 
                            aria-label="Small" 
                            aria-describedby="inputGroup-sizing-sm" 
                            onChange={descripciondeProducto}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="secondary" 
                        onClick={handleClose}
                    >

                        Cancelar
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={nuevo}
                    >
                            Agregar
                    </Button>
                </Modal.Footer>
            </Modal>

{/* Imprimiendo los articulos extraidos de la API */}
            <Table striped bordered hover variant="primary">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {productosIndividual.map((productoInd, key) => (
                        <tr key={key}>
                            <td><img src={productoInd.images[0]} alt="" /></td>
                            <td>{productoInd.title}</td>
                            <td>$ {productoInd.price}</td>
                            <td>{productoInd.description}</td>
                            <td>
                                <Button onClick={handleShow}>Editar</Button>
                            </td>
                            <td>
                                <Button onClick={() => eliminarProd(productoInd.id)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default ProductosLista;