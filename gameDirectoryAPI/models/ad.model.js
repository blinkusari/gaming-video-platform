const sql = require("../models/db.js");

// constructor
const Ad = function(ad) {
    this.content = ad.content;
    this.name = ad.name;
    this.active = ad.active;
};

Ad.create = (newAd, result) => {
    sql.query("INSERT INTO ads SET ?", newAd, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created ad: ", { id: res.insertId, ...newAd });
        result(null, { id: res.insertId, ...newAd });
    });
};

Ad.findById = (adId, result) => {
    sql.query(`SELECT * FROM ads WHERE id = ${adId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found ad: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found ad with the id
        result({ kind: "not_found" }, null);
    });
};

Ad.getAll = result => {
    sql.query("SELECT * FROM ads", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("ads: ", res);
        result(null, res);
    });
};

Ad.updateById = (id, ad, result) => {
    sql.query(
        "UPDATE ads SET content = ?, name = ?, active = ? WHERE id = ?",
        [ad.content, ad.name, ad.active, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found ad with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated ad: ", { id: id, ...ad });
            result(null, { id: id, ...ad });
        }
    );
};

Ad.remove = (id, result) => {
    sql.query("DELETE FROM ads WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found ad with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted ad with id: ", id);
        result(null, res);
    });
};

Ad.removeAll = result => {
    sql.query("DELETE FROM ads", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} ads`);
        result(null, res);
    });
};

module.exports = Ad;
