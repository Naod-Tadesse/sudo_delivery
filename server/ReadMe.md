### routes

# `/api/users/register`-- [post]-->to register user w

`body: [ firstName,lastName, username, email, password, phoneNumber]`

# `/api/users/me`-- [get] --> get current user w

`header: [token] `

# `/api/auth/users/login`--[post] --> login user w

`body: [email, password]`

# `/api/restaurants/register`--[post] --> register restaurant w

`body: [name, address, email, password, phoneNumber]`

# `/api/restaurants/me` --> [get] current restaurant w

`header: [token]`

# `/api/auth/restaurants/login` \*\*\* [post] --> restaurant login w

`body: [email, password]`

# `/api/user/profile/editProfile` \*\*\* [post] --> edit user profile w

`header: [token]`
`body: [userId, email, changes]`
NOTE - `changes` is an object contains the updated user info
eg: changes: {
firstName: 'naod',
email: 'naod@gmail.com'
}

# `/api/restaurant/profile/editProfile` \*\*\* [post] --> edit restaurant profile w

`header: [token]`
`body: [restaurantId, email, changes]`
NOTE - `changes` is an object contains the updated user info
eg: changes: {
name: 'kfc',
email: 'kfc@gmail.com'
}

# `/api/users/restaurants/getAllRestaurants` \*\*\* [get] --> get user all restaurants w

`header: [token]`
`query params: [pageNumber, pageSize, search, sort]`

# `/api/users/restaurants/getArestaurantMenus` \*\*\* [get] --> get a restaurant's menu to user w

`header: [token,]`
`query params: [restaurantId, pageNumber, pageSize]`

# `/api/restaurants/foods/storeFood`--[post] --> add food to database w

`header: [token]`
`body: [name, ingredients, price, restaurant(holds the id of the restaurant)]`
`as a file: [images]`

# `/api/restaurants/foods/editFood`--[post] --> edit food w

`header:[token]`
`body:[restaurantId, foodId, changes]`

# `/api/restaurants/foods/getFoods`--[get] --> get restaurant's menu for restaurant w

`header: [token]`
`params: [restaurant(onlyid), pageNumber, pageSize, sort, search]`

# `/api/user/foods/getFoods`-- [get] --> get foods list to user w

`header: [token]`
`queryparams: [pageNumber, pageSize, search, sort]`

# `/api/user/foods/commentFood`-- [post] --> to comment on food w

`body: [userId, foodId, comment]`
`header: [token]`

# `/api/restaurants/foods/removeFood`-- [delete] --> to delete food w

`queryparams: [foodId]`
`header: [token]`

# `/api/user/profile/deleteProfile`-- [delete] --> to delete user profile w

`queryparams: [userId]`
`header: [token]`

# `/api/restaurant/profile/deleteProfile`-- [delete] --> to delete restaurant profile w

`queryparams: [restaurantId]`
``header: [token]`

# `/api/users/order`-- [post] --> to order food w

`body: {food:[{foodId,quantity}]}`
``header: [token]`

# `/api/restaurants/orders`-- [get] --> to see orders w

``header: [token]`

# `/api/restaurants/orders/delivered`-- [post] -->
```body: foodId```

# `/api/users/orders/history` -- [get] -->
```header: [token]```

