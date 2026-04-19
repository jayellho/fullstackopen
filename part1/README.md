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











