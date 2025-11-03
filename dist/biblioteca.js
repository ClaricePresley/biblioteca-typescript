"use strict";
// Tipos e Interfaces
Object.defineProperty(exports, "__esModule", { value: true });
// Funções puras de gerenciamento
// Adiciona um novo livro ao acervo
function adicionarLivro(acervo, novoLivro) {
    return [...acervo, novoLivro];
}
// Busca livros por ISBN
function buscarPorISBN(acervo, isbn) {
    return acervo.find((livro) => livro.isbn === isbn);
}
// Busca livros por título
function buscarPorTitulo(acervo, titulo) {
    return acervo.filter((livro) => livro.titulo.toLowerCase().includes(titulo.toLowerCase()));
}
// Busca livros por ano
function buscarPorAno(acervo, ano) {
    return acervo.filter((livro) => livro.ano === ano);
}
// Registrar empréstimo (marca como indisponível)
function registrarEmprestimo(acervo, isbn) {
    return acervo.map((livro) => livro.isbn === isbn ? { ...livro, disponivel: false } : livro);
}
// Listar apenas livros disponíveis
function listarDisponiveis(acervo) {
    return acervo.filter((livro) => livro.disponivel);
}
// Calcular valor da multa
function calcularMultaSimples(emprestimo, valorPorDia) {
    // Se o livro ainda não foi devolvido, não há multa
    if (!emprestimo.dataDevolucao) {
        return 0;
    }
    // Calcula a diferença entre as datas em milissegundos
    const diferenca = emprestimo.dataDevolucao.getTime() - emprestimo.prazoDevolucao.getTime();
    // Converte a diferença para dias
    const dias = diferenca / (1000 * 60 * 60 * 24);
    // Se devolveu depois do prazo, calcula a multa
    if (dias > 0) {
        return dias * valorPorDia;
    }
    else {
        return 0;
    }
}
// Exemplo de uso
let acervo = [];
acervo = adicionarLivro(acervo, {
    isbn: "978-85-333-0227-3",
    titulo: "Estruturas de Dados em TypeScript",
    autor: "Zezinho",
    ano: 2024,
    disponivel: true,
    valorMultaPorDia: 2,
});
acervo = adicionarLivro(acervo, {
    isbn: "978-85-777-0145-1",
    titulo: "Introdução à Programação",
    autor: "Zezão",
    ano: 2022,
    disponivel: true,
    valorMultaPorDia: 1.5,
});
console.log("Acervo completo:", acervo);
console.log(" Buscar por título:", buscarPorTitulo(acervo, "Introdução"));
console.log(" Livros disponíveis:", listarDisponiveis(acervo));
acervo = registrarEmprestimo(acervo, "978-85-333-0227-3");
console.log("Após empréstimo:", listarDisponiveis(acervo));
const emprestimo = {
    isbn: "978-85-333-0227-3",
    dataEmprestimo: new Date("2025-10-01"),
    prazoDevolucao: new Date("2025-10-10"),
    dataDevolucao: new Date("2025-10-15"),
};
console.log("Multa:", calcularMultaSimples(emprestimo, 2) // 2 reais por dia de atraso
);
//# sourceMappingURL=biblioteca.js.map