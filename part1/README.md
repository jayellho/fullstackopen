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
