import './App.css';
import ToDo from './Components/pages/ToDo/ToDo';
import About from './Components/pages/About/About';
import Contact from './Components/pages/Contact/Contact';
import NavigationMenu from './Components/NavigationMenu/NavigationMenu';
import {Route, Switch, Redirect} from 'react-router-dom';


function App() {
    
  
  return (
    <div className="App">
      <NavigationMenu />
      <Switch>
        <Route path="/" render={()=><ToDo />} exact /> {/* or <Route path="/" component={ToDo} exact />  (in this way we can't pass props to Todo) */}
        <Route path="/about" render={()=><About />} exact />
        <Route path="/contact" render={()=><Contact />} exact />        
        {/* or 
        <Route path="/" exact>
          <ToDo />
        </Route> */}
        <Redirect to="/" />
      </Switch>
    </div>
  )
}

export default App;
