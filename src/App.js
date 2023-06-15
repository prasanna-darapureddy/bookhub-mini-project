import {Route, Switch, Redirect} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import BookShelvesAll from './components/BookShelvesAll'
import BookShelfDetails from './components/BookShelfDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/shelf" component={BookShelvesAll} />
      <ProtectedRoute exact path="/books/:id" component={BookShelfDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)
export default App
