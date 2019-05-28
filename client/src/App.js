import React, { Component } from 'react';
import axios from 'axios';


class App extends Component {
  async componentDidMount() {
    try {
      const response = await axios.get('/api/product/brands');
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div className="App">
        My App
      </div>
    );
  }
}


export default App;
