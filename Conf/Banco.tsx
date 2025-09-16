import * as SQLite from "expo-sqlite";

// abrir conexão
export async function Conexao() {
  const db = await SQLite.openDatabaseAsync("pambanco.db");
  console.log("📂 Banco aberto:", db ? "OK" : "Falhou");
  return db;
}

// criar tabela
export async function createTable(db: SQLite.SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS USUARIO (
      ID_US INTEGER PRIMARY KEY AUTOINCREMENT,
      NOME_US TEXT NOT NULL,
      EMAIL_US TEXT NOT NULL
    );
  `);
  console.log("🛠️ Tabela USUARIO criada/verificada");
}

// inserir usuário
export async function inserirUsuario(
  db: SQLite.SQLiteDatabase,
  nome: string,
  email: string
) {
  await db.runAsync(
    `INSERT INTO USUARIO (NOME_US, EMAIL_US) VALUES (?, ?)`,
    [nome, email]
  );
  console.log("✅ Usuário inserido:", nome, email);
}

// selecionar usuários (com alias para simplificar)
export async function selectUsuario(db: SQLite.SQLiteDatabase) {
  const result = await db.getAllAsync(`
    SELECT 
      ID_US as id,
      NOME_US as nome,
      EMAIL_US as email
    FROM USUARIO
  `);
  console.log("📋 Usuários carregados:", result);
  return result;
}

// atualizar usuário
export async function updateUsuario(
  db: SQLite.SQLiteDatabase,
  id: number,
  nome: string,
  email: string
) {
  await db.runAsync(
    `UPDATE USUARIO SET NOME_US = ?, EMAIL_US = ? WHERE ID_US = ?`,
    [nome, email, id]
  );
  console.log("✏️ Usuário atualizado:", { id, nome, email });
}

// deletar usuário
export async function deleteUsuario(db: SQLite.SQLiteDatabase, id: number) {
  await db.runAsync(`DELETE FROM USUARIO WHERE ID_US = ?`, [id]);
  console.log("🗑️ Usuário deletado ID:", id);
}


// criar tabela livros
export async function createTableLivros(db: SQLite.SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS LIVROS (
      ID_LIVRO INTEGER PRIMARY KEY AUTOINCREMENT,
      TITULO TEXT NOT NULL,
      AUTOR TEXT NOT NULL,
      GENERO TEXT NOT NULL,
    );
  `);
  console.log("🛠️ Tabela LIVROS criada/verificada");
}

// inserir livro
export async function inserirLivro(
  db: SQLite.SQLiteDatabase,
  titulo: string,
  autor: string,
  genero: string,
) {
  await db.runAsync(
    `INSERT INTO LIVROS (TITULO, AUTOR, GENERO) VALUES (?, ?, ?)`,
    [titulo, autor, genero]
  );
  console.log("✅ Livro inserido:", titulo);
}

// selecionar livros (com alias para o React usar)
export async function selectLivros(db: SQLite.SQLiteDatabase) {
  const result = await db.getAllAsync(`
    SELECT 
      ID_LIVRO as id,
      TITULO as titulo,
      AUTOR as autor,
      GENERO as genero,
    FROM LIVROS
  `);
  console.log("📋 Livros carregados:", result);
  return result;
}

// atualizar livro
export async function updateLivro(
  db: SQLite.SQLiteDatabase,
  id: number,
  titulo: string,
  autor: string,
  genero: string,
) {
  await db.runAsync(
    `UPDATE LIVROS SET TITULO = ?, AUTOR = ?, GENERO = ? WHERE ID_LIVRO = ?`,
    [titulo, autor, genero, id]
  );
  console.log("✏️ Livro atualizado:", { id, titulo });
}

// deletar livro
export async function deleteLivro(db: SQLite.SQLiteDatabase, id: number) {
  await db.runAsync(`DELETE FROM LIVROS WHERE ID_LIVRO = ?`, [id]);
  console.log("🗑️ Livro deletado ID:", id);
}
