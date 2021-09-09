import React, { Component } from 'react';

import { addUser, getUser, updateUser } from '../../utils/sideEffects';
import checkValidity from '../../utils/validation';

import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';

class EditUser extends Component {

    state = {
        userForm: {
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name',
                },
                value: '',
                validation: {
                    required: true,
                },
                isValid: false,
                touched: false,
            },
            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name',
                },
                value: '',
                validation: {
                    required: true,
                },
                isValid: false,
                touched: false,
            },
            birthDate: {
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'Birth Date',
                },
                value: '',
                validation: {
                    required: true,
                },
                isValid: false,
                touched: false,
            },
            graduation: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Graduation',
                },
                value: '',
                validation: {
                    required: true,
                },
                isValid: false,
                touched: false,
            },
            nationality: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Nationality',
                },
                value: '',
                validation: {
                    required: true,
                },
                isValid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true,
                },
                isValid: false,
                touched: false,
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City',
                },
                value: '',
                validation: {
                    required: true,
                },
                isValid: false,
                touched: false,
            },
            pinCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Pin Code',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                isValid: false,
                touched: false,
            },
        },
        isLoading: false,
        error: null,
        isFormValid: false,
        isEditMode: false,
    }

    fetchEditUser = async (userId) => {
        this.setState({ isLoading: true, error: null });
        const result = await getUser(userId);
        if (result.status !== 200) {
            this.setState({ isLoading: false, error: result.response });
        } else {
            const form = { ...this.state.userForm };
            for (let key in result.data.user) {
                const element = { ...form[key] };
                element.value = result.data.user[key];
                element.touched = true;
                element.isValid = true;
                form[key] = element;
            }
            this.setState({ userForm: form, isEditMode: true, isLoading: false, isFormValid: true });
        }
    }

    formSubmitHandler = async event => {
        event.preventDefault();
        this.setState({ isLoading: true, error: null });
        let formData = {};
        for (let key in this.state.userForm) {
            formData = {
                ...formData,
                [key]: this.state.userForm[key].value
            }
        }
        if (this.state.isEditMode) {
            // Update Existing User
            const result = await updateUser(this.props.match.params.userId, formData);
            if (result.status !== 200) {
                this.setState({ isLoading: false, error: result.response });
            } else {
                this.setState({ isLoading: false });
            }
        } else {
            // Create a new User
            const result = await addUser(formData);
            if (result.status !== 200) {
                this.setState({ isLoading: false, error: result.response });
            } else {
                this.setState({ isLoading: false });
            }
        }
        this.props.history.replace('/');
    }

    inputChangeHandler = (key, event) => {
        const form = { ...this.state.userForm };
        const element = { ...form[key] };
        element.value = event.target.value;
        element.isValid = checkValidity(event.target.value, element.validation);
        element.touched = true;
        form[key] = element;
        let isFormValid = true;
        for (key in form) {
            isFormValid = form[key].isValid && isFormValid;
        }
        this.setState({ userForm: form, isFormValid: isFormValid });
    }

    componentDidMount() {
        const { userId } = this.props.match.params;
        if (userId) {
            this.fetchEditUser(userId);
        }
    }

    render() {

        const formElements = [];
        for (let key in this.state.userForm) {
            formElements.push({
                id: key,
                config: this.state.userForm[key]
            })
        }

        let form = <form className="form" onSubmit={this.formSubmitHandler}>
            <h1 className="form__title">{this.state.isEditMode ? 'Edit User' : 'Add User'}</h1>
            {this.state.error && <p className="form__error">Error:: {this.state.error.status}: {this.state.error.data.message}</p>}
            {formElements.map(element => {
                return <Input
                    key={element.id}
                    elementType={element.config.elementType}
                    value={element.config.value}
                    isValid={element.config.isValid}
                    touched={element.config.touched}
                    elementConfig={element.config.elementConfig}
                    changed={(event) => { this.inputChangeHandler(element.id, event) }} />
            })}
            <Button className="form__btn" type="submit" disabled={this.state.isLoading || !this.state.isFormValid}>{this.state.isEditMode ? 'Update User' : 'Add User'}</Button>
        </form>;

        if (this.state.isLoading) {
            form = <Spinner />
        }

        return form;
    }
}

export default EditUser;