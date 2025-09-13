import Curso from "../Models/curso";
export default class CursoController{
 
    gravar(requisicao, resposta){
        if (requisicao.method === "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            if (dados.id && dados.nome && dados.descricao && dados.cargaHoraria && dados.valor){
                const curso = new Curso(dados.id, dados.nome, dados.descricao, dados.cargaHoraria, dados.valor )
                curso.gravar()
                .then(()=>{
                    resposta.status(200).json({
                        status: true,
                        "mensagem": "Curso gravado com sucesso!"
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        status: false,
                        "mensagem": "Erro ao gravar o curso" + erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    status: false,
                    "mensagem": "Informe todas as informações do curso"
                })
            };
        }
        else{
            resposta.status(400).json({
                status: false,
                "mensagem": "Requisição inválida"
            })
        }
    };

    alterar(requisicao, resposta){
        if (requisicao.method === "PUT" || requisicao.method === "PATCH" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const id = requisicao.params.id;

            if (dados.id && dados.nome && dados.descricao && dados.cargaHoraria && dados.valor){
                const curso = new Curso(id, dados.nome, dados.descricao, dados.cargaHoraria, dados.valor )
                curso.alterar()
                .then(()=>{
                    resposta.status(200).json({
                        status: true,
                        "mensagem": "Curso alterado com sucesso!"
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        status: false,
                        "mensagem": "Erro ao alterar o curso" + erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    status: false,
                    "mensagem": "Informe todas os campos do curso"
                })
            };
        }
        else{
            resposta.status(400).json({
                status: false,
                "mensagem": "Requisição inválida"
            })
        }
    };

    excluir(requisicao, resposta){
        if (requisicao.method === "DELETE"){
            const id = requisicao.params.id;
            if (id){
                const curso = new Curso(id);
                curso.consultar(id)
                .then((listCursos)=>{
                    const curso = listCursos[0];
                    if (curso){
                        curso.excluir()
                        .then(()=>{
                            resposta.status(200).json({
                                status: true,
                                "mensagem": "Curso excluido com sucesso"
                            });
                        });
                    }
                    else{
                        resposta.status(404).json({
                            status: false,
                            "mensagem": "Curso não encontrado"
                        })
                    }
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        status: false,
                        "mensagem": "Erro ao excluir curso:" + erro.message
                    });
                });
            }
        }
        else{
            resposta.status(400).json({
                status: false,
                "mensagem": "Requisição inválida"
            });
        };
    };
    
    consultar(requisicao, resposta){
        if( requisicao.method === "GET"){
            
            const id = requisicao.params.id;
            const curso = Curso();
            if (id){
                curso.consultar(id)
                .then((listCursos)=>{
                    if (listCursos.length > 0){
                        resposta.status(200).json({
                        status: true,
                        "Mensagem": "Consulta realizada com sucesso",
                        curso: listCursos[0]
                    });
                    };
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        status: false,
                        "mensagem": "Erro ao consultar o curso"
                    })
                });
            }
            else{
                curso.consultar()
                .then((listCursos)=>{
                    resposta.status(200).json({
                        status: true,
                        "mensagem": "Consulta realizada com sucesso",
                        curso: listCursos[0]
                    })
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        status: false,
                        "mensagem": "Erro ao consultar cursos"
                    })
                });
            }
        }
        else{
            resposta.status(400).json({
                status: false,
                "mensagem": "Requisição invállida"
            });
        };
    };
}