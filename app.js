"use strict";

// Array donde se guardan los nombres
let amigos = [];

// Helpers
const $ = (id) => document.getElementById(id);
const inputAmigo = () => $("amigo");

/** Agrega un amigo desde el input al array, valida y refresca la UI */
function agregarAmigo() {
  const nombre = (inputAmigo().value || "").trim();

  if (!nombre) {
    alert("Por favor, inserte un nombre.");
    return;
  }

  amigos.push(nombre);        // 1) actualizar array
  inputAmigo().value = "";    // 2) limpiar input
  actualizarLista();          // 3) refrescar <ul> de amigos
  limpiarResultado();         // 4) limpiar el resultado del sorteo (si lo hubiera)
  inputAmigo().focus();       // UX: volver al input
}

/** Dibuja la lista <ul id="listaAmigos"> a partir del array `amigos` */
function actualizarLista() {
  const ul = $("listaAmigos");
  ul.innerHTML = ""; // limpiar para evitar duplicados

  for (let i = 0; i < amigos.length; i++) {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${amigos[i]}`;
    ul.appendChild(li);
  }
}

/** Sortea un amigo del array y lo muestra en <ul id="resultado"> */
function sortearAmigo() {
  if (amigos.length === 0) {
    alert("No hay amigos para sortear.");
    return;
  }

  const indice = Math.floor(Math.random() * amigos.length);
  const elegido = amigos[indice];

  const ulResultado = $("resultado");
  ulResultado.innerHTML = ""; // limpiar resultado previo

  const li = document.createElement("li");
  li.textContent = `Amigo secreto: ${elegido}`;
  ulResultado.appendChild(li);
}

/** Limpia el resultado del sorteo */
function limpiarResultado() {
  $("resultado").innerHTML = "";
}

// Calidad de vida: permitir Enter para agregar
document.addEventListener("DOMContentLoaded", () => {
  inputAmigo().addEventListener("keydown", (e) => {
    if (e.key === "Enter") agregarAmigo();
  });
});
