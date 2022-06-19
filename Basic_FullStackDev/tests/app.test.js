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