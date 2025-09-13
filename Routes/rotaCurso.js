import { Router } from "express";
import CursoController from "../Models/curso.js";

const cursoRouter = Router();
const cursoCtrl = new CursoController();
cursoRouter.get("/:id", cursoCtrl.consultar)
.get("/", cursoCtrl.consultar)
.post("/", cursoCtrl.gravar)
.put("/:id", cursoCtrl.alterar)
.delete("/:id", cursoCtrl.excluir);

export default cursoRouter;