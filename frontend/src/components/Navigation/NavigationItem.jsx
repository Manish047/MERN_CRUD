import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationItem = props => {
    return (
        <li className="navigation-item"><NavLink to={props.to} exact activeClassName="active">{props.title}</NavLink></li>
    )
}

export default NavigationItem;