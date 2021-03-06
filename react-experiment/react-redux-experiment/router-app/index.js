import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory, hashHistory } from 'react-router'

const App = ({children}) => {
  return <div>
    <h1>App</h1>
    <ul>
      <li><Link to={`/`}>Page 1</Link></li>
      <li><Link to={`/page2`}>Page 2</Link></li>
      <li><Link to={`/addNumbers/7/8`}>Add Numbers</Link></li>
    </ul>
    {children}
    <hr />
    &copy; 2016
  </div>
}

const Page1 = (props, { router }) => {
  const a = 2
  const b = 3
  return <div>
    I am page 1. Go to <Link to={`/page2`}>Page 2</Link>. Go to <Link to={`/addNumbers/${a}/${b}`}>Add numbers</Link>.
    <button type="button" onClick={() => {
      router.push('/page2')
    }}>Go to Page 2</button>
  </div>
}
Page1.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const Page2 = () => {
  return <div>
    I am page 2. Go to <Link to={`/`}>Page 1</Link>
  </div>
}

const AddNumbers = ({ params }) => {
  const a = parseInt(params.a)
  const b = parseInt(params.b)
  const sum = a + b
  return <div>{a} and {b} is {sum}. Go to <Link to="/">Page 1</Link></div>
}

let history = hashHistory // or browserHistory (HTML5 URLs)

render(
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Page1} />
      <Route path="page2" component={Page2}
        onEnter={() => { console.log('Page 2 - onEnter') }}
        onLeave={() => { console.log('Page 2 - onLeave') }}
      />
      <Route path="addNumbers/:a/:b" component={AddNumbers} />
    </Route>
  </Router>,
  document.getElementById('root')
)
