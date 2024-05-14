import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useGetAllProductsQuery } from '../../features/productsApi';
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function ProductList() {

    const { type } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchProductsbySubCategory = async () => {
            try {
                const response = await axios.get(
                    `https://localhost:7211/api/product/GetProductWithSubCategoryAsync?subcategory=${type}`
                );
                setData(response.data);

            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProductsbySubCategory();
    }, [type]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7211/api/product/${id}`);
            setData(data.filter(product => product.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="container card shadow border-0 mt-4">
            <div className="card-header bg-secondary bg-gradient ml-0 py-3">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1 className="text-white">Products List</h1>
                    </div>
                </div>
            </div>
            <div className="card-body p-4">
                <div className="row pb-3">
                    <div className="col-6"></div>
                    <div className="col-12  d-flex justify-content-between align-items-center">
                        <h2>{type}</h2>
                        <Link to={`/Admin/create-product/${type}`} > 
                            <Button variant="outline-primary">
                                <AddCircleOutlineIcon /> Create New Product
                            </Button>
                        </Link>

                    </div>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>BrandName</th>
                            <th>Price</th>
                            <th>Size</th>
                            <th>discount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((product) => (
                            <tr key={product.id}>
                                <td>{product.productName}</td>
                                <td>{product.brandName}</td>
                                <td>{product.price}</td>
                                <td>{product.size}{product.sizeUnit}</td>
                                <td>{product.discount}%</td>

                                <td className='text-center'>
                                   
                                    <Link to={`/Admin/edit-product/${type}/${product.id}`} > 
                                        <Button variant="success" className='me-2'>
                                            <ModeEditIcon />
                                        </Button>
                                    </Link>
                                   
                                        <Button variant="danger" onClick={() => handleDelete(product.id)}>
                                            <DeleteForeverOutlinedIcon />
                                        </Button>
                                  
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
