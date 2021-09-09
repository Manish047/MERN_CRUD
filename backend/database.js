const { MongoClient } = require('mongodb');

const mongoDBUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@maincluster.1cla2.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

let _db;

const initdb = callback => {
    if (_db) {
        console.log('Database initialized')
        return callback(null, _db)
    }
    MongoClient.connect(mongoDBUrl)
        .then(client => {
            _db = client
            callback(null, _db)
        })
        .catch(error => {
            callback(error)
        });
}

const getdb = () => {
    if (!_db) throw new Error('Database not initialized!');
    return _db;
}

module.exports = { initdb, getdb };