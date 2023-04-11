import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserorderList = () => {
    const [userorder, setUser] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get("http://localhost:5000/userorder");
        setUser(response.data);
    }

    const deleteUser = async (id) =>{
        try {
            await axios.delete(`http://localhost:5000/userorder/${id}`);
            getUsers();
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <h1>List User </h1>
            <br />
            <Link to={`add`} className='button is-success'>Add</Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userorder.map((userorder, index) => (
                         <tr key={userorder.id}>
                         <td>{index +1}</td>
                         <td>{userorder.Email}</td>
                         <td>{userorder.Amount}</td>
                         <td>
                            <Link to={`/edit/${userorder.id}`} className='button is-small is-info'>Edit</Link>
                            <button onClick={()=> deleteUser(userorder.id)} className='button is-small is-danger'>Delete</button>

                         </td>
                     </tr>
                    ))}
                   
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default UserorderList;