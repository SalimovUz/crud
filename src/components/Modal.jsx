import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import axios from "axios";

const UserModal = ({ open, toggle, user }) => {
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    number: user.number || "",
  });

  useEffect(() => {
    setForm({
      name: user.name || "",
      email: user.email || "",
      number: user.number || "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      email: form.email,
      number: form.number,
    };

    if (!user.id) {
      axios
        .post("http://localhost:3000/users", payload)
        .then((res) => {
          if (res.status === 201) {
            toggle();
            window.location.reload();

          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .put(`http://localhost:3000/users/${user.id}`, payload)
        .then((res) => {
          if (res.status === 200) {
            toggle();
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <h1 className="text-center">{user.id ? "Edit User" : "Add User"}</h1>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit} id="submit">
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="form-control my-2"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="form-control my-2"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Number"
            name="number"
            className="form-control my-2"
            value={form.number}
            onChange={handleChange}
            required
          />
          <ModalFooter>
            <Button color="primary" type="submit">
              Submit
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default UserModal;
