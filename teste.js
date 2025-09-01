import CursoDAO from "./DB/cursoDAO.js";
import Curso from "./Models/curso.js";

const curso = new Curso(0, "PROGRAMAÇÃO JAVA", "Curso de Algoritmos em JAVA", 170, 900.00);

//await curso.gravar();
//console.log('Curso gravado com sucesso!');
//console.log(curso.toString());

curso.id = 5;
curso.nome = "PROGRAMAÇÃO JAVA - ALTERADO";
curso.descricao = "Curso de Algoritmos em JAVA - ALTERADO";
curso.cargaHoraria = 180;
curso.valor = 950.00;
await curso.alterar();
console.log('Curso alterado com sucesso!');
console.log(curso.toString());



const cursoDAO = new CursoDAO(); 
const excluirCurso = new Curso(5); 
await cursoDAO.excluir(excluirCurso); 
console.log('Curso excluído com sucesso!')

const listCursos = await curso.consultar();
for (const curso of listCursos) {
    console.log(curso.toString());
}