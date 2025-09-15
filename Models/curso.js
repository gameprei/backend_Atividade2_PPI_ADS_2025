import CursoDAO from "../DB/cursoDAO.js";


export default class Curso {
    #id;
    #nome;
    #descricao;
    #cargaHoraria;
    #valor;

    constructor(id = 0, nome = "", descricao = "", cargaHoraria = 0, valor = 0.0) {
        this.#id = id;
        this.#nome = nome;
        this.#descricao = descricao;
        this.#cargaHoraria = cargaHoraria;
        this.#valor = valor;

    } get id() {
        return this.#id;
    }
    set id(id) {
        this.#id = id;
    }
    get nome() {
        return this.#nome;
    }
    set nome(nome) {
        this.#nome = nome;
    }
    get descricao() {
        return this.#descricao;
    }
    set descricao(descricao) {
        this.#descricao = descricao;
    }
    get cargaHoraria() {
        return this.#cargaHoraria;
    }
    set cargaHoraria(cargaHoraria) {
        this.#cargaHoraria = cargaHoraria;
    }
    get valor() {
        return this.#valor;
    }
    set valor(valor) {
        this.#valor = valor;
    }

    toString() {
        return `\n ID: ${this.#id}\n \n 
        Nome: ${this.#nome}\n \n 
        Descrição: ${this.#descricao}\n \n 
        Carga Horária: ${this.#cargaHoraria}\n \n 
        Valor: ${this.#valor}\n`;
    }

    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            descricao: this.#descricao,
            cargaHoraria: this.#cargaHoraria,
            valor: this.#valor
        };
    }

    async gravar() {
        const cursoDAO = new CursoDAO();
        await cursoDAO.gravar(this);
    }
    async alterar() {
        const cursoDAO = new CursoDAO();
        await cursoDAO.alterar(this);
    }
   
    async excluir(id) {
        const cursoDAO = new CursoDAO();
        if (id !== undefined && id !== null) {
            await cursoDAO.excluir(id);
        } else {
            await cursoDAO.excluir(this.#id);
        }
    }
    async consultar(id) { 
        const cursoDAO = new CursoDAO();
        return await cursoDAO.consultar(id);
    }
}