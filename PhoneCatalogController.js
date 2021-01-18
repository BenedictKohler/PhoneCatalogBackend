// This page is a REST API designed to perform CRUD operations for the Phone Catalog Web App

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const base64Img = require('base64-img');
const fs = require('fs');
const port = process.env.PORT || 8000;
const app = express();
const DBConnection = require("./Config/DBContext");

app.use(cors());
app.use(express.static('./server/images'));
app.use(bodyParser.json({limit: '10mb'}));

// Gets all phones from the database
app.get("/phones", async (req, res) => {

    try {
        let phonesCollection = await DBConnection.collection("Phones").get();

        let phones = [];

        phonesCollection.forEach(doc => {
            phones.push(doc.data());
        });

        res.status(200).json(phones);

    } catch (err) {
        res.status(500).json({ 'Error': err.message });
    }
});

// Adds a new phone to the database
app.post("/phone", async (req, res) => {

    try {

        const image = req.body.imageFileName;

        let autoID = fs.readFileSync('./AutoIncrementID.txt', 'utf8');

        // Add id and date added to the new phone
        req.body.id = autoID;
        req.body.dateAdded = Date.now();

        let filepath = base64Img.imgSync(image, './server/images', Date.now());
        const arr = filepath.split('\\');

        req.body.imageFileName = 'https://phone-catalog-backend.herokuapp.com/' + arr[arr.length - 1];

        await DBConnection.collection("Phones").doc(autoID).set(req.body);

        let newId = parseInt(autoID) + 1;

        fs.writeFileSync('./AutoIncrementID.txt', newId.toString());

        res.sendStatus(200);

    } catch (err) {
        res.status(500).json({ 'Error': err.message });
    }

});

// Gets a phone by id from the database
app.get('/phone/:id', async (req, res) => {
    try {

        let phone = await DBConnection.collection("Phones").doc(req.params.id).get();

        if (!phone.exists) res.sendStatus(404);

        else res.status(200).json(phone.data());

    } catch (err) {
        res.status(500).json({ 'Error': err.message });
    }
});

// Deletes a phone by id in the database
app.delete('/phone/:id', async (req, res) => {

    try {

        // Get the phone to delete if it exists
        let phoneToDelete = await DBConnection.collection("Phones").doc(req.params.id).get();
        if (!phoneToDelete.exists) {
            res.sendStatus(404);
            return;
        }

        phoneToDelete = phoneToDelete.data();

        // Now we must delete image from server/images
        let arr = phoneToDelete.imageFileName.split("/");
        let fileName = arr[arr.length - 1];
        const path = './server/images/' + fileName;

        // Try to remove it
        try {
            fs.unlinkSync(path);
        } catch (err) {
            console.error(err);
        }

        // Finally, delete the data in cloud firestore
        await DBConnection.collection("Phones").doc(req.params.id).delete();
        res.sendStatus(200);

    } catch (err) {
        res.status(500).json({ 'Error': err.message });
    }
});

// Updates an existing phone in the database
app.put('/phone/:id', async (req, res) => {

    try {

        // Make sure the phone to update exists
        let phoneToUpdate = await DBConnection.collection("Phones").doc(req.params.id).get()
        if (!phoneToUpdate.exists) {
            res.sendStatus(404);
            return;
        }

        phoneToUpdate = phoneToUpdate.data();

        // If the user wants a new image
        if (req.body.imageFileName != null) {

            // We must delete its old image from server/images first
            let arr1 = phoneToUpdate.imageFileName.split("/");
            let fileName = arr1[arr1.length - 1];
            const path = './server/images/' + fileName;

            // Try to remove it
            try {
                fs.unlinkSync(path);
            } catch (err) {
                console.error(err);
            }

            // We now add new image to server/images
            const image = req.body.imageFileName;

            let filepath = base64Img.imgSync(image, './server/images', Date.now());
            let arr2 = filepath.split('\\');

            req.body.imageFileName = 'https://phone-catalog-backend.herokuapp.com/' + arr2[arr2.length - 1];

        }

        // Finally we can update the existing phone with the new values
        await DBConnection.collection("Phones").doc(req.params.id).set(req.body, { merge: true });
        res.sendStatus(200);

    } catch (err) {
        res.status(500).json({ 'Error': err.message });
    }

});

// Start the REST API on this port
app.listen(port, () => console.log(`Phone Catalog REST API listening on port ${port}!`));

// module.exports = app;
