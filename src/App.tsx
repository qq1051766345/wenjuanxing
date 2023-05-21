import React from 'react';
import './App.css';
import List from './pages/manage/List';
import { RouterProvider } from 'react-router-dom';
import router from './router/index';

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
