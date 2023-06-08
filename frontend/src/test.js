{/* <Routes>
<Route path="/" element={<PersistLogin><Index /></PersistLogin>} />
<Route path="/products/" element={<PersistLogin><ProductsCategory /></PersistLogin>}>
<Route path=":categoryName" element={<ProductsCategory />} >
<Route path=":subCategory" element={<ProductsCategory />} />
</Route>
<Route path="search/:searchParam" element={<ProductsCategory />} />
</Route>
<Route path="/basket" element={<PersistLogin><UserBasket /></PersistLogin>}>
<Route path="" element={<Cart />} />
<Route path="check-information" element={<CheckInformation />} />
<Route path="order-pay" element={<SubmitOrder />} />
</Route>
<Route path="/product/:productId" element={<PersistLogin><Product /></PersistLogin>} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/userpanel" element={<PersistLogin><UserPanel /></PersistLogin>}>
<Route path="" element={<UserPanel />} />
</Route>
<Route path="/adminpanel" element={<PersistLogin><PrivateRoute><AdminPanel /></PrivateRoute></PersistLogin>}>
<Route path="dashboard" element={<MainAdmin />} />
<Route path="products" element={<AdminProducts />} />
<Route path="add-products" element={<AddProduct />} />
<Route path="edit-product/:productID" element={<EditProduct />} />
<Route path="users" element={<AdminUsers />} />
<Route path="orders" element={<AdminOrders />} />
<Route path="articles" element={<AdminArticles />} />
</Route>
</Routes> */}