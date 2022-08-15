const Ad = require("../models/ad.model.js");

// Create and Save a new ad
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Customer
    const ad = new Ad({
        content: req.body.content,
        name: req.body.name,
        active: req.body.active
    });

    // Save Customer in the database
    Ad.create(ad, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Ad."
            });
        else res.send(data);
    });
};

// Retrieve all ads from the database.
exports.findAll = (req, res) => {
    Ad.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

// Find a single ad with a customerId
exports.findOne = (req, res) => {
    Ad.findById(req.params.adId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.adId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.adId
                });
            }
        } else res.send(data);
    });
};

// Update a ad identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Customer.updateById(
        req.params.adId,
        new Ad(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found ad with id ${req.params.adId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating ad with id " + req.params.adId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a ad with the specified customerId in the request
exports.delete = (req, res) => {
    AD.remove(req.params.adId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.adId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Customer with id " + req.params.adId
                });
            }
        } else res.send({ message: `Ad was deleted successfully!` });
    });
};

// Delete all ads from the database.
exports.deleteAll = (req, res) => {
    Ad.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all ads."
            });
        else res.send({ message: `All ads were deleted successfully!` });
    });
};
