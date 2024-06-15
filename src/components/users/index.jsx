import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import UserDetailModal from "./UserDetailModal";
import { BiSolidUserDetail } from "react-icons/bi";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({});
  const [detailModal, setDetailModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          setUsers(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggle = () => {
    setModal(!modal);
    setUser({});
  };

  const toggleDetail = () => {
    setDetailModal(!detailModal);
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3000/users/${id}`).then((res) => {
      if (res.status === 200) {
        setUsers(users.filter((user) => user.id !== id));
        setModal(false);
        setUser({});
      }
    });
  };

  const openModal = (item) => {
    setUser(item);
    setModal(true);
  };

  const openDetailModal = (item) => {
    setUser(item);
    setDetailModal(true);
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
  };

  return (
    <>
      <Modal open={modal} toggle={toggle} user={user} updateUser={updateUser} />
      <UserDetailModal open={detailModal} toggle={toggleDetail} user={user} />
      <div className="container">
        <h1 className="text-center my-3 text-2xl font-bold">Users</h1>
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
                <td className="items-center flex">
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
                  <button
                    onClick={() => openDetailModal(item)}
                    className="border rounded px-3 py-1 bg-slate-500"
                  >
                    <BiSolidUserDetail className="h-7 w-7 text-white" />
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
