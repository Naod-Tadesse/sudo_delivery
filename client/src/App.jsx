import{Routes,Route, Navigate,Outlet} from 'react-router-dom';
import {useSelector} from "react-redux";

import LoginPage from "./scenes/login_page";

import UserPageLayout from './scenes/user_page/UserPageLayout';
import Home from './scenes/user_page/home';
import Foods from './scenes/user_page/foods';
import FoodInfo from './scenes/user_page/foods/FoodInfo';
import Restaurants from './scenes/user_page/restaurants';
import RestaurantInfo from './scenes/user_page/restaurants/RestaurantInfo';
import CartOrders from './scenes/user_page/cart';
import Settings from './scenes/user_page/settings';

//Restaurant imports

import Menu from "./scenes/resturant_page/menu/Menu"
import Orders from './scenes/resturant_page/orders';
import RestaurantSettings from './scenes/resturant_page/settings';
import RestaurantPageLayout from "./scenes/resturant_page/RestaurantPageLayout"
import Error from './components/Error';

const App = ()=> {
        const isAuth =Boolean(useSelector((state)=>state.auth.token)) 
        const isUser = Boolean(useSelector((state)=>state.auth.user))
        const {restaurant} = useSelector((state)=>state.auth)
        return ( 
            <div>
                <Routes>
                    <Route path="/" element={isAuth && isUser?  <UserPageLayout/>:<Navigate to="/auth"/>}>
                        <Route index element={<Home/>}/>
                        <Route path='restaurants'>
                            <Route index element={<Restaurants/>}/>
                            <Route path=":restaurantId" element={<RestaurantInfo/>}/>
                        </Route>
                        <Route path='foods' >
                            <Route index element={<Foods/>}/>
                            <Route path=":foodId" element={<FoodInfo/>}/>
                        </Route>
                        <Route path="cart" element={<CartOrders/>}/>
                        <Route path="settings" element={<Settings/>}/>
                    </Route>

                    <Route path='/restaurant' element={isAuth && !isUser? <RestaurantPageLayout/>:<Navigate to="/auth"/>}>
                        <Route path=":restaurantId" element={<Menu />} />
                        <Route path="settings" element={<RestaurantSettings />} />
                        <Route path="orders" element={<Orders/>}/>
                    </Route>
                    <Route path="/auth" element={isAuth ? <Navigate to={isUser ? "/" : `/restaurant/${restaurant.name}` }/> : <LoginPage/>}/>
                    <Route path='*'  element={<Error/>}/>
                </Routes>
            </div>
         );
    
}
 
export default App;