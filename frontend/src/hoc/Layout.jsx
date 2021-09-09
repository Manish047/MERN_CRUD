import React, { Component } from 'react';

import Auxilixary from './Auxiliary';
import ToolBar from '../components/Navigation/Toolbar';

class Layout extends Component {
    render() {
        return (
            <Auxilixary>
                <ToolBar />
                <main>
                    {this.props.children}
                </main>
                <footer>
                    © Manish Sawlani
                </footer>
            </Auxilixary>
        )
    }
}

export default Layout;