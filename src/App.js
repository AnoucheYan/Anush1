import './App.css';
import ToDo from './Components/pages/ToDo/ToDo';
import About from './Components/pages/About/About';
import Contact from './Components/pages/Contact/Contact';
import NavigationMenu from './Components/NavigationMenu/NavigationMenu';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './Components/pages/NotFound/NotFound';
import OneTaskWithRedux from './Components/pages/OneTask/OneTaskWithRedux';


const pages = [
  {
    path: "/",
    Component: ToDo
  },
  {
    path: "/about",
    Component: About
  },
  {
    path: "/contact",
    Component: Contact,
  },
  {
    path: "/onetask/:id",
    Component: OneTaskWithRedux
  },
  {
    path: "/404",
    Component: NotFound
  }
]

function App(props) {

  const myPages = pages.map((page, idx) => {

    const { Component } = page;
    return (
      <Route
        key={idx}
        path={page.path}
        render={() => {
          return (
            <Component />
          );
        }}
        exact
      />
    );

  });

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
