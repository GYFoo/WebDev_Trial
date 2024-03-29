// TEST (jest)
// 1. installed jest - npm install --save-dev jest
// 2. installed supertest - npm i supertest --save-dev
// 3. initialized a jest file - npx jest --init, npm run test to run it
// 4. created a test
// 5. afterAll to close the database connection to end the process
// 6. set the connection pool size when testing to 1 (database.js)
// 7. git rm --cached .env (to remove from commit)
const request = require('supertest');
const app = require('../app');
const dbConn = require('../database');

beforeEach(() => {
    return dbConn.query('BEGIN');
});
afterEach(() => {
    return dbConn.query('ROLLBACK');
});

afterAll(() => {
    return dbConn.end();
})

// send a request to app.js to test
test('It should get the current time', () => {
    return request(app)
        .get('/now')
        .expect(200)
        .then((response) => {
            return expect(response.body.now).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
        });
});

// test if user can be post to database
test('It should create new user userTest with password a123', () => {
    return request(app).post('/users').send({ username: 'userTest', password: 'a123' }).expect(201);
});

// test that there should not be any duplicated users with same password
test('It should NOT create new user userTest1 with the same password', () => {
    const appRequest = request(app);
    const payload = { username: 'userTest', password: 'a123' };
    return appRequest.post('/users').send(payload).expect(201).then(() => appRequest.post('/users').send(payload).expect(409));
});

// test that there should not be any duplicated users with different password
test('It should NOT create new user userTest1 with the different password', () => {
    const appRequest = request(app);
    const diffPayLoad = { username: 'userTest', password: 'aaaaa' };
    return appRequest.post('/users').send(diffPayLoad).expect(201).then(() => appRequest.post('/users').send(diffPayLoad).expect(409));
});

// test that jwt is given
test('It should give me a jwt', () => {
    const appRequest = request(app);
    const payload = { username: 'userTest', password: 'a123' };
    return appRequest
        .post('/users')
        .send(payload)
        .expect(201)
        .then(() => appRequest.post('/sessions').send(payload).expect(201))
        .then((response) => expect(response.body.token).toEqual(expect.anything()));
});

// test that jwt should not be given when the wrong password is given
test('It should give me a jwt when wrong password is given', () => {
    const appRequest = request(app);
    const payload = { username: 'userTest', password: 'a123' };
    const diffPayLoad = { username: 'userTest', password: 'aaaaa' };
    return appRequest
        .post('/users')
        .send(payload)
        .expect(201)
        .then(() => appRequest.post('/sessions').send(diffPayLoad).expect(401))
        .then((response) => expect(response.body.error).toMatch(/Wrong Password/));
});

// test that jwt should not be given when user does not exist
test('It should give me a jwt when user does not exist', () => {
    const appRequest = request(app);
    const payload = { username: 'userTest', password: 'a123' };
    const diffPayLoad = { username: 'user', password: 'aaaaa' };
    return appRequest
        .post('/users')
        .send(payload)
        .expect(201)
        .then(() => appRequest.post('/sessions').send(diffPayLoad).expect(404))
        .then((response) => expect(response.body.error).toMatch(/not found!/));
});