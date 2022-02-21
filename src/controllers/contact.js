const dataset = [
    {
        id: "1",        
        firstName: "Ivelin",
        lastName: "Georgiev",
        phone: "+5643874321",
        email: "sadad@asdas.bg",
        age: 30,
    },
    {
        id: "2",        
        firstName: "Neque",
        lastName: "Porro",
        phone: "+78781521",
        email: "uiyiyy@asdas.bg",
        age: 25,
    },
    {
        id: "3",        
        firstName: "Quia sit amet",
        lastName: "Dolor",
        phone: "+89746515",
        email: "serwrw@asdas.bg",
        age: 27,
    },
];


module.exports.list = (req, res) => {
    try
    {
        if (req.query.firstName !== undefined) {
            var results = dataset
                .filter(item => item.firstName === req.query.firstName);

            res.status(200).send(results);
            return;
        }

        res.status(200).send(dataset);
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

module.exports.details = (req, res) => {
    try
    {
        var detail = dataset.filter((item) => {
            return item.id === req.params.id;
        }).pop();

        if (detail === undefined) {
            throw new Error(`Entity with id ${req.params.id} not found`);
        }

        res.status(200).send(detail);
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