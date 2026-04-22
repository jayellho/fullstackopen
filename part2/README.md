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