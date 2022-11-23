import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import routes from './router/Routes';


function App() {
  return (
    <div className="max-w-screen-2xl mx-auto overflow-hidden">
      <RouterProvider router={routes}/>
      <Toaster/>
    </div>
  );
}

export default App;
