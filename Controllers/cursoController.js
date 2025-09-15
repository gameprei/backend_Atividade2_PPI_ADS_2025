import Curso from "../Models/curso.js";
export default class CursoController {


    gravar(requisicao, resposta) {
        if (requisicao.method === "POST" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            if (dados.id && dados.nome && dados.descricao && dados.cargaHoraria && dados.valor) {
                const curso = new Curso(dados.id, dados.nome, dados.descricao, dados.cargaHoraria, dados.valor);
                curso.gravar()
                    .then(() => {
                        return resposta.status(200).json({
                            status: true,
                            "mensagem": "Curso gravado com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        return resposta.status(500).json({
                            status: false,
                            "mensagem": "Erro ao gravar o curso: " + erro.message
                        });
                    });
            }
            else {
                return resposta.status(400).json({
                    status: false,
                    "mensagem": "Informe todas as informações do curso"
                });
            };
        }
        else {
            return resposta.status(400).json({
                status: false,
                "mensagem": "Requisição inválida"
            });
        }
    }

    alterar(requisicao, resposta) {
        if ((requisicao.method === "PUT" || requisicao.method === "PATCH") && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const id = requisicao.params.id ? parseInt(requisicao.params.id, 10) : null; // converte id para Inteiro, não dá mais eroo de value.tostring() no mysql


            if (dados.id && dados.nome && dados.descricao && dados.cargaHoraria && dados.valor) {
                const curso = new Curso(id, dados.nome, dados.descricao, dados.cargaHoraria, dados.valor);
                curso.alterar()
                    .then(() => {
                        return resposta.status(200).json({
                            status: true,
                            "mensagem": "Curso alterado com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        return resposta.status(500).json({
                            status: false,
                            "mensagem": "Erro ao alterar o curso: " + erro.message
                        });
                    });
            }
            else {
                return resposta.status(400).json({
                    status: false,
                    "mensagem": "Informe todos os campos do curso"
                });
            };
        }
        else {
            return resposta.status(400).json({
                status: false,
                "mensagem": "Requisição inválida"
            });
        }
    };

    excluir(requisicao, resposta) {
        if (requisicao.method === "DELETE") {
            const id = requisicao.params.id ? parseInt(requisicao.params.id, 10) : null;
            if (id) {
                const curso = new Curso();
                curso.excluir(id)
                    .then(() => {
                        return resposta.status(200).json({
                            status: true,
                            "mensagem": "Curso excluído com sucesso"
                        });
                    })
                    .catch((erro) => {
                        return resposta.status(500).json({
                            status: false,
                            "mensagem": "Erro ao excluir curso: " + erro.message
                        });
                    });
            } else {
                return resposta.status(400).json({
                    status: false,
                    "mensagem": "Informe o id para exclusão"
                });
            }
        }
        else {
            return resposta.status(400).json({
                status: false,
                "mensagem": "Requisição inválida"
            });
        };
    };

    consultar(requisicao, resposta) {
        if (requisicao.method === "GET") {
            const curso = new Curso();
            const id = requisicao.params.id ? parseInt(requisicao.params.id, 10) : null;
            if (id) {
                curso.consultar(id)
                    .then((listCursos) => {
                        if (listCursos.length > 0) {
                            return resposta.status(200).json({
                                status: true,
                                "mensagem": "Consulta realizada com sucesso",
                                curso: listCursos[0]
                            });
                        } else {
                            return resposta.status(404).json({
                                status: false,
                                "mensagem": "Curso não encontrado"
                            });
                        }
                    })
                    .catch((erro) => {
                        return resposta.status(500).json({
                            status: false,
                            "mensagem": "Erro ao consultar o curso: " + erro.message
                        });
                    });
            }
            else {
                curso.consultar()
                    .then((listCursos) => {
                        return resposta.status(200).json({
                            status: true,
                            "mensagem": "Consulta realizada com sucesso",
                            cursos: listCursos
                        });
                    })
                    .catch((erro) => {
                        return resposta.status(500).json({
                            status: false,
                            "mensagem": "Erro ao consultar cursos: " + erro.message
                        });
                    });
            }
        }
    }
}