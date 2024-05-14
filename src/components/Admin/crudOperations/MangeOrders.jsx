import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { useParams } from "react-router-dom";
import axios from 'axios';

export default function MangeOrders() {

    const { type } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await axios.get(
                    `https://localhost:7211/api/Order`
                );
                setData(response.data);

            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchAllProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7211/api/Order/${id}`);
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
                        <h1 className="text-white">Orders List</h1>
                    </div>
                </div>
            </div>
            <div className="card-body p-4">
                <div className="row pb-3">
                    <div className="col-6"></div>
                    <div className="col-12  d-flex justify-content-between align-items-center">
                        
                        

                    </div>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>

                            
                            
                            <th>user name</th>
                            <th>total amount</th>
                            <th>date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((order) => (
                            <tr key={order.id}>
                               
                                <td>{order.user.name}</td>
                               
                                <td>{order.totalAmount}</td>
                                <td>{order.orderDate}</td>

                                <td className='text-center'>
                                   
                                <Link to={`/Admin/edit-order/${order.id}`} > 
                                        <Button variant="success" className='me-2'>
                                            <ModeEditIcon />
                                        </Button>
                                    </Link>
                                   
                                   
                                        <Button variant="danger" onClick={() => handleDelete(order.id)}>
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
