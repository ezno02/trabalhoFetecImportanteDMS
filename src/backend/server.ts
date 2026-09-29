// Caminho: src/backend/server.ts

import { initializeApp } from 'firebase/';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';

// 1. Configuração do Firebase (Variáveis provisórias, sem dotenv por enquanto)
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

// 2. Inicialização do App e do Banco de Dados (Firestore)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 3. Tipagem e referências
const COLLECTION_NAME = 'usuarios'; // Exemplo de coleção

export interface Usuario {
  id?: string;
  nome: string;
  email: string;
  idade: number;
}

// =======================================================
// CRUD: CREATE (Criar um novo documento)
// =======================================================
export const criarUsuario = async (usuario: Omit<Usuario, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), usuario);
    return docRef.id;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
};

// =======================================================
// CRUD: READ (Ler/Listar todos os documentos)
// =======================================================
export const listarUsuarios = async (): Promise<Usuario[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const usuarios: Usuario[] = [];
    
    querySnapshot.forEach((doc) => {
      usuarios.push({
        id: doc.id,
        ...doc.data()
      } as Usuario);
    });
    
    return usuarios;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};

// =======================================================
// CRUD: UPDATE (Atualizar um documento existente)
// =======================================================
export const atualizarUsuario = async (id: string, dadosAtualizados: Partial<Usuario>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, dadosAtualizados);
  } catch (error) {
    console.error(`Erro ao atualizar o usuário ${id}:`, error);
    throw error;
  }
};

// =======================================================
// CRUD: DELETE (Deletar um documento)
// =======================================================
export const deletarUsuario = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Erro ao deletar o usuário ${id}:`, error);
    throw error;
  }
};