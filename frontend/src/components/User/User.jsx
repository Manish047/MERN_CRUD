import React from 'react';

const User = (props) => {

    
    let birthDate = new Date(props.user.birthDate);
    const dd = String(birthDate.getDate()).padStart(2, '0');
    const mm = String(birthDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = birthDate.getFullYear();
    birthDate = `${dd}/${mm}/${yyyy}`;

    return (
        <div className="user">
            <div className="user-content">
                <h4 className="user-content__name">{props.user.firstName} {props.user.lastName}</h4>
                <table className="user-content__details">
                    <tbody>
                        <tr>
                            <td>Birth Date:</td>
                            <td><p>{birthDate}</p></td>
                        </tr>
                        <tr>
                            <td>Graduation:</td>
                            <td><p>{props.user.graduation}</p></td>
                        </tr>
                        <tr>
                            <td>Nationality:</td>
                            <td><p>{props.user.nationality}</p></td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td><p>{props.user.address.street}, {props.user.address.city} - {props.user.address.pinCode}</p></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="user-actions">
                <button onClick={props.edited}>Edit</button>
                <button onClick={props.deleted}>Delete</button>
            </div>
        </div>
    )
}

export default User;