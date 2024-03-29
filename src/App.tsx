import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../service/firebase-config";

interface User {
  id: string;
  name: string;
  email: string;
  age: string;
}

export function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [tempId, setTempId] = useState("");

  const userCollectionRef = collection(db, "users");

  async function createUser() {
    const user = await addDoc(userCollectionRef, {
      name,
      email,
      age,
    });

    console.log(user);
  }

  async function deleteUser(id: string) {
    const user = doc(db, "users", id);
    await deleteDoc(user);
  }

  async function updateUser(user: User) {
    setIsUpdate(true);
    setTempId(user.id);
    setName(user.name);
    setEmail(user.email);
    setAge(user.age);
  }

  async function handleSubmitChange() {
    const user = doc(db, "users", tempId);
    await updateDoc(user, {
      name,
      email,
      age,
      id: tempId,
    });

    setName("");
    setEmail("");
    setAge("");
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(
        data.docs.map((doc: any) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };

    getUsers();
  }, []);

  return (
    <>
      <h1>Cadastrar no firebase</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      {isUpdate ? (
        <>
          <button onClick={handleSubmitChange}>Atualizar</button>
          <button
            onClick={() => {
              setIsUpdate(false);
              setName("");
              setEmail("");
              setAge("");
            }}
          >
            Cancelar
          </button>
        </>
      ) : (
        <button onClick={createUser}>Cadastrar</button>
      )}

      <hr />

      <ul>
        {users.map((user: User) => {
          return (
            <div key={user.id}>
              <li>{user.name}</li>
              <li>{user.email}</li>
              <li>{user.age}</li>
              <button onClick={() => deleteUser(user.id)}>Remover</button>
              <button onClick={() => updateUser(user)}>Update</button>
              <br />
              <br />
            </div>
          );
        })}
      </ul>
    </>
  );
}
