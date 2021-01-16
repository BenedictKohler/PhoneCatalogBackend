// This page contains tests to ensure that the REST API's endpoints can perform CRUD operations given valid data

const app = require('../PhoneCatalogController.js');
const supertest = require('supertest');
const request = supertest(app);

// GET: Returns all phones and 200 status code if successfull otherwise 500
describe('GET endpoint: returns all phones from the catalog', () => {
    it('gets phones from the catalog and returns a 200 status code', async done => {
        const res = await request.get('/phones')

        expect(res.status).toBe(200)
        done()
    })
})

// POST: Adds a new phone to the catalog and returns 200 if successful otherwise 500
describe('POST endpoint: adds a new phone to the catalog', () => {
    it('adds a new phone to the catalog', async done => {
        const res = await request.post('/phone')
            .send({
            name: "Samsung S8",
            color: "Purple",
            description: "This is a Samsung smartphone",
            imageFileName: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPDw8PDxAQDw8PDw8PDw8NDw8PDw8PFREXFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGisdHR0rLS0tLS0rLy0tLS0tKy0tLS0tLS0wKy0rLS0tKy0tLS0tKy0tLS0tLS0tKy0tLS0rLf/AABEIAPsAyQMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIDBAUHBgj/xABPEAACAQIBBQgLDAkEAgMAAAABAgADBBEFBhIhMSIkM0FRcXSyExdTYXOBk6Gxs9EHFiMyUlRigpHB0uEUJTRCVWOSoqNywuLwlPEVNUP/xAAZAQADAQEBAAAAAAAAAAAAAAAAAgMBBAX/xAAhEQEAAgICAgMBAQAAAAAAAAAAARECAzEyEyESUWEiQf/aAAwDAQACEQMR…IN0aVemD2KsoxIB2ow/eU4DV3gZdwQiabE0yKvmPlGkTo0qVcfKpVhTHiVhjCObV8Nto31awb/AGTXoI/kk/llj/vfvPmdb+ofhg97958zr/1L+GbBBN8kjyyx73vXnzOv/Uvsi1zZvDrFnV8dWkPMRNegh5JHllkXvYvfmdXy1GN+968+Z1/6l9k2GCHkkeWWH5XzLurhcP0SujgYBwy7DtUjR1jn/OcrV9xvKR101xHH2VexHxDFsZ6agizlbJyvmHl/tP5U7mPFp/esLtP5U7n5m9k9QwTC3+PLvagyp3PzN7IO1BlTufmb2T1FBCxcPLvahyp3PzN7IO1BlTufmb2T1FBCxcPLvagyp3PzN7IO1BlTufmb2T1FBCxcPLvagyp3PzN7I4vuOZVOxF+sxX7p6eghYv8AHmq09xLKjMNPsVNcdbaYbzYgzWfc/wDc4pZMIrVqn6RdBSqMF0aVEH4wpjlOG06/sneQQsWEEEExj//Z',
            manufacturer: "Samsung",
            price: 650,
            processor: "octa-core",
            ram: 4,
            screen: "6.2 inches"
        })
        expect(res.status).toBe(200)
        done()
    })
})

// PUT: Updates an existing phone in the catalog and returns 200 if successful otherwise 500
describe('PUT endpoint: updates an existing phone in the catalog', () => {
    it('updates an existing phone in the catalog', async done => {
        const res = await request.put('/phone/25')
            .send({
                name: "Samsung S4",
                color: "White",
                description: "This is an updated phone",
                imageFileName: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPDw8PDxAQDw8PDw8PDw8NDw8PDw8PFREXFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGisdHR0rLS0tLS0rLy0tLS0tKy0tLS0tLS0wKy0rLS0tKy0tLS0tKy0tLS0tLS0tKy0tLS0rLf/AABEIAPsAyQMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIDBAUHBgj/xABPEAACAQIBBQgLDAkEAgMAAAABAgADBBEFBhIhMSIkM0FRcXSyExdTYXOBk6Gxs9EHFiMyUlRigpHB0uEUJTRCVWOSoqNywuLwlPEVNUP/xAAZAQADAQEBAAAAAAAAAAAAAAAAAgMBBAX/xAAhEQEAAgICAgMBAQAAAAAAAAAAARECAzEyEyESUWEiQf/aAAwDAQACEQMR…IN0aVemD2KsoxIB2ow/eU4DV3gZdwQiabE0yKvmPlGkTo0qVcfKpVhTHiVhjCObV8Nto31awb/AGTXoI/kk/llj/vfvPmdb+ofhg97958zr/1L+GbBBN8kjyyx73vXnzOv/Uvsi1zZvDrFnV8dWkPMRNegh5JHllkXvYvfmdXy1GN+968+Z1/6l9k2GCHkkeWWH5XzLurhcP0SujgYBwy7DtUjR1jn/OcrV9xvKR101xHH2VexHxDFsZ6agizlbJyvmHl/tP5U7mPFp/esLtP5U7n5m9k9QwTC3+PLvagyp3PzN7IO1BlTufmb2T1FBCxcPLvahyp3PzN7IO1BlTufmb2T1FBCxcPLvagyp3PzN7IO1BlTufmb2T1FBCxcPLvagyp3PzN7I4vuOZVOxF+sxX7p6eghYv8AHmq09xLKjMNPsVNcdbaYbzYgzWfc/wDc4pZMIrVqn6RdBSqMF0aVEH4wpjlOG06/sneQQsWEEEExj//Z',
                manufacturer: "Samsung",
                price: 420,
                processor: "octa-core-4",
                ram: 6,
                screen: "4.8 inches"
            })
        expect(res.status).toBe(200)
        done()
    })
})

// DELETE: Deletes a phone from the catalog and returns 200 if successful otherwise 500
describe('DELETE endpoint: deletes a phone from the catalog', () => {
    it('deletes a phone from the catalog', async done => {
        const res = await request.delete('/phone/25')
        expect(res.status).toBe(200)
        done()
    })
})

// GET by Id: Gets a phone by Id in the catalog and returns 200 if successful otherwise 500
describe('GET by Id endpoint: gets a phone by Id from the catalog', () => {
    it('gets a phone by Id from the catalog', async done => {
        const res = await request.get('/phone/16')
        expect(res.status).toBe(200)
        done()
    })
})
