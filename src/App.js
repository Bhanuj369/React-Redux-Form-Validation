import React from 'react';
import './App.css';
import FormCode from './FormCode';

class App extends React.Component {
  
  submit = (values) => {
    alert("submitted");
    console.log(values);
  }
  
  render() {
  return (
    <div className = "container whole">
      <h3 className = "jumbotron text-center head-box">Form Validation<span className = "text-danger"> *</span></h3>
      <FormCode onSubmit = {this.submit} />
    </div>
  );
  }
}

export default App;
