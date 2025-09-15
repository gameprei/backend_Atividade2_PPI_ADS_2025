import Curso from "../Models/curso.js";
import connect from "./connect.js";
export default class CursoDAO {


    async gravar(curso) {
        if (curso instanceof Curso) {
            const connection = await connect();
            const sql = "INSERT INTO curso (nome, descricao, carga_horaria, valor) VALUES (?, ?, ?, ?)";
            const values = [curso.nome, curso.descricao, curso.cargaHoraria, curso.valor];
            const [result] = await connection.query(sql, values);
            connection.release();
            curso.id = result.insertId;
        }
    }

    async alterar(curso) {
        if (curso instanceof Curso) {
            const connection = await connect();
            const sql = "UPDATE curso SET nome = ?, descricao = ?, carga_horaria = ?, valor = ? WHERE id = ?";
            const values = [curso.nome, curso.descricao, curso.cargaHoraria, curso.valor, curso.id];
            await connection.execute(sql, values);
            connection.release();
        }
    }

    async excluir(id) {
        const connection = await connect();
        const sql = "DELETE FROM curso WHERE id = ?";
        const values = [id];
        await connection.execute(sql, values);
        connection.release();
    }

    async consultar(id) {
        const connection = await connect();
        let sql, values;

        if (id) {
            sql = "SELECT * FROM curso WHERE id = ?";
            values = [id];
        } else {
            sql = "SELECT * FROM curso";
            values = [];
        }
        const [rows] = await connection.query(sql, values);
        connection.release();
        let listCursos = [];

        for (const row of rows) {
            const curso = new Curso(
                row.ID,
                row.NOME,
                row.DESCRICAO,
                row.CARGA_HORARIA,
                row.VALOR
            );
            listCursos.push(curso);
        }
        return listCursos;
    }
}