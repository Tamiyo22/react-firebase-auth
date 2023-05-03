import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserRoute from "./components/UserRoute";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { setUser } from "./redux/actions";
import Header from "./components/Header";
import AddEdit from "./pages/AddEdit";
import About from "./pages/About";
import Video from "./pages/Video";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import View from "./pages/View";
import Search from "./pages/Search";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer position="top-center" />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <UserRoute>
                <Home />
              </UserRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/addContact"
            element={
              <UserRoute>
                <AddEdit />
              </UserRoute>
            }
          />
          <Route
            path="/update/:id"
            element={
              <UserRoute>
                <AddEdit />
              </UserRoute>
            }
          />
          <Route
            path="/view/:id"
            element={
              <UserRoute>
                <View />
              </UserRoute>
            }
          />
          <Route
            path="/search"
            element={
              <UserRoute>
                <Search />
              </UserRoute>
            }
          />
          <Route path="/about" element={<About />} />
     
      <Route path="/video" element={<Video />} />
      
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;

