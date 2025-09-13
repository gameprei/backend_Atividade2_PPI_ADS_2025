import CursoDAO from "./DB/cursoDAO.js";
import Curso from "./Models/curso.js";

const curso = new Curso(0, "CURSO DE HTML", "Curso de PROGRAMAÇÃO WEB HTML", 80, 99.00);

const cursoDAO = new CursoDAO(); 
const excluirCurso = new Curso(1); 
await cursoDAO.excluir(excluirCurso); 
console.log('Curso excluído com sucesso!')
