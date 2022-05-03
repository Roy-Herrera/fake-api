import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, FormControl, Form } from 'react-bootstrap';
import '../style/Product.css'
import axios from 'axios';

const API = 'https://api.escuelajs.co/api/v1/products/'

const ProductosLista = () => {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({ title: '', price: '', description: '', categoryId: 1, images: [] })
    const [open, setOpen] = useState(false)
    const [eliminar, setEliminar] = useState('')
    const [editar, setEditar] = useState(false)
    const [cambio, setCambio] = useState('')
    const [productos, setProductos] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseOK = () => setOpen(false)
    const handleCloseEdit = () => setEditar(false)

    const descripciondeProducto = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.name === "images" ?[event.target.value] :event.target.value
        })
    }

    const getData = async () => {
        const response = await axios(API)
        setProductos(response.data)
    }
    useEffect(() => {
        getData()
    }, [])


    //para agregar un nuevo producto
    function nuevo() {
        axios.post(API, form )
            .then(function () {
                getData()
            })
            .catch(function (error) {
                console.log(error)
            })
        setShow(false)
    }

    //para eliminar el producto
    function eliminarP(id) {
        setOpen(true)
        setEliminar(id)
    }
    function eliminarProd(id) {
        axios.delete(`${API}${id}`)
            .then(function (deleted) {
                console.log(deleted)
                getData()
            })
            .catch(function (error) {
                console.log(error)
            })
        setOpen(false)
    }

    //editar el producto
    async function edit(id) {
        setEditar(true)
        setCambio(id)
        const cambiosP = await axios.get(`${API}${id}`)
        console.log(cambiosP)
        setForm({ title: cambiosP.data.title, price: cambiosP.data.price, description: cambiosP.data.description, categoryId: 1, images: cambiosP.data.images })
    }
    function editarProd(id) {
        axios.put(`${API}${id}`, form)
            .then(function (response) {
                console.log(response)
                getData()
            })
            .catch(function (error) {
                console.log(error)
            })
        handleCloseEdit(false)
        setTimeout( () => {
            alert('El producto se ha actualizado correctamente')
        }, 500)
        
    }


    return (
        <Container fluid className="contenedorProductos">
            <Button 
                variant="primary" 
                onClick={handleShow}
            >
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
                    <Form className="inputProducto">
                        <p><br />Ingrese el titulo del producto</p>
                        <FormControl
                            name="title"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={descripciondeProducto}
                            placeholder="Titulo del Producto"
                            type="text"
                            required
                        />
                        <p><br />Ingrese el precio del producto</p>
                        <FormControl
                            type="number"
                            name="price"
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={descripciondeProducto}
                            placeholder="Precio del Producto"
                            required
                        />
                        <p><br />Ingrese la descripcion del producto</p>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            onChange={descripciondeProducto}
                            placeholder="Descripcion del producto"
                            type="text"
                            required
                        />
                        <p><br />Ingrese la Imagen del producto</p>
                        <FormControl
                            name="images"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={descripciondeProducto}
                            placeholder="Ingrese la URL"
                            required
                        />

                    </Form>
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
            <Table 
                striped bordered hover variant="primary"
            >
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
                    {productos.map((productoInd, key) => (
                        <tr key={key}>
                            <td><img src={productoInd.images[0]} alt="" /></td>
                            <td>{productoInd.title}</td>
                            <td>$ {productoInd.price}</td>
                            <td>{productoInd.description}</td>
                            <td>
                                <Button onClick={() => edit(productoInd.id)}>Editar</Button>
                            </td>
                            <td>
                                <Button onClick={() => eliminarP(productoInd.id)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal 
                show={open} 
                onHide={handleCloseOK}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>DESEA ELIMINAR EL PRODUCTO!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseOK}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => eliminarProd(eliminar)}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal 
                show={editar} 
                onHide={handleCloseEdit}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Editar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="inputProducto">
                        <p><br />Titulo del producto</p>
                        <FormControl
                            name="title"
                            value={form.title}
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={descripciondeProducto}
                        />
                        <p><br />Precio del producto</p>
                        <FormControl
                            type="number"
                            name="price"
                            value={form.price}
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={descripciondeProducto}
                        />
                        <p><br />Descripcion del producto</p>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={form.description}
                            onChange={descripciondeProducto}
                        />
                        <p><br />Imagen del producto</p>
                        <FormControl
                            name="images"
                            value={form.images}
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={descripciondeProducto}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => editarProd(cambio)}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
}

export default ProductosLista;