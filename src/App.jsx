import React from 'react'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'
import ViewCreator from './pages/ViewCreator'
import './App.css'
import {useRoutes} from 'react-router-dom'
import ShowCreators from './pages/ShowCreators'

const App = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <ShowCreators />
    },
    {
      path:'/creator/add',
      element: <AddCreator />
    },
    {
      path:'/creators/:name',
      element: <ViewCreator />
    },
    {
      path:'/creator/:name/edit',
      element: <EditCreator />
    }
  ]);

  return (
    <main className='container'>
      {routes}
    </main>
  )
}

export default App
