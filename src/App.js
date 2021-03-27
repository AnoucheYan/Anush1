import './App.css';
import ToDo from './Components/pages/ToDo/ToDo';
import About from './Components/pages/About/About';
import Contact from './Components/pages/Contact/Contact';
import NavigationMenu from './Components/NavigationMenu/NavigationMenu';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './Components/pages/NotFound/NotFound';
// import OneTask from './Components/pages/OneTask/OneTask';

import ContactContextProvider from './Context/ContactContext';
import OneTaskWithReducterHook from './Components/pages/OneTask/OneTaskWithReducterHook';


const pages = [
  {
    path: "/",
    component: ToDo
  },
  {
    path: "/about",
    component: About
  },
  {
    path: "/contact",
    component: Contact
  },
  {
    path: "/onetask/:id",
    // component: OneTask
    component: OneTaskWithReducterHook
  },
  {
    path: "/404",
    component: NotFound
  }
]

function App() {

  const myPages = pages.map((page, idx) => {
    if (page.path === "/contact") {
      return (
        <Route key={idx} path={page.path} exact >
          <ContactContextProvider>
            {<page.component />}
          </ContactContextProvider>
        </Route>
      )
    }
    return (
      <Route key={idx} path={page.path} component={page.component} exact />
    )
  })

  return (
    <div className="App">
      <NavigationMenu />
      <Switch>
        {myPages}
        <Redirect to="/404" />
      </Switch>
    </div>
  )
}

export default App;
