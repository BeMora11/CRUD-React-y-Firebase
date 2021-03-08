import React, { useState, useEffect } from "react";
import { store } from "./FirebaseConfig";

const App = () => {
  const [editar, setEditar] = useState(null);
  const [nombre, setNombre] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setID] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);

  const addUser = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      setError("El campo nombre esta vacio");
      return;
    }
    if (!phone.trim()) {
      setError("El campo telefono esta vacio");
      return;
    }

    const usuario = {
      nombre: nombre,
      telefono: phone,
    };

    try {
      const data = await store.collection("agenda").add(usuario);
      getUsers();
      console.log("Usuario añadido");
    } catch (err) {
      console.log(err);
    }
    setNombre("");
    setPhone("");
  };

  const getUsers = async () => {
    const { docs } = await store.collection("agenda").get();
    const nuevoArray = docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));
    setUsuarios(nuevoArray);
  };

  const deleteUser = async (id) => {
    try {
      await store.collection("agenda").doc(id).delete();
      getUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const editUser = async (id) => {
    try {
      const data = await store.collection("agenda").doc(id).get();
      const { nombre, telefono } = data.data();
      setNombre(nombre);
      setPhone(telefono);
      setID(id);
      setEditar(true);
      // console.log(data.data());
    } catch (err) {
      console.log(err);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      setError("El campo nombre esta vacio");
      return;
    }
    if (!phone.trim()) {
      setError("El campo telefono esta vacio");
      return;
    }

    const usuario = {
      nombre: nombre,
      telefono: phone,
    };

    try {
      const data = await store.collection("agenda").doc(id).set(usuario);
      getUsers();
      console.log("Usuario actualizado");
    } catch (err) {
      console.log(err);
    }
    setNombre("");
    setPhone("");
    setEditar(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col">
          <h2 className="text-center">Formulario de usuarios</h2>
          <form onSubmit={editar ? updateUser : addUser}>
            <div className="form-group">
              <input
                type="text"
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
                className="form-control"
                placeholder="Ingresa el nombre"
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                className="form-control"
                placeholder="Ingresa el numero telefónico"
              />
            </div>
            {editar ? (
              <input
                type="submit"
                value="Guardar cambios"
                className="btn btn-sm btn-dark btn-block"
              />
            ) : (
              <input
                type="submit"
                value="Registrar usuario"
                className="btn btn-sm btn-dark btn-block"
              />
            )}
            {error ? (
              <div className="alert alert-danger mt-3">{error}</div>
            ) : (
              <span></span>
            )}
          </form>
        </div>
        <div className="col">
          <h2 className="text-center">Lista de usuarios</h2>
          {usuarios.length !== 0 ? (
            <ul className="list-group">
              {usuarios.map((item) => (
                <li className="list-group-item" key={item.id}>
                  {item.nombre} -- {item.telefono}
                  <div className="float-right">
                    <button
                      onClick={(id) => {
                        editUser(item.id);
                      }}
                      className="btn btn-sm btn-info"
                    >
                      Editar
                    </button>
                    <button
                      onClick={(id) => {
                        deleteUser(item.id);
                      }}
                      className="btn btn-sm btn-danger ml-2"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <span className="alert alert-info text-center d-block">
              No hay datos registrados
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
