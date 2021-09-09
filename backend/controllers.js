const db = require('./database');
const ObjectId = require('mongodb').ObjectId;

module.exports.getUsers = async (req, res, next) => {
    try {
        const result = await db.getdb().db().collection('users').find().toArray();
        return res.status(200).json({ message: 'Users fetched successfully!', users: result });
    }
    catch (error) {
        next(error);
    }
}

module.exports.getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const result = await db.getdb().db().collection('users').findOne({ _id: new ObjectId(userId) });
        const user = { ...result, ...result.address };
        delete user['_id'];
        delete user['address'];
        return res.status(200).json({ message: 'User fetched successfully!', user: user });
    }
    catch (error) {
        next(error);
    }
}

module.exports.postUser = async (req, res, next) => {
    try {
        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: new Date(req.body.birthDate),
            graduation: req.body.graduation,
            nationality: req.body.nationality,
            address: {
                street: req.body.street,
                city: req.body.city,
                pinCode: req.body.pinCode
            }
        };
        const result = await db.getdb().db().collection('users').insertOne(newUser);
        return res.status(200).json({ message: 'User added successfully!', result: result });
    }
    catch (error) {
        next(error);
    }
}

module.exports.patchUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const result = await db.getdb().db().collection('users').updateOne({ _id: new ObjectId(userId) }, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthDate: new Date(req.body.birthDate),
                graduation: req.body.graduation,
                nationality: req.body.nationality,
                address: {
                    street: req.body.street,
                    city: req.body.city,
                    pinCode: req.body.pinCode
                }
            }
        });
        return res.status(200).json({ message: 'User updated successfully!', result: result });
    }
    catch (error) {
        next(error);
    }
}

module.exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const result = await db.getdb().db().collection('users').deleteOne({ _id: new ObjectId(userId) });
        return res.status(200).json({ message: 'User deleted successfully!', result: result });
    }
    catch (error) {
        next(error);
    }
}