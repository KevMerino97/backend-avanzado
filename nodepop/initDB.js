"use strict";

require("dotenv").config();

// conexión a la base de datos
const dbConnection = require("./lib/connectMongoose");

// modelo de agentes
const { Anuncio, Usuario } = require("./models");
const productData = require("./initialProducts.json");

main().catch((err) => console.log("Hubo un error", err));

async function main() {
  await initProducts();

  await initUsers();

  dbConnection.close();
}

async function initProducts() {
  // elimino todos los documentos de la colección de agentes
  const deleted = await Anuncio.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} productos.`);

  // crear agentes iniciales
  const products = await Anuncio.insertMany(productData.products);
  console.log(`Creados ${products.length} productos`);
}

async function initUsers() {
  // elimino todos los documentos de la colección de agentes
  const deleted = await Usuario.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} usuarios.`);

  // crear agentes iniciales
  const users = await Usuario.insertMany([
    {
      email: "admin@example.com",
      password: await Usuario.hashPassword("1234"),
    },
    {
      email: "user@example.com",
      password: await Usuario.hashPassword("1234"),
    },
  ]);
  console.log(`Creados ${users.length} usuarios`);
}
