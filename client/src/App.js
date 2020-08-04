import React, { useEffect } from 'react';
import './App.css';
import { Label } from './Components';
import NetworkClient from './lib/network-client'
function App() {
  useEffect(() => {
    NetworkClient.networkClient.axios.get('/alive')
      .then((res) => console.log(res))
      .catch(err => console.log(err));
  }, [])

  return (
    <div className="App">
      <h1>Screen up.. You can now start your project</h1>
      <h4>Sample Component</h4>
      <Label label="Hello World" />
    </div>
  );
}

export default App;
