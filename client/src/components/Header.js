import React, { Component } from 'react'
import Payments from './Payments';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Header extends Component {

renderContent(){
    switch(this.props.auth){
        case null:
            return <li><a>Loading</a></li>
        case false:
            return (                 
            <li>
                <a href="/auth/google">Sign in with Google+</a>
            </li>
            )
        default:
            return [
                <li key='1'><Payments /></li>,
                <li key='3' style={{padding: '0 10px'}}>Credits: {(this.props.auth.credits/100).toFixed(2)}</li>,
                <li key='2'><a href="/api/logout">Logout</a></li>
            ];
    }
}

  render() {
    return (
      <nav>
      <div className="nav-wrapper">
        <Link to={this.props.auth ? '/surveys' : '/' } className="brand-logo">Prettier</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                {this.renderContent()}
            </ul>
      </div>
    </nav>
    )
  }
}

const mapStateToProps = ({auth}) => {
    return {
        auth
    }
}

export default connect(mapStateToProps)(Header); 