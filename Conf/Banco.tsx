import * as SQLite from "expo-sqlite";

// abrir conexão
export async function Conexao() {
  const db = await SQLite.openDatabaseAsync("meubanco.db");
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
