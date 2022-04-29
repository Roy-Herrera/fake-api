import { useEffect, useState } from 'react';
import axios from 'axios'

const IndexProductos = (API) => {
    const [productos, setProductos] = useState([])

    useEffect(() => {
        const getData = async() => {
            const response = await axios(API)
            setProductos(response.data)
        }
        getData()
    }, [API]);

	return productos
}

export default IndexProductos
