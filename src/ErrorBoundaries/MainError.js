import React from 'react';

class MainError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {      
      return (
        <h2>Could not display the main section.</h2>
      );
    }
    return this.props.children;
  }  

};

export default MainError;