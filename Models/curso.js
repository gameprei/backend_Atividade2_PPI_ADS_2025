import CursoDAO from "../DB/cursoDAO.js";


export default class Curso {
    #id;
    #nome;
    #descricao;
    #cargaHoraria;
    #instrutor;
    #nivel;
    #vagas;
    #valor;

    constructor(id = 0, nome = "", descricao = "", cargaHoraria = 0, instrutor = "", nivel = "", vagas = 0, valor = 0.0) {
        this.#id = id;
        this.#nome = nome;
        this.#descricao = descricao;
        this.#cargaHoraria = cargaHoraria;
        this.#instrutor = instrutor;
        this.#nivel = nivel;
        this.#vagas = vagas;
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
    get instrutor(){
        return this.#instrutor;
    }
    set instrutor(instrutor){
        this.#instrutor = instrutor;
    }
    get nivel(){
        return this.#nivel;
    }
    set nivel(nivel){
        this.#nivel = nivel;
    }
    get vagas(){
        return this.#vagas;
    }
    set vagas(vagas){
        this.#vagas = vagas;
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
        Instrutor: ${this.#instrutor}\n \n
        Nível: ${this.#nivel} \n \n
        Vagas: ${this.#vagas} \n \n
        Valor: ${this.#valor}\n`;
    }

    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            descricao: this.#descricao,
            cargaHoraria: this.#cargaHoraria,
            instrutor: this.#instrutor,
            nivel: this.#nivel,
            vagas: this.#vagas,
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