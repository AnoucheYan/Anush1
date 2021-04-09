import './App.css';
import ToDo from './Components/pages/ToDo/ToDo';
import About from './Components/pages/About/About';
import Contact from './Components/pages/Contact/Contact';
import NavigationMenu from './Components/NavigationMenu/NavigationMenu';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './Components/pages/NotFound/NotFound';
// import OneTask from './Components/pages/OneTask/OneTask';
import ContactContextProvider from './Context/ContactContext';
// import OneTaskWithReducterHook from './Components/pages/OneTask/OneTaskWithReducterHook';
// import Counter from './CounterAndInput/Counter';
// import InputResult from './CounterAndInput/InputResult';
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
    Provider: ContactContextProvider
  },
  {
    path: "/onetask/:id",
    // component: OneTask
    // Component: OneTaskWithReducterHook
    Component: OneTaskWithRedux
  },
  {
    path: "/404",
    Component: NotFound
  }
]

function App(props) {

  const myPages = pages.map((page, idx) => {

    const { Component, Provider } = page;
    return (
      <Route
        key={idx}
        path={page.path}
        render={() => {
          return (
            Provider ? <Provider>
              <Component />
            </Provider> :
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
      {/* <Counter />
      <InputResult /> */}
    </div>
  )
}

export default App;
