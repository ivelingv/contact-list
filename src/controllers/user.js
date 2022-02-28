const User = require('../database/models/user')
const UpdateKeys = ['username', 'password', 'name'];

module.exports.list = async ({ query: filter }, res) => {
    try
    {
        const users = await User.find(filter);
        res.status(200).send(users);
    }
    catch(error)
    {
        console.log(error.message);

        res.status(400).send({
            error: error.message,
            date: new Date()
        })
    }
}

module.exports.details = async ( { params: { id }}, res) => {
    try
    {
        const user = await User.findById(id).populate('contacts');
        res.status(200).send(user);
    }
    catch(error)
    {
        console.log(error.message);

        res.status(400).send({
            error: error.message,
            date: new Date()
        })
    }
}

module.exports.create = async ({ body }, res) => {
    try
    {
        var user = new User({
            ...body
        });
        
        await user.save();
        res.status(200).send(user);
    }
    catch(error)
    {
        console.log(error.message);

        res.status(400).send({
            error: error.message,
            date: new Date()
        })
    }
}

module.exports.update = async ({ body, params }, res) => {
    try
    {
        const validKeys = Object.keys(body).every(key => {
            return UpdateKeys.includes(key);
        })

        if (!validKeys) {
            throw new Error('Invalid update parameters');
        }

        let user = await User.findOne({ _id: params.id });
        if (!user) {
            throw new Error(`Could not find user with id ${params.id}`);
        }
    
        Object.keys(body).forEach(key => {
            user[key] = body[key];
        });

        await user.save();
        res.status(200).send(user);
    }
    catch(error)
    {
        console.log(error.message);

        res.status(400).send({
            error: error.message,
            date: new Date()
        })
    }
}

module.exports.delete = async ({ params }, res) => {
    try
    {
        const user = await User.findOneAndDelete({ _id: params.id }, { returnDocument: true });
        if (!user) {
            throw new Error(`Could not find user with id ${params.id}`);
        }

        res.status(200).send(user);
    }
    catch(error)
    {
        console.log(error.message);

        res.status(400).send({
            error: error.message,
            date: new Date()
        })
    }
}