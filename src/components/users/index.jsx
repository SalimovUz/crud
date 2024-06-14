import axios from "axios";
import React, { useEffect, useState } from "react";
import UserModal from "../Modal";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data);
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggle = () => {
    setModal(!modal);
    if (!modal) setUser({});
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3000/users/${id}`).then((res) => {
      if (res.status === 200) {
        setUsers(users.filter((user) => user.id !== id));
      }
    });
  };

  const openModal = (item) => {
    setUser(item);
    setModal(true);
  };

  return (
    <>
      <UserModal
        open={modal}
        toggle={toggle}
        user={user}
        setUsers={setUsers}
        users={users}
      />
      <div className="container">
        <h1 className="text-center my-3 font-semibold text-2xl">Users</h1>
        <button className="btn btn-success my-3" onClick={toggle}>
          Add User
        </button>
        <table className="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>T/R</th>
              <th>Name</th>
              <th>Email</th>
              <th>Number</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.number}</td>
                <td>
                  <button
                    className="btn btn-info mx-1"
                    onClick={() => openModal(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger mx-1"
                    onClick={() => deleteUser(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Index;
