import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from './themes';

import MainContainer from "./containers/MainContainer.jsx";
import Login from "./components/Login";
import Signup from "./components/Signup.jsx";
// import HeaderAppBar from "./components/HeaderAppBar";

const App = () => {

  return (

    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainContainer />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;