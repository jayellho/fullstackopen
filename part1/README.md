# Introduction to React
## Quickstart
```bash
npm create vite@latest
cd part1
npm install
npm run dev
```

## Component
- Way #1 of function definition: Arrow functions
```javascript
const App = () => {
    return (
        <div>
            <p>Hello world</p>
        </div>
    )
}
```
- NOTE: Code within `{}` is evaluated. E.g.:
```javascript
const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  console.log(now, a+b)

  return (
    <div>
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
    </div>
  )
}
```

## JSX
- The layout of React components is mostly written using JSX.
- Under the hood, JSX returned by React components is compiled into JavaScript. E.g. of above code after compilation:
```javascript
const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p', null, 'Hello world, it is ', now.toString()
    ),
    React.createElement(
      'p', null, a, ' plus ', b, ' is ', a + b
    )
  )
}
```
- JSX is much like HTML, just that you can embed dynamic contnet via JavaScript within `{}`.
- JSX is "XML-like" i.e. every tag needs to be closed.
```javascript
<br />
```

## Multiple components
- Components are reusable.
- Core philosophy of React: compose applications from many specialized reusable components.
- A strong convention: **root component** called **App** at the top of the component tree of the application.

## props: passing data to components
```javascript
const Hello = (props) => {

  console.log(props)
  return (
    <div>
      <p>

        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {

  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>

      <Hello name='Maya' age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}

export default App
```

## Some notes
- Develop in very small steps.
- Always keep the console open.
- The first letter of React component names MUST be capitalized.
    - If not, it takes the built-in HTML element (if that exists).
    - If it is, React creates a `div`-element defined in the Footer component, which is then rendered.
    - NOTE: content of a React component (usually) needs one root element (e.g. an outer `div`-element).
        - Can also use an array of components like below (although not wise):
        ```javascript
        const App = () => {
            return [
                <h1>Greetings</h1>,
                <Hello name='Maya' age={26 + 10} />,
                <Footer />
            ]
        }
        ```
        - Better way: use `fragments` like below
        ```javascript
        <>
            <h1>Greetings</h1>,
            <Hello name='Maya' age={26 + 10} />,
            <Footer />
        </>
        ```

## Do not render objects
```javascript
const App = () => {
  const friends = [
    { name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ]

  return (
    <div>
      <p>{friends[0]}</p> // This is problematic as this is an object. Stuff in {} needs to be primitive values (e.g. strings, numbers)
      <p>{friends[1]}</p>
    </div>
  )
}

export default App
```

# JavaScript
- Latest version released June 2024: `ECMAScript2024` aka `ES15`.
- Popular transpiler: `Babel`.
- JavaScript runtime environment: `Node.js`.
  - Running code in `.js` files: `node name_of_file.js`.
  - Open `Node.js` console to write JavaScript code: `node`.

## Variables
```JavaScript
const x = 1 // value can no longer be changed after defining.
let y = 5 // normal variable. can also define with 'var'.

console.log(x, y)   // 1 5 are printed
y += 10
console.log(x, y)   // 1 15 are printed
y = 'sometext'
console.log(x, y)   // 1 sometext are printed - note that variables allow changing of datatype.
x = 4               // causes an error
```

## Arrays
```JavaScript
const t = [1, -1, 3] // const cannot be reassigned, but the contents of the object it references can be modified.
                     // (reference is immutable; not the data it points to)

t.push(5)

console.log(t.length) // 4 is printed
console.log(t[1])     // -1 is printed

t.forEach(value => {  // forEach receives a function. 
  console.log(value)  // numbers 1, -1, 3, 5 are printed, each on its own line
})                    
```

Preferable to use `concat` over `push` because functional programming paradigm (which React follows) uses **immutable** data structures:
```JavaScript
const t = [1, -1, 3]

const t2 = t.concat(5)  // creates new array

console.log(t)  // [1, -1, 3] is printed
console.log(t2) // [1, -1, 3, 5] is printed
```

`map` method:
```JavaScript
const t = [1, 2, 3]

const m1 = t.map(value => value * 2)
console.log(m1)   // [2, 4, 6] is printed

const m2 = t.map(value => '<li>' + value + '</li>')
console.log(m2)  
// [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ] is printed
```

Destructuring assignment:
```JavaScript
const t = [1, 2, 3, 4, 5]

const [first, second, ...rest] = t

console.log(first, second)  // 1 2 is printed
console.log(rest)          // [3, 4, 5] is printed
```

## Objects
One way of defining objects is with **object literals** - properties listed within braces:
```JavaScript
const object1 = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
}

const object2 = {
  name: 'Full Stack web application development',
  level: 'intermediate studies',
  size: 5,
}

const object3 = {
  name: {
    first: 'Dan',
    last: 'Abramov',
  },
  grades: [2, 3, 5, 3],
  department: 'Stanford University',
}
```

Reference properties of an object with **dot** notation OR **brackets**:
```JavaScript
console.log(object1.name)         // Arto Hellas is printed
const fieldName = 'age'
console.log(object1[fieldName])    // 35 is printed
```

Add properties the same way:
```JavaScript
object1.address = 'Helsinki'
object1['secret number'] = 12341 // brackets needed here because of the space character.
```

Another way of defining objects is via **constructor** functions, although JS does not have classes in the same sense as other OOP languages.

## Functions
Defining an **arrow** function:
```JavaScript
const sum = (p1, p2) => {
  console.log(p1)
  console.log(p2)
  return p1 + p2
}
const result = sum(1, 5)
console.log(result)
```

If just a single parameter, can exclude `()`:
```JavaScript
const square = p => {
  console.log(p)
  return p * p
}
```

If single expression, can exclude `{}`:
```JavaScript
const square = p => p * p

const t = [1, 2, 3]
const tSquared = t.map(p => p * p)
// tSquared is now [1, 4, 9]
```

Defining a function via the keyword **function**:
```JavaScript
function product(a, b) {
  return a * b
}

const result = product(2, 6)
// result is now 12
```

Defining a function via a **function expression**:
```JavaScript
const average = function(a, b) {
  return (a + b) / 2
}

const result = average(2, 5)
// result is now 3.5
```

## Object methods and "this"
**NOTE: Having React Hooks means we do not need to define objects with methods but useful to know about.**
Keyword `this` refers to object itself. Assign methods to object by defining properties which are functions:
```JavaScript
const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',

  greet: function() {
    console.log('hello, my name is ' + this.name)
  },
}

arto.greet()  // "hello, my name is Arto Hellas" gets printed
```

Methods can be assigned to objects even after creation of object:
```JavaScript
const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
  greet: function() {
    console.log('hello, my name is ' + this.name)
  },
}


arto.growOlder = function() {
  this.age += 1
}

console.log(arto.age)   // 35 is printed
arto.growOlder()
console.log(arto.age)   // 36 is printed
```

Introducing the method `doAddition` which can be called in another way by storing a method reference in a variable and calling it via the variable (`referenceToAddition`):
```JavaScript
const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
  greet: function() {
    console.log('hello, my name is ' + this.name)
  },

  doAddition: function(a, b) {
    console.log(a + b)
  },
}

arto.doAddition(1, 4)        // 5 is printed

const referenceToAddition = arto.doAddition
referenceToAddition(10, 15)   // 25 is printed
```

This does not work for the method `greet` as when calling method by reference, method loses knowledge of the original `this`:
```JavaScript
arto.greet()       // "hello, my name is Arto Hellas" gets printed

const referenceToGreet = arto.greet
referenceToGreet() // prints "hello, my name is undefined"
```
NOTE: In JS, the value of `this` is defined based on how the method is called. Avoid all these by using `this`-less JS.

We can use `bind` to preserve the original `this`:
```JavaScript
setTimeout(arto.greet.bind(arto), 1000)
```

## Classes
There are no class mechanisms in JS but it has features to simulate OOP classes.
```JavaScript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  greet() {
    console.log('hello, my name is ' + this.name)
  }
}

const adam = new Person('Adam Ondra', 33)
adam.greet()

const janja = new Person('Janja Garnbret', 27)
janja.greet()
```
While JS classes are reminiscent of classes in Java, they are still plain JS objects built on **prototypal inheritance**.
The type of any class instance in JS is still `Object`.

## JavaScript materials
1. [Mozilla's JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
2. [JavaScript language overview](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_overview)
3. [You-Don't-Know-JS](https://github.com/getify/You-Dont-Know-JS)
4. [javascript.info](https://javascript.info/)
5. [Eloquent JavaScript](https://eloquentjavascript.net/)
6. [Namaste JavaScript](https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP)
7. [egghead.io](https://egghead.io/)

# Component state, event handlers
## Component helper functions
```JavaScript
const Hello = (props) => {

  const bornYear = () => { // We encapsulate the logic for guessing the year of birth here.
    const yearNow = new Date().getFullYear()
    return yearNow - props.age
  } // In JS (unlike many other programming languages), function-in-function is common and efficient practice.

  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>

      <p>So you were probably born in {bornYear()}</p> 
    </div>
  )
}
```

## Destructuring
```JavaScript
props = {
  name: 'Arto Hellas',
  age: 35,
}

const Hello = (props) => {

  // const name = props.name
  // const age = props.age
  // Below is an example of destructuring. Above is what we would have to do without destructuring.
  const { name, age } = props


  const bornYear = () => new Date().getFullYear() - age // Compact syntax for arrow function because it consists of a single expression.

  return (
    <div>

      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
```

Another step further - just destructure in the function params:
```JavaScript
const Hello = ({name, age}) =>{
  ...
}
```

## Page re-rendering
Can do so via `render()`:
```JavaScript
let counter = 1

const root = ReactDOM.createRoot(document.getElementById('root'))

const refresh = () => {
  root.render(
    <App counter={counter} />
  )
}

refresh()
counter += 1
refresh()
counter += 1
refresh()
```

The above happens in a very short time. We can set longer intervals with `setInterval()`:
```JavaScript
setInterval(() => {
  refresh()
  counter += 1
}, 1000)
```

However, `render` is not recommended. Use the below instead.

## Stateful component
Basically, introduction to React's `useState` hook.
```JavaScript
import { useState } from 'react'

const App = () => {

  const [ counter, setCounter ] = useState(0)


  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  return (
    <div>{counter}</div>
  )
}

export default App
```

## Event handling
- Handlers called when specific events occur.
- Examples are mouse events like click.

E.g.:
```JavaScript
const App = () => {
  const [ counter, setCounter ] = useState(0)


  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <div>
      <div>{counter}</div>

      <button onClick={handleClick}>
        plus
      </button>
    </div>
  )
}
```

Instead of defining a separate function, can do in-line too:
```JavaScript
<button onClick={() => setCounter(counter + 1)}>
  plus
</button>
```

## An event handler is a function
It is a function OR a function reference and NOT a function call. The below would error:
```JavaScript
// this is a function call
<button onClick={setCounter(counter + 1)}>
```

This is okay:
```JavaScript
<button onClick={() => setCounter(counter + 1)}> 
  plus
</button>
```

## Passing state - to child components
One best practice in React: **lift state up** in the component hierarchy. Then, we would need to pass it down to the children.
```JavaScript
// child component 1 - receives state in props
const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}

// child component 2 - receives state in props AND click handler
const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

// parent component where the state (counter) and handler (setToZero) are. State passed down as props.
const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)

  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter}/>

      <Button
        onClick={increaseByOne}
        text='plus'
      />
      <Button
        onClick={setToZero}
        text='zero'
      />     
      <Button
        onClick={decreaseByOne}
        text='minus'
      />           
    </div>
  )
}
```

## Changes in state cause re-rendering
Calling a function that changes the state causes the component to re-render.

## Refactoring the components
Instead of:
```JavaScript
const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}
```

Simplify by destructuring like so:
```JavaScript
const Display = ({ counter }) => {
  return (
    <div>{counter}</div>
  )
}
```

Further simplify by using the compact form of arrow functions:
```JavaScript
const Display = ({ counter }) => <div>{counter}</div>
```

Instead of:
```JavaScript
const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}
```

Destructure and use compact arrow function:
```JavaScript
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
```

# A more complex state, debugging React apps
## Complex state
```JavaScript
const App = () => {
  const [clicks, setClicks] = useState({ // this combines two states into one useState hook. not recommended, just for illustration on the object spreading syntax.
    left: 0, right: 0
  })

  const handleLeftClick = () => { // handlers a little messy.
    const newClicks = { 
      left: clicks.left + 1, 
      right: clicks.right 
    }
    setClicks(newClicks)
  }

  const handleRightClick = () => { // handlers a little messy.
    const newClicks = { 
      left: clicks.left, 
      right: clicks.right + 1 
    }
    setClicks(newClicks)
  }

  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
    </div>
  )
}
```

Handlers can be made neater with **object spreading** syntax:
```JavaScript
const handleLeftClick = () => {
  const newClicks = { 
    ...clicks, 
    left: clicks.left + 1 
  }
  setClicks(newClicks)
}

const handleRightClick = () => {
  const newClicks = { 
    ...clicks, 
    right: clicks.right + 1 
  }
  setClicks(newClicks)
}
```
`{ ...clicks }` creates a new object that has copies of all the properties of the `clicks` object.

We can further simplify to the below:
```JavaScript
const handleLeftClick = () =>
  setClicks({ ...clicks, left: clicks.left + 1 })

const handleRightClick = () =>
  setClicks({ ...clicks, right: clicks.right + 1 })
```

The below is an anti-pattern. It is forbidden in React to mutate state directly.
```JavaScript
const handleLeftClick = () => {
  clicks.left++
  setClicks(clicks)
}
```

## Handling arrays
```JavaScript
const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  const [allClicks, setAll] = useState([])


  const handleLeftClick = () => {
    setAll(allClicks.concat('L')) // concat creates a new copy of the array with the item added to it.
    setLeft(left + 1)
  }


  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}

      <p>{allClicks.join(' ')}</p>
    </div>
  )
}
```

Do **NOT** use `.push` like below - remember that we do not want to mutate state directly.
```JavaScript
const handleLeftClick = () => {
  allClicks.push('L')
  setAll(allClicks)
  setLeft(left + 1)
}
```

## Update of state is asynchronous
```JavaScript
const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)

    setTotal(left + right) // this might not reflect correctly because the state update for left is async.
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)

    setTotal(left + right) // this might not reflect correctly because the state update for right is async.
  }

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>{allClicks.join(' ')}</p>

      <p>total {total}</p>
    </div>
  )
}
```

Fix with the following:
```JavaScript
const App = () => {
  // ...
  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1 // this is the fix. we can do the same for the right.
    setLeft(updatedLeft)
    setTotal(updatedLeft + right) 
  }

  // ...
}
```

## Conditional rendering
```JavaScript
const History = (props) => {
  if (props.allClicks.length === 0) { // this is the if conditional part
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return ( // this is the else conditional part
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}


const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      {left}

      <Button onClick={handleLeftClick} text='left' />
      <Button onClick={handleRightClick} text='right' />
      {right}
      <History allClicks={allClicks} />
    </div>
  )
}
```

## Old React
Old React required the use of class components if any components required state. There were no hooks.

## Debugging React applications
- Keep the browser's developer console **open at all times**.
- Fix errors **immediately** instead of adding new code.
- Use `console.log` for debugging.
- Add the **React developer tools extension** to Chrome - this adds a `Components` tab.

## Rules of Hooks
- `useState` + `useEffect` must NOT be called from inside:
  - a loop,
  - a conditional expression,
  - or any place that is not a function defining a component

Only call hooks from inside a function body that defines a React component:
```JavaScript
const App = () => {
  // these are ok
  const [age, setAge] = useState(0)
  const [name, setName] = useState('Juha Tauriainen')

  if ( age > 10 ) {
    // this does not work!
    const [foobar, setFoobar] = useState(null)
  }

  for ( let i = 0; i < age; i++ ) {
    // also this is not good
    const [rightWay, setRightWay] = useState(false)
  }

  const notGood = () => {
    // and this is also illegal
    const [x, setX] = useState(-1000)
  }

  return (
    //...
  )
}
```

## Event Handling Revisited
Event handlers **MUST** be a function or a function reference. Any other variable will not work, like below:
```JavaScript
// all bad examples
<button onClick="crap...">button</button> // string
<button onClick={value + 1}>button</button> // number
<button onClick={value = 0}>button</button> // variable assignment
<button onClick={console.log('clicked the button')}>
  button
</button> // function call
<button onClick={setValue(0)}>button</button> // function call
```

These are okay:
```JavaScript
<button onClick={() => console.log('clicked the button')}>
  button
</button>
<button onClick={() => setValue(0)}>button</button>
```

## A function that returns a function
```JavaScript
const App = () => {
  const [value, setValue] = useState(10)


  const hello = (who) => {
    const handler = () => {
      console.log('hello', who)
    }
    return handler
  }

  return (
    // this function call fed into mouse event is okay because this particular function returns a function.
    <div>
      {value}
      <button onClick={hello('world')}>button</button>
      <button onClick={hello('react')}>button</button>
      <button onClick={hello('function')}>button</button>
    </div>
  )
}
```
Useful for defining generic functionality that can be customized with parameters.

We can refactor that function in function in two steps.

Step 1 - eliminate helper and directly return:
```JavaScript
const hello = (who) => {
  return () => {
    console.log('hello', who)
  }
}
```

Step 2 - omit curly braces and use compact arrow function syntax:
```JavaScript
const hello = (who) => () => {
  console.log('hello', who)
}
```

We can also define event handlers that set the state of a component to a given value:
```JavaScript
const App = () => {
  const [value, setValue] = useState(10)
  

  const setToValue = (newValue) => () => {
    console.log('value now', newValue)  // print the new value to console
    setValue(newValue)
  }
  
  return (
    <div>
      {value}

      <button onClick={setToValue(1000)}>thousand</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>
    </div>
  )
}
```

We don't actually need that function that returns a function. The below works too:
```JavaScript
const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    // we are just just passing in the setToValue() function as a function.
    <div>
      {value}
      <button onClick={() => setToValue(1000)}> 
        thousand
      </button>
      <button onClick={() => setToValue(0)}>
        reset
      </button>
      <button onClick={() => setToValue(value + 1)}>
        increment
      </button>
    </div>
  )
}
```

## Passing Event Handlers to Child Components
```JavaScript
const Button = (props) => (
  // for the below, ensure that attribute names (.onClick) for the prop are correct. 
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const App = (props) => {
  // ...
  return (
    <div>
      {value}

      <Button onClick={() => setToValue(1000)} text="thousand" />
      <Button onClick={() => setToValue(0)} text="reset" />
      <Button onClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}
```

## Do Not Define Components Within Components
```JavaScript
// This is the right place to define a component
const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = newValue => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  // Do not define components inside another component
  // One problem: This will be treated as a new component on every render - React cannot optimize (cache stuff for example?) if so.

  const Display = props => <div>{props.value}</div>

  return (
    <div>

      <Display value={value} />
      <Button onClick={() => setToValue(1000)} text="thousand" />
      <Button onClick={() => setToValue(0)} text="reset" />
      <Button onClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}
```

Do the below instead:
```JavaScript
const Display = props => <div>{props.value}</div>

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = newValue => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <div>
      <Display value={value} />
      <Button onClick={() => setToValue(1000)} text="thousand" />
      <Button onClick={() => setToValue(0)} text="reset" />
      <Button onClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}
```

## Useful Reading
1. [Official React Documentation](https://react.dev/learn)
2. [Egghead.io's](https://egghead.io/) ["Start learning React"](https://egghead.io/courses/start-learning-react)
3. [Beginner's Guide to React](https://egghead.io/courses/the-beginner-s-guide-to-reactjs)





