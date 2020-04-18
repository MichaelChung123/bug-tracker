import Dashboard from './components/admin/Dashboard';
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom';

export default <Router history={hashHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={Login} />
    <Route path="/admin/dashboard" component={Dashboard} />
  </Route>
</Router>