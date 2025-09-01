import Curso from "../Models/curso.js"; 
import connect from "./connect.js"
export default class CursoDAO {

    async gravar(curso){
    
        if (curso instanceof Curso) {
            const connection = await connect();
            const sql = "INSERT INTO CURSO (NOME, DESCRICAO, CARGA_HORARIA, VALOR) VALUES (?, ?, ?, ?)";
            const values = [curso.nome, curso.descricao, curso.cargaHoraria, curso.valor];
            const [result] = await connection.query(sql, values);
            console.log("Valores recebidos para INSERT:", curso.nome, curso.descricao, curso.cargaHoraria, curso.valor);
            connection.release();
            curso.id = result.insertId;
        }
}


    async alterar(curso){
        if (curso instanceof Curso) {
            const connection = await connect();
            const sql = "UPDATE curso SET nome = ?, descricao = ?, carga_horaria = ?, valor = ? WHERE id = ?";
            const values = [curso.nome, curso.descricao, curso.cargaHoraria, curso.valor, curso.id];
            await connection.execute(sql, values);
            connection.release();
        }
    }

    async excluir(curso){
        if (curso instanceof Curso) {
            const connection = await connect();
            const sql = "DELETE FROM curso WHERE id = ?";
            const values = [curso.id];
            await connection.execute(sql, values);
            connection.release();
        }
    }

    async consultar(){
        const connection = await connect();
        const sql = "SELECT * FROM curso";
        const [registers] = await connection.query(sql);
        await connection.release();

        let listCursos = [];

        for (const register of registers) {
        const curso = new Curso(register.id, register.nome, register.descricao, register.carga_horaria, register.valor);
        listCursos.push(curso);
}
        return listCursos;
}
}