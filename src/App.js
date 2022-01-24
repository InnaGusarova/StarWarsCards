import React from 'react';
import ListOfPeople from './listOfPeople';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  };

  render() {
    return (  
      <ListOfPeople/>
    );
  };

};

export default App;
