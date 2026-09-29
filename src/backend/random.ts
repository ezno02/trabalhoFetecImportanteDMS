import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// 1. Configuração do Firebase (Substitua pelos seus dados)
const firebaseConfig = {
  apiKey: "AIzaSyDfKQlIYnVO2_B9tmg5EyNbI-cqW_hci7M",
  authDomain: "projeto-fetec.firebaseapp.com",
  projectId: "projeto-fetec",
  storageBucket: "projeto-fetec.firebasestorage.app",
  messagingSenderId: "1008249489763",
  appId: "1:1008249489763:web:5d5245588e205e1e9cab56",
  measurementId: "G-7PVP5XTBHR"
};

// 2. Inicialização do App e Serviços
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// 3. Função para buscar uma disciplina aleatória da coleção
async function getRandomDisciplina() {
    try {
        // Cria uma referência para a coleção "disciplinas"
        const disciplinasRef = collection(db, "disciplinas");

        // Puxa todos os documentos dessa coleção
        const querySnapshot = await getDocs(disciplinasRef);

        if (querySnapshot.empty) {
            console.log("Nenhuma disciplina encontrada na coleção!");
            return null;
        }

        // Transforma os documentos em um array na memória
        const docsArray = querySnapshot.docs;

        // Sorteia um índice aleatório baseado no tamanho do array
        const randomIndex = Math.floor(Math.random() * docsArray.length);
        const selectedDoc = docsArray[randomIndex];

        // Retorna o ID junto com os dados do documento
        return {
            id: selectedDoc.id,
            ...selectedDoc.data()
        };

    } catch (error) {
        console.error("Erro ao buscar disciplina aleatória:", error);
        return null;
    }
}

// 4. Executando a função
async function runApp() {
    console.log("Buscando disciplina aleatória...");
    const disciplina = await getRandomDisciplina();

    if (disciplina) {
        console.log(`ID Sorteado: ${disciplina.id}`);
        console.log("Dados do documento:", disciplina);
    }
}

runApp();