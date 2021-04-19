"use-strict";

const users = [];

/* VARIABLES GLOBALES*/
const CREATE = "create";
const EDIT = "edit";
let USERID = 0;

/*************************************************************/
//Imprime los usuarios en el HTML

const printUser = (dataUsers) => {
  const tbody_content = document.getElementById("tbody-users");
  tbody_content.innerHTML = "";
  dataUsers.forEach((user) => {
    const user_HTML = `<tr>
                            <td>${user.marca}</td>
                            <td>${user.modelo}</td>
                            <td>${user.color}</td>
                            <td>${user.año}</td>
                            <td>${user.precio}</td>
                            <td>
                                <button class="btn btn-danger" onclick="deleteUser(${user.id})"><i class="bi bi-trash"></i> Eliminar</button>
                                <button class="btn btn-warning" onclick="showFormEditUser(${user.id})"><i class="bi bi-arrow-repeat"></i> Editar</button>
                            </td>
                        </tr>`;
    tbody_content.innerHTML += user_HTML;
  });
};

printUser(users);

/********************************************************************************************/
//Abre el formualrio para crear o actualizar usuarios
const openForm = () => {
  document.getElementById("form-create-users").classList.remove("d-none"),
    btnCreate();
};
/*********************************************************************************************/
/********************************************************************************************/
//Oculta el formualrio para crear o actualizar usuarios
const hidenForm = () =>
  document.getElementById("form-create-users").classList.add("d-none");
/*********************************************************************************************/
/*************************************************************/
//resetea los valores del formulario en blanco
const resetForm = () => document.getElementById("user-form").reset();
/*************************************************************/
/**************************************************************************/
//Obtiene el id del boton del formulario
const getIdSubmmitButton = () => document.getElementById("btn-submmit-form");
/****************************************************************************/

/****************************************************************************/
//Crea un nuevo usuario
const createUser = () => {
  const userMarca = document.getElementById("marca").value;
  const userModelo = document.getElementById("modelo").value;
  const userColor = document.getElementById("color").value;
  const userAño = document.getElementById("año").value;
  const userPrecio = document.getElementById("precio").value;

  const newUser = {
    id: generateId(),
    marca: userMarca,
    modelo: userModelo,
    color: userColor,
    año: userAño,
    precio: userPrecio,
  };

  users.push(newUser);
  printUser(users);
  resetForm();
  hidenForm();
};
/****************************************************************************/

/*************************************************************/
//Genera un id para cada registro nuevo
const generateId = () => {
  let biggerID = 0;
  users.forEach((user) => {
    if (user.id > biggerID) {
      biggerID = user.id;
    }
  });
  return (biggerID += 1);
};
/*************************************************************/

/*************************************************************/
//Elimina a un usuario por su id
const deleteUser = (userID) => {
  const i = users.findIndex((user) => user.id === userID);
  users.splice(i, 1);
  printUser(users);
};
/*************************************************************/

/*************************************************************/
//Abre el formulario mostrando los datos para hacer editados
const showFormEditUser = (userID) => {
  const i = users.findIndex((user) => user.id === userID);
  const user = users[i];
  document.getElementById("marca").value = user.marca;
  document.getElementById("modelo").value = user.modelo;
  document.getElementById("color").value = user.color;
  document.getElementById("año").value = user.año;
  document.getElementById("precio").value = user.precio;
  USERID = i;
  openForm();
  btnEditar();
};
/*************************************************************/

/*************************************************************/
//Cambia los datos del usuario
const editUser = () => {
  users[USERID].marca = document.getElementById("marca").value;
  users[USERID].modelo = document.getElementById("modelo").value;
  users[USERID].color = document.getElementById("color").value;
  users[USERID].año = document.getElementById("año").value;
  users[USERID].precio = document.getElementById("precio").value;
  resetForm();
  hidenForm();
  printUser(users);
};

/*************************************************************/

/*************************************************************/
//Cambia el boton del fomrulario a editar
const btnEditar = () => {
  const button = getIdSubmmitButton();
  button.innerHTML = "Editar";
  button.classList.remove("btn-primary");
  button.classList.add("btn-warning");
  button.value = EDIT;
};
/*************************************************************/

/*************************************************************/
//Cambia el boton del formulario a crear
const btnCreate = () => {
  const button = getIdSubmmitButton();
  button.innerHTML = "Guardar";
  button.classList.add("btn-primary");
  button.classList.remove("btn-warning");
  button.value = CREATE;
};
/*************************************************************/

/*************************************************************/
//Accion que realiza el boton
const messageAction = () => {
  const touchBtn = getIdSubmmitButton().value;
  if (touchBtn === EDIT) {
    editUser();
  } else {
    createUser();
  }
};
/*************************************************************/
