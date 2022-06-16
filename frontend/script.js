// baseUrl to server
const baseURL = 'http://localhost:3000';

// initialize constants to reference to the HTML elements in index.html
// buttons for GET and POST testing
const testGETBtn = document.getElementById('testGET');
const testPOSTBtn = document.getElementById('testPOST');

// buttons for CREATING and DROPPING table in database
const createTableBtn = document.getElementById('createTable');
const dropTableBtn = document.getElementById('dropTable');

// buttons for sending and gettting msg(s) from database
const insertMsgBtn = document.getElementById('insertMsg');
const getMsgBtn = document.getElementById('getMsgs');

// text to insert and retrieve from the database
const txtDisplay = document.getElementById('resDisplay');
const txtToInsert = document.getElementById('sendMsg');

// function to test GET with server
// eslint-disable-next-line no-undef
$(testGETBtn).on('click', () => {
    // axios to perform a GET query
    // eslint-disable-next-line no-undef
    axios.get(`${baseURL}/api`, { params: { message: 'Hello World!' } })
        .then((response) => {
            console.log(response.data);
            txtDisplay.value = `${response.data.message}`;
        })
        .catch((error) => {
            txtDisplay.value = `${error}`;
        });
});

// function to test POST with server
// eslint-disable-next-line no-undef
$(testPOSTBtn).on('click', () => {
    // axios to perform a POST query
    // eslint-disable-next-line no-undef
    axios.post(`${baseURL}/api`, { message: 'Hello Again!' })
        .then((response) => {
            console.log(response.data);
            txtDisplay.value = `${response.data.message}`;
        })
        .catch((error) => {
            txtDisplay.value = `${error}`;
        });
});

// function to create the table in the database
// eslint-disable-next-line no-undef
$(createTableBtn).on('click', () => {
    // axios to perform a POST query
    // eslint-disable-next-line no-undef
    axios.post(`${baseURL}/api/table`, {})
        .then((response) => {
            console.log(response.data);
            txtDisplay.value = `${response.data}`;
        })
        .catch((error) => {
            txtDisplay.value = `${error}`;
        });
});

// function to drop table in the database
// eslint-disable-next-line no-undef
$(dropTableBtn).on('click', () => {
    // axios to perform a DELETE query
    // eslint-disable-next-line no-undef
    axios.delete(`${baseURL}/api/table`, {})
        .then((response) => {
            console.log(response.data);
            txtDisplay.value = `${response.data}`;
        })
        .catch((error) => {
            txtDisplay.value = `${error}`;
        });
});

// function to insert a new message using POST
// eslint-disable-next-line no-undef
$(insertMsgBtn).on('click', () => {
    // axios to perform a POST query
    // eslint-disable-next-line no-undef
    axios.post(`${baseURL}/api/message`, { message: txtToInsert.value })
        .then((response) => {
            console.log(response.data);
            txtDisplay.value = `${response.data.rows[0].message}`;
        })
        .catch((error) => {
            txtDisplay.value = `${error}`;
        });
});

// function to get the messages using GET
// eslint-disable-next-line no-undef
$(getMsgBtn).on('click', () => {
    // axios to perform a POST query
    // eslint-disable-next-line no-undef
    axios.get(`${baseURL}/api/message`, {})
        .then((response) => {
            // initialize the string message
            let strMsgs = '';
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < response.data.length; i++) {
                console.log(response.data[i].message);
                // concatenate the messages
                strMsgs += `id: ${response.data[i].id}, message: ${response.data[i].message} \n`;
            }
            txtDisplay.value = `${strMsgs}`;
        })
        .catch((error) => {
            txtDisplay.value = `${error}`;
        });
});
