module.exports = app => {
    const ads = require("../controllers/ad.controller.js");

    // Create a new Customer
    app.post("/ads", ads.create);

    // Retrieve all Customers
    app.get("/ads", ads.findAll);

    // Retrieve a single Customer with customerId
    app.get("/ads/:adId", ads.findOne);

    // Update a Customer with customerId
    app.put("/ads/:adId", ads.update);

    // Delete a Customer with customerId
    app.delete("/ads/:adId", ads.delete);

    // Create a new Customer
    app.delete("/ads", ads.deleteAll);
};
