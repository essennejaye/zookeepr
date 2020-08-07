const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');
const router = require('express').Router();

// get method requires 2 arguments, first a string describing the route the client will fetch from
// second a callback function that executes every time the route is accessed, res = response, req = request
router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// params usually used to get one data record parameter is whatever follows : in path
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// post represents action of client requesting server to accept data
router.post('/animals', (req, res) => {
    // console.log(req);
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    if (!validateAnimal(req.body)) {
        // console.log('validation failed')
        res.status(400).send('The animal is not properly formatted.');
    } else {
        // console.log('validation passed')

        // add animal to json file and animals array in this function
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});
module.exports = router;
