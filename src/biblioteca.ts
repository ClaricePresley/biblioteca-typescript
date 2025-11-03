// Tipos e Interfaces

type Livro = {
  isbn: string;
  titulo: string;
  autor: string;
  ano: number;
  disponivel: boolean;
  valorMultaPorDia: number; 
};

type Emprestimo = {
  isbn: string;
  dataEmprestimo: Date;
  prazoDevolucao: Date;
  dataDevolucao?: Date;
};

// Funções puras de gerenciamento

// Adiciona um novo livro ao acervo
function adicionarLivro(acervo: Livro[], novoLivro: Livro): Livro[] {
  return [...acervo, novoLivro];
}

// Busca livros por ISBN
function buscarPorISBN(acervo: Livro[], isbn: string): Livro | undefined {
  return acervo.find((livro) => livro.isbn === isbn);
}

// Busca livros por título
function buscarPorTitulo(acervo: Livro[], titulo: string): Livro[] {
  return acervo.filter((livro) =>
    livro.titulo.toLowerCase().includes(titulo.toLowerCase())
  );
}

// Busca livros por ano
function buscarPorAno(acervo: Livro[], ano: number): Livro[] {
  return acervo.filter((livro) => livro.ano === ano);
}

// Registrar empréstimo (marcar como indisponível)
function registrarEmprestimo(acervo: Livro[], isbn: string): Livro[] {
  return acervo.map((livro) =>
    livro.isbn === isbn ? { ...livro, disponivel: false } : livro
  );
}

// Listar apenas livros disponíveis
function listarDisponiveis(acervo: Livro[]): Livro[] {
  return acervo.filter((livro) => livro.disponivel);
}

// Calcular valor da multa

function calcularMultaSimples(emprestimo: Emprestimo, valorPorDia: number): number {
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
  } else {
    return 0; 
  }
}



// Exemplo de uso

let acervo: Livro[] = [];

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

const emprestimo: Emprestimo = {
  isbn: "978-85-333-0227-3",
  dataEmprestimo: new Date("2025-10-01"),
  prazoDevolucao: new Date("2025-10-10"),
  dataDevolucao: new Date("2025-10-15"),
};

console.log(
  "Multa:",
  calcularMultaSimples(emprestimo, 2) // 2 reais por dia de atraso
);