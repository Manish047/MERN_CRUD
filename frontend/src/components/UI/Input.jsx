import React from 'react';

const Input = props => {

    const classList = ['form__input'];

    if (props.touched && !props.isValid) {
        classList.push('form__input--invalid');
    }

    let element;
    switch (props.elementType) {
        case 'input':
            element = <input className={classList.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
        case 'textarea':
            element = <textarea className={classList.join(' ')} {...props.elementConfig} onChange={props.changed}>{props.value}</textarea>
            break;
        case 'datalist':
            element = <datalist className={classList.join(' ')} {...props.elementConfig} onChange={props.changed}>
                {props.optionList.map(option => {
                    return <option value={option.value}>
                        {option.label}
                    </option>
                })}
            </datalist>
            break;
        default:
            element = <input className={classList.join(' ')} type="text" {...props.elementConfig} value='' onChange={props.changed} />
    }

    return element;
}

export default Input;