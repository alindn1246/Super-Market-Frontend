import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function EditOrderProduct() {

    const { orderId } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchProductsbySubCategory = async () => {
            try {
                const response = await axios.get(
                    `https://localhost:7211/api/OrderProduct/GetByOrderId/${orderId}`
                );
                setData(response.data);

            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProductsbySubCategory();
    }, [orderId]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7211/api/OrderProduct/${id}`);
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
                        <h1 className="text-white">Products Order List</h1>
                    </div>
                </div>
            </div>
            <div className="card-body p-4">
                <div className="row pb-3">
                    
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>

                            
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>quantity</th>
                          
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((productOrder) => (
                            <tr key={productOrder.id}>
                                
                                <td>{productOrder.product.productName}</td>
                                <td>{productOrder.price}</td>
                                <td>{productOrder.quantity}</td>
                                

                                <td className='text-center'>
                                   
                                    
                                   
                                        <Button variant="danger" onClick={() => handleDelete(productOrder.id)}>
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
