/**
 * Created by Thinh-Laptop on 23.11.2017.
 */

// grab the nerd model we just created
let Nerd = require('./models/nerd');
const path = require('path');

module.exports = function (app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    const __prefix = '/api';

    // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    app.get(__prefix + '/', function (req, res) {
        res.json({message: 'hooray! welcome to our api!'});
    });

    app.route(__prefix + '/nerds')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
        .post(function (req, res) {

            let nerd = new Nerd();      // create a new instance of the Bear model
            nerd.name = req.body.name;  // set the bears name (comes from the request)

            // save the bear and check for errors
            nerd.save(function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'Nerd created!'});
            });

        })
        // get all the bears (accessed at GET http://localhost:8080/api/bears)
        .get(function (req, res) {
            Nerd.find(function (err, nerds) {
                if (err){ //if not available
                    res.send(err);
                }

                res.json(nerds);
            });
        });

    app.route(__prefix + '/nerds/:nerd_id')
    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
        .get(function (req, res) {
            Nerd.findById(req.params.nerd_id, function (err, nerd) {
                if (err){
                    res.send(err);
                }
                res.json(nerd);
            });
        })
        // get the bear with that id and change name (accessed at GET http://localhost:8080/api/bears/:bear_id)
        .put(function (req, res) {

            // use our bear model to find the bear we want
            Nerd.findById(req.params.nerd_id, function (err, nerd) {

                if (err)
                    res.send(err);

                nerd.name = req.body.name;  // update the bears info

                // save the bear
                nerd.save(function (err) {
                    if (err)
                        res.send(err);

                    res.json({message: 'Nerd updated!'});
                });

            });
        })
        // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
        .delete(function (req, res) {
            Nerd.remove({
                _id: req.params.nerd_id
            }, function (err, nerd) {
                if (err)
                    res.send(err);

                res.json({message: 'Successfully deleted'});
            });
        });

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // FRONTEND ROUTES
    // =========================================================
    // route to handle all angular requests


    app.get('/', function (req, res) {
        res.sendFile(path.resolve('www/index.html')); // load league html file
    });

    app.get('/league', function (req, res) {
        //if(req.url.endsWith('.js')) res.sendFile(path.resolve(req.url));
        res.sendFile(path.resolve('www/league.html')); // load our public/index.html file
    });

    app.get('/*', function (req, res) {
        res.sendFile(path.resolve('www/index.html')); // load league html file
    });

};
