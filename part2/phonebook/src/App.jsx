import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 },
  ]) 
  const [newName, setNewName] = useState('aa')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      id: persons.length + 1,
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        <div>
          </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(p => <div key={p.id}>{p.name}</div>)}
      </div>

    </div>
  )
}

export default App