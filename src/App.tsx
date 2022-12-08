import { addDoc, collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../service/firebase-config'

interface User {
  id: string;
  name: string;
  email: string;
  age: string;
}

export function App() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [users, setUsers] = useState<User[]>([])

  const userCollectionRef = collection(db, 'users')

  async function createUser() {
    const user = await addDoc(userCollectionRef, {
      name,
      email,
      age
    })

    console.log(user)
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef)
      setUsers(data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })))
    }

    getUsers()
  }, [])

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
      <button onClick={createUser}>Cadastrar</button>

      <hr />

      <ul>
        {users.map((user) => {
          return (
            <div key={user.id}>
              <li>{user.name}</li>
              <li>{user.email}</li>
              <li>{user.age}</li>
              <br />
            </div>
          )
        })}
      </ul>
    </>
  )
}
