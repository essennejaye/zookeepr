const { filterByQuery, findById, createNewZookeeper, validateZookeeper } = require('../../lib/zookeepers');
const { zookeepers } = require('../../data/zookeepers');
const router = require('express').Router();

// get method requires 2 arguments, first a string describing the route the client will fetch from
// second a callback function that executes every time the route is accessed, res = response, req = request
router.get('/zookeepers', (req, res) => {
    let results = zookeepers;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// params usually used to get one data record parameter is whatever follows : in path
router.get('/zookeepers/:id', (req, res) => {
    const result = findById(req.params.id, zookeepers);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// post represents action of client requesting server to accept data
router.post('/zookeepers', (req, res) => {
    // console.log(req);
    // set id based on what the next index of the array will be
    req.body.id = zookeepers.length.toString();

    if (!validateZookeeper(req.body)) {
        // console.log('validation failed')
        res.status(400).send('The zookeeper is not properly formatted.');
    } else {
        // console.log('validation passed')

        // add zookeeper to json file and zookeepers array in this function
        const zookeeper = createNewZookeeper(req.body, zookeepers);
        res.json(zookeeper);
    }
});
module.exports = router;
