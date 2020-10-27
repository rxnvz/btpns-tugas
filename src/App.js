import React, {Component} from 'react';
import './App.css';
import {Nav, Body } from "./templates"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "login",
      isLoggedIn: false,
      mimin: false
    }
  }

  shouldComponentUpdate(lastProp) {
    if (lastProp.page !== this.state.page)
      return true
    return false
  }

  onClickButton = (page) => {
    this.setState({
      page
    })
  }

  changeLogIn = () => { //informasi udah login atau belum
    this.setState(oldState => ({ isLoggedIn: !oldState.isLoggedIn }))
  }

  render() { 
    // console.log(this.state.page);
    return (
      <>
        <Nav
          statusLogin={this.state.isLoggedIn}
          changeLogIn={this.changeLogIn}
          changePage={this.onClickButton}
        />
        <Body
          statusLogin={this.state.isLoggedIn}
          changeLogIn={this.changeLogIn}
          page={this.state.page}
          changePage={this.onClickButton}
        />
        {/* <Footer /> */}
      </>
    );
  }
}
 
export default App;
