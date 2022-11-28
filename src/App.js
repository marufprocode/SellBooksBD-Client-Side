import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import routes from './router/Routes';
import AOS from 'aos';


function App() {
  AOS.init();
  return (
    <div className="max-w-screen-2xl mx-auto">
      <RouterProvider router={routes}/>
      <Toaster/>
    </div>
  );
}

export default App;
