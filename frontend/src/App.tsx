import type { Route as RouteType, PageRoute } from './types/routes'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routes } from './routes/config'
import './App.css'

function App() {
  const renderRoute = (route: RouteType | PageRoute, key: string | number) => {
    if (route.type === 'layout') {
      const Layout = route.layout ?? <div></div>;
      return (
        <Route key={key} path={route.path} element={Layout}>
          {route.children?.map((child, ci) => renderRoute(child, `${key}-${ci}`))}
        </Route>
      );
    }

    if (route.type === 'page') {
      return <Route key={key} path={route.path} element={route.element} />;
    }

    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((r, i) => renderRoute(r, i))}
      </Routes>
    </BrowserRouter>
  )
}

export default App;