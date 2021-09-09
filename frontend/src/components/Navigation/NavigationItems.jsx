import React from 'react';
import NavigationItem from './NavigationItem';

const NavigationItems = props => {
    return (
        <ul className="navigation-items">
            <NavigationItem to="/" exact title="Home" />
            <NavigationItem to="/edit-user" exact title="New User" />
        </ul>
    )
}

export default NavigationItems;