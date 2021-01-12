const User = require('../db_modules/user_schema');

class UserService {
    constructor() {
    }

    #formatJsonToSearch(fName, sName) {
        let jsonFormat = {};
        if (fName && sName) {
            jsonFormat = {
                'firstName': {$regex: '.*' + fName + '.*'},
                'secondName': {$regex: '.*' + sName + '.*'}
            };
        } else if (fName && !sName) {
            jsonFormat = {'firstName': {$regex: '.*' + fName + '.*'}};
        } else if (!fName && sName) {
            jsonFormat = {'secondName': {$regex: '.*' + sName + '.*'}}
        } else {
            jsonFormat = undefined;
        }
        return jsonFormat;
    }

    getUsers({ fName, sName }) {
        return new Promise((resolve, reject) => {
            const json = this.#formatJsonToSearch(fName, sName);
            User.find(json, (err, document) => {
                if (err) reject(err);
                resolve(document);
            })
        });
    }

    getUsersById({ userId }) {
        return new Promise((resolve, reject) => {
            User.findById(userId, (err, document) => {
                if (err) reject(err);
                resolve(document);
            })
        });
    }

    getUsersByCredentials({ userEmail }) {
        // TODO: enviar el token de verificacion.
        return User.findOne({'email': userEmail})
    }

    registerUser({ user }) {
        return new Promise((resolve, reject) => {
            const newUser = new User(user);
            newUser.save((err, document) => {
                if (err) reject(err);
                resolve(document);
            });
        });
    }

    updateUser({ userId, user }) {
        return new Promise((resolve, reject) => {
            User.updateOne({'_id': userId}, user, (err, document) => {
                if (err) reject(err);
                resolve(document);
            });
        });
    }

    deleteUser({ userId }) {
        return new Promise(((resolve, reject) => {
            User.deleteOne({'_id': userId}, (err, document) => {
                if (err) reject(err);
                resolve(document);
            })
        }))
    }
}

module.exports = UserService;