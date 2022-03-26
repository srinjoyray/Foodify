import { useEffect, useState } from 'react';
import Home from './pages/User/Home';
import { BrowserRouter,Switch,Route,Redirect,useLocation} from "react-router-dom";
import Restaurant from './pages/User/Restaurant';
import RestaurantDetails from './pages/User/RestaurantDetails';
import Auth from './pages/User/Auth';
import Cart from './pages/User/Cart';
import Profile from './pages/User/Profile';
import Header from './components/Header';

import Seller from './pages/Seller/Seller';
import SellerDashboard from './pages/Seller/SellerDashboard';
import SellerAuth from './pages/Seller/SellerAuth';

function App() {
  const [userId,setUserId] = useState(JSON.parse(localStorage.getItem("userId")));
  const [seller,setSeller] = useState((JSON.parse(localStorage.getItem("seller")))?.result);
  useEffect(async() => {
    setUserId(JSON.parse(localStorage.getItem("userId")));
    setSeller((JSON.parse(localStorage.getItem("seller")))?.result);
  }, []);
  
  // console.log(user,seller);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Header userId={userId} setUserId={setUserId} />
          <Home userId={userId} setUserId={setUserId}/>
        </Route>
        <Route path="/restaurant" exact>
          <Header userId={userId} setUserId={setUserId} />
          <Restaurant  userId={userId} setUserId={setUserId} />
        </Route>
        <Route path="/restaurant/:id" >
          <Header userId={userId} setUserId={setUserId} />
          <RestaurantDetails userId={userId} setUserId={setUserId} />
        </Route>
        <Route path="/auth" >
          <Header userId={userId} setUserId={setUserId} />
          <Auth userId={userId} setUserId={setUserId} />
        </Route>
        <Route path="/cart">
          {
            userId ? 
              <>
                <Header userId={userId} setUserId={setUserId} />
                <Cart userId={userId} setUserId={setUserId} />
              </>
              :
              <Redirect to="/auth" />
          }
        </Route>
        
        <Route path="/profile">
          <Header userId={userId} setUserId={setUserId} />
          <Profile userId={userId} setUserId={setUserId} />
        </Route>

        <Route path="/seller" exact>
          <Seller seller={seller} setSeller={setSeller} />
        </Route>
        <Route path="/seller/auth" exact>
          <SellerAuth seller={seller} setSeller={setSeller} />  
        </Route>
        <Route path="/seller/dashboard" exact component={SellerDashboard}>
          {
            seller ? 
              <>
                <SellerDashboard seller={seller} setSeller={setSeller} /> 
              </>
              :
              <Redirect to="/seller/auth" />
          }
            
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
