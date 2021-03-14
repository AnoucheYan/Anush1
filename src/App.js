import './App.css';
import ToDo from './Components/pages/ToDo/ToDo';
import About from './Components/pages/About/About';
import Contact from './Components/pages/Contact/Contact';
import NavigationMenu from './Components/NavigationMenu/NavigationMenu';
import {Route, Switch, Redirect} from 'react-router-dom';
import NotFound from './Components/pages/NotFound/NotFound';
import OneTask from './Components/pages/OneTask/OneTask';


function App() {
    
  
  return (
    <div className="App">
      <NavigationMenu />
      <Switch>
        <Route path="/" component={ToDo} exact />
        <Route path="/about" component={About} exact />
        <Route path="/contact" component={Contact} exact />
        <Route path="/onetask/:id" component={OneTask} exact />    
        <Route path="/404" component={NotFound} exact />   {/* or without Redirect, path="/*" */}
        <Redirect to="/404" />
      </Switch>
    </div>
  )
}

export default App;
