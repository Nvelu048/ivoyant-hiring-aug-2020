import React, { useEffect } from 'react';
import Axios from 'axios'
import './App.css';

function App() {
  useEffect(() => {
    Axios.get('/alive')
      .then((res) => console.log(res))
      .catch(err => console.log(err));
  }, [])

  return (
    <div className="App">
      <h1>Screen up.. You can now start your project</h1>
    </div>
  );
}

export default App;
