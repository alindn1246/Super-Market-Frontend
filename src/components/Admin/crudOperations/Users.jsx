import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 


import axios from 'axios';

export default function Users() {


    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    `https://localhost:7211/api/auth/customers`
                );
                setData(response.data);

            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUsers();
    }, []);



    return (
        <div className="container card shadow border-0 mt-4">
            <div className="card-header bg-secondary bg-gradient ml-0 py-3">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1 className="text-white"> User List</h1>
                    </div>
                </div>
            </div>
            <div className="card-body p-4">
                <div className="row pb-3">
                    <div className="col-6"></div>
                  
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                         
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
