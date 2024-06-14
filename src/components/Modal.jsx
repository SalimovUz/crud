import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import axios from "axios";

const UserModal = (props) => {
  const { open, toggle, user, setUsers, users } = props;
  const [form, setForm] = useState({ name: "", email: "", number: "" });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        number: user.number || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.id) {
      axios.post("http://localhost:3000/users", form).then((res) => {
        if (res.status === 201) {
          setUsers([...users, res.data]);
          toggle();
        }
      });
    } else {
      const payload = {
        name: form.name || user.name,
        email: form.email || user.email,
        number: form.number || user.number,
      };
      axios
        .put(`http://localhost:3000/users/${user.id}`, payload)
        .then((res) => {
          if (res.status === 200) {
            setUsers(users.map((u) => (u.id === user.id ? res.data : u)));
            toggle();
          }
        });
    }
  };

  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <h1 className="text-center">{user.id ? "Edit User" : "Add User"}</h1>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="form-control my-2"
            onChange={handleChange}
            value={form.name}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="form-control my-2"
            onChange={handleChange}
            value={form.email}
          />
          <input
            type="text"
            placeholder="Number"
            name="number"
            className="form-control my-2"
            onChange={handleChange}
            value={form.number}
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
