import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import PostScreen from "./screens/PostScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import PostListScreen from "./screens/PostListScreen";
import PostEditScreen from "./screens/PostEditScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Route path='/' component={HomeScreen} exact />
        <Route path='/posts/:id' component={PostScreen} exact />
        <Route path='/login' component={LoginScreen} />
        <Route path='/register' component={RegisterScreen} />
        <Route path='/profile' component={ProfileScreen} />
        <Route path='/admin/userlist' component={UserListScreen} />
        <Route path='/admin/user/:id/edit' component={UserEditScreen} />
        <Route path='/admin/postlist' component={PostListScreen} exact />
        <Route
          path='/admin/postlist/:pageNumber'
          component={PostListScreen}
          exact
        />
        <Route path='/admin/post/:id/edit' component={PostEditScreen} />
      </main>
      <Footer />
    </Router>
  );
};

export default App;
