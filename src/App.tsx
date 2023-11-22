import React, { SyntheticEvent, useEffect, useState } from 'react';
import axios from "axios";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Button, Input } from '@mui/material';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import AllEmployees from "./AllEmployees"
import AllPosts from './AllPosts';
import Header from './Header';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" index element={<AllEmployees/>}/>
        <Route path="post" element={<AllPosts/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
