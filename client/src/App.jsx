import {
  Home,
  UpdateRestaurant,
  RestaurantDetails,
  PageNotFound,
} from './pages/';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

const App = () => {
  return (
    <body className='m-0 h-screen w-screen'>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/restaurants/:id/update' element={<UpdateRestaurant />} />
          <Route exact path='/restaurants/:id' element={<RestaurantDetails />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </Router> 
    </body>
  );
};

export default App;