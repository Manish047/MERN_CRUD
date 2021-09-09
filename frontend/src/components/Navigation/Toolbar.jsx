import React from 'react';

import NavigationItems from './NavigationItems';
import Logo from '../UI/Logo';

const ToolBar = props => {
    return (
        <header>
            <div className="toolbar">
                <Logo />
                <nav className="navigation">
                    <NavigationItems />
                </nav>
            </div>
        </header>
    )
}

export default ToolBar;