import React from 'react';
import styled from 'styled-components';
import './side_menu.css';


const DefaultWidth = "200px";

export class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.width = this.props.width || DefaultWidth;
  }

  componentDidMount() {
    this.getMenu().style.left = `-${this.width}`;
    this.getMenu().style.width = this.width;
    this.openNav();
  }

  openNav() {
    this.getMenu().style.left = "0px";
  }

  closeNav() {
    this.getMenu().style.left = `-${this.width}`;
  }

  getMenu() {
    return document.getElementById("sidenav");
  }

  render() {
    return (
      <React.Fragment>
        <div id="sidenav" className="sidenav">
          <a 
            href="#" 
            className="close-btn" 
            onClick={this.closeNav.bind(this)}>
            &times;
          </a>

          <div className="menu-items-container">
            {this.props.children}
          </div>

        </div>
        
        <a href="#"
          className="open-btn"
          onClick={this.openNav.bind(this)}>
          &#9776;
        </a>

      </React.Fragment>
    )
  }
}


export class SideMenuItem extends React.Component {
  render() {
    const props = this.props;
    return(
      <a href="#">
        {props.title}
      </a>
    )
  }
}

export default SideMenu;