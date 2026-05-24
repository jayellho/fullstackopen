# Rendering a collection, modules
- Tip: use `console.log` abundantly for debugging.

## Protip: VSC Snippets
- Snippets: shortcuts for quickly generating commonly re-used portions of code.
- Instructions [here](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_creating-your-own-snippets).
- Marketplace snippets [here](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets).

## JavaScript Arrays
Functional programming operators like the following will be used all the time:
- `find`
- `filter`
- `map`

## Event Handlers Revisited
Just some revision.

## Rendering Collections
Use of the `map` function:
```JavaScript
// this looks good but will throw a warning - each item should have a unique key element.
const App = (props) => {
const { notes } = props

return (
    <div>
    <h1>Notes</h1>
    <ul>
        {notes.map(note => 

        <li>
            {note.content}
        </li>
        )}
    </ul>
    </div>
    )
}
```

## Key-attribute
The below fixes the above issue with having a unique key value:
```JavaScript
const App = (props) => {
const { notes } = props

return (
    <div>
    <h1>Notes</h1>
    <ul>
        {notes.map(note => 

        <li key={note.id}>
            {note.content}
        </li>
        )}
    </ul>
    </div>
    )
}
```

## Map
- `map` always creates a new array...
- ... by using the **function** given as a parameter to the `map` method.
- e.g. `note => note.id` is an arrow function compacted.


## Anti-pattern: Array Indexes as Keys
- Passing a second parameter to the callback function of `map` retrieves indexes:
  ```JavaScript
  notes.map((note,i) => ...) // however, NOT recommended as keys as it can cause undesired problems.
  ```

## Refactoring Modules
- Destructuring is one way.
- Separating components.
- Separating components into their own modules.
- Possible directory structure:
  ```
    src/
    ├── main.jsx
    ├── App.jsx
    └── components/           # Folder for reusable components
        ├── Footer.jsx        # File named after the component
        ├── Note.jsx
        └── Notification.jsx
  ```

# Forms
## Saving the notes in the component state
```javascript
const App = (props) => {
  const [notes, setNotes] = useState(props.notes) // example of use of useState hook.


  const addNote = (event) => {  // event handler for the form element called when form is submitted.
    event.preventDefault() // prevent default action (this default action causes the page to reload, amongst other things)
    console.log('button clicked', event.target) // target of the event stored in event.target (here, it is the form).
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}
```


## Controlled component
- Question here is: how to access the data contained in the form's `input` element?
- Method 1: Use of a controlled component
```javascript
const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState( // LOOK
    'a new note...'
  ) 

  // ...


  const handleNoteChange = (event) => { // LOOK. called everytime a change occurs in the input element.
    console.log(event.target.value) // `target` here is the controlled input element.
    setNewNote(event.target.value) // `event.target.value` refers to the input value of that element.
  } // no need for `event.preventDefault()` here because no default action happens on an input change (unlike form submission)

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}
```
## Filtering Displayed Elements
```javascript
import { useState } from 'react' 
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes) 
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // ...
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)
  return (
    <div>
      <h1>Notes</h1>

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      // ...    
    </div>
  )
}
```

# Getting data from server

# Altering data in server

# Adding styles to React app
