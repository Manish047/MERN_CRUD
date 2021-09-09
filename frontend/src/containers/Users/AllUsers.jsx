import React, { Component } from 'react';

import { getUsers, deleteUser } from '../../utils/sideEffects';
import User from '../../components/User/User';
import Spinner from '../../components/UI/Spinner';

class AllUsers extends Component {

    state = {
        users: [],
        isLoading: false,
        error: null
    }

    editClickHandler = (userId) => {
        this.props.history.replace('/edit-user/' + userId);
    }

    deleteClickHandler = async (event, userId) => {
        event.preventDefault();
        this.setState({ isLoading: true });
        const result = await deleteUser(userId);
        if (result.status !== 200) {
            this.setState({ isLoading: false, error: result.response });
        } else {
            const users = [...this.state.users];
            const updatedUsers = users.filter(user => user._id !== userId);
            this.setState({ isLoading: false, users: updatedUsers });
        }
    }

    fetchAllUsers = async () => {
        this.setState({ isLoading: true })
        const result = await getUsers();
        if (result.status !== 200) {
            this.setState({ isLoading: false, error: result.response });
        } else {
            this.setState({ isLoading: false, users: result.data.users, error: null });
        }
    }

    componentDidMount() {
        this.fetchAllUsers();
    }

    render() {
        let allUsers = (
            <div className="users">
                {this.state.users.length > 0 && this.state.users.map(user => {
                    return <User
                        key={user._id}
                        user={user}
                        edited={() => this.editClickHandler(user._id)}
                        deleted={(event) => this.deleteClickHandler(event, user._id)} />
                })}
            </div>
        );

        if (this.state.isLoading) {
            allUsers = <Spinner />
        }

        if (!this.state.error && !this.state.isLoading && this.state.users.length <= 0) {
            allUsers = <h2 className="message">No Users added yet!</h2>
        }

        if (this.state.error) {
            allUsers = <h2 className="message message--red">Error:: {this.state.error.status}: {this.state.error.data.message}</h2>
        }

        return allUsers;
    }
}

export default AllUsers;