import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';

export default function TopSoldProducts() {


    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchProductsOutofStock = async () => {
            try {
                const response = await axios.get(
                    `https://localhost:7211/api/OrderProduct/GetTop10Products`
                );
                setData(response.data);

            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProductsOutofStock();
    }, []);



    return (
        <div className="container card shadow border-0 mt-4">
            <div className="card-header bg-primary  ml-0 py-3">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1 className="text-white">Products Topsales</h1>
                    </div>
                </div>
            </div>
            <div className="card-body p-4">
                <div className="row pb-3">
                   
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>product Total Sales </th>
                          
                            
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((product) => (
                            <tr key={product.id}>
                                <td>{product.product.productName}</td>
                                <td>{product.totalSalesAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}



