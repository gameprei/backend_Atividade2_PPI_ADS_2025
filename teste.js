import Curso from "./Models/curso.js";

const curso = new Curso(0, "Programação Python", "Curso de Algoritmos em Python", 160, 1200.00);

await curso.gravar();
console.log('Curso gravado com sucesso!');
console.log(curso.toString());

// Verifica se gravou mesmo
const cursos = await curso.consultar();
console.log("Cursos no banco:", cursos.map(c => c.toString()).join("\n"));