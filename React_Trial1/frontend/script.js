// baseUrl to server
const baseURL = 'http://localhost:3000';

// eslint-disable-next-line no-undef
class Menu extends React.Component {
    constructor() {
        super();
        // create a variable "serverResponse" in the state
        this.state = {
            serverResponse: 'Response will show here.',
            values: '',
        };

        // bind the functions so that it cna be found by other functions
        // functions need to be bind to be used
        this.DisplayResponse = this.DisplayResponse.bind(this);
        this.TestGet = this.TestGet.bind(this);
        this.TestPost = this.TestPost.bind(this);
        this.CreateTable = this.CreateTable.bind(this);
        this.DropTable = this.DropTable.bind(this);
        this.PostNewMsg = this.PostNewMsg.bind(this);
        this.HandleChange = this.HandleChange.bind(this);
        this.GetAllMessages = this.GetAllMessages.bind(this);
    }

    // to display server response
    DisplayResponse(objectData) {
        console.log(`DisplayResponse: ${JSON.stringify(objectData)}`);
        // setting state of variable serverResponse in the component
        this.setState({ serverResponse: JSON.stringify(objectData) });
    }

    // to test GET with server
    TestGet() {
        // eslint-disable-next-line no-undef
        axios.get(`${baseURL}/api`, { params: { message: 'Hello World!' } })
            .then((response) => {
                console.log(response.data);
                this.DisplayResponse(response.data.message);
            })
            .catch((error) => {
                console.log(error);
                this.DisplayResponse(error);
            });
    }

    // to create the table in the database
    CreateTable() {
        // eslint-disable-next-line no-undef
        axios.post(`${baseURL}/api/table`, {})
            .then((response) => {
                console.log(response.data);
                this.DisplayResponse(response.data);
            })
            .catch((error) => {
                console.log(error);
                this.DisplayResponse(error);
            });
    }

    // to drop the table in the database
    DropTable() {
        // eslint-disable-next-line no-undef
        axios.delete(`${baseURL}/api/table`, {})
            .then((response) => {
                console.log(response.data);
                this.DisplayResponse(response.data);
            })
            .catch((error) => {
                console.log(error);
                this.DisplayResponse(error);
            });
    }

    // to test POST with server
    TestPost() {
        // eslint-disable-next-line no-undef
        axios.post(`${baseURL}/api`, { message: 'Hello Again!' })
            .then((response) => {
                console.log(response.data);
                this.DisplayResponse(response.data.message);
            })
            .catch((error) => {
                console.log(error);
                this.DisplayResponse(error);
            });
    }

    // to get the value of the input by user
    HandleChange(event) {
        // event.target.value to get the input field value and update the state variable
        this.setState({ values: event.target.value });
    }

    // to post a new message to database
    PostNewMsg(event) {
        // prevent the page from reloading
        event.preventDefault();
        // eslint-disable-next-line no-undef
        axios.post(`${baseURL}/api/message`, { message: this.state.values })
            .then((response) => {
                console.log(response.data);
                this.DisplayResponse(`This is the message entered: ${response.data.rows[0].message}`);
            })
            .catch((error) => {
                console.log(error);
                this.DisplayResponse(error);
            });
    }

    // to get all messages from the database
    GetAllMessages() {
        // eslint-disable-next-line no-undef
        axios.get(`${baseURL}/api/message`, {})
        .then((response) => {
            // initialize the string message
            let strMsgs = '';
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < response.data.length; i++) {
                console.log(response.data[i].message);
                // concatenate the messages
                strMsgs += `id: ${response.data[i].id}, message: ${response.data[i].message} | `;
            }
            this.DisplayResponse(strMsgs);
        })
        .catch((error) => {
            this.DisplayResponse(error);
        });
    }

    render() {
        return (
            <div id="center">
                <div>
                    {/* get value of serverResponse in state */}
                    {/* place it inside the div */}
                    <div id="responses">{this.state.serverResponse}</div>
                </div>

                <h3>Test Buttons</h3>
                <div id="testBtns">
                    {/* Map the button event to function */}
                    <button onClick={this.TestGet} id="testBtn1">Test GET</button><br/><br/>
                    <button onClick={this.TestPost} id="testBtn2">Test POST</button>
                </div>

                <h3>Table Buttons</h3>
                <div id="tableBtns">
                    {/* Map the button event to function */}
                    <button onClick={this.CreateTable} id="testBtn3">Create Table</button><br/><br/>
                    <button onClick={this.DropTable} id="testBtn4">Drop Table</button>
                </div>

                <h3>Messages TO &#38; FROM database</h3>
                <div>
                    <form onSubmit={this.PostNewMsg}>
                        <label>
                            New Message:
                            <input type="text" value={this.state.values} onChange={this.HandleChange} />
                        </label>
                            <input type="submit" value="Send Message" id="testBtn5"/><br/><br/>
                    </form>
                    <button onClick={this.GetAllMessages} id="testBtn6">Retrieve Message</button>
                </div>
            </div>
        );
    }
}

// eslint-disable-next-line no-undef
ReactDOM.render(
    // eslint-disable-next-line no-undef
    React.createElement(Menu, {}),
    document.getElementById('root'),
);

// // baseUrl to server
// const baseURL = 'http://localhost:3000';

// // initialize constants to reference to the HTML elements in index.html
// // buttons for GET and POST testing
// const testGETBtn = document.getElementById('testGET');
// const testPOSTBtn = document.getElementById('testPOST');

// // buttons for CREATING and DROPPING table in database
// const createTableBtn = document.getElementById('createTable');
// const dropTableBtn = document.getElementById('dropTable');

// // buttons for sending and gettting msg(s) from database
// const insertMsgBtn = document.getElementById('insertMsg');
// const getMsgBtn = document.getElementById('getMsgs');

// // text to insert and retrieve from the database
// const txtDisplay = document.getElementById('resDisplay');
// const txtToInsert = document.getElementById('sendMsg');

// // function to test GET with server
// // eslint-disable-next-line no-undef
// $(testGETBtn).on('click', () => {
//     // axios to perform a GET query
//     // eslint-disable-next-line no-undef
//     axios.get(`${baseURL}/api`, { params: { message: 'Hello World!' } })
//         .then((response) => {
//             console.log(response.data);
//             txtDisplay.value = `${response.data.message}`;
//         })
//         .catch((error) => {
//             txtDisplay.value = `${error}`;
//         });
// });

// // function to test POST with server
// // eslint-disable-next-line no-undef
// $(testPOSTBtn).on('click', () => {
//     // axios to perform a POST query
//     // eslint-disable-next-line no-undef
//     axios.post(`${baseURL}/api`, { message: 'Hello Again!' })
//         .then((response) => {
//             console.log(response.data);
//             txtDisplay.value = `${response.data.message}`;
//         })
//         .catch((error) => {
//             txtDisplay.value = `${error}`;
//         });
// });

// // function to create the table in the database
// // eslint-disable-next-line no-undef
// $(createTableBtn).on('click', () => {
//     // axios to perform a POST query
//     // eslint-disable-next-line no-undef
//     axios.post(`${baseURL}/api/table`, {})
//         .then((response) => {
//             console.log(response.data);
//             txtDisplay.value = `${response.data}`;
//         })
//         .catch((error) => {
//             txtDisplay.value = `${error}`;
//         });
// });

// // function to drop table in the database
// // eslint-disable-next-line no-undef
// $(dropTableBtn).on('click', () => {
//     // axios to perform a DELETE query
//     // eslint-disable-next-line no-undef
//     axios.delete(`${baseURL}/api/table`, {})
//         .then((response) => {
//             console.log(response.data);
//             txtDisplay.value = `${response.data}`;
//         })
//         .catch((error) => {
//             txtDisplay.value = `${error}`;
//         });
// });

// // function to insert a new message using POST
// // eslint-disable-next-line no-undef
// $(insertMsgBtn).on('click', () => {
//     // axios to perform a POST query
//     // eslint-disable-next-line no-undef
//     axios.post(`${baseURL}/api/message`, { message: txtToInsert.value })
//         .then((response) => {
//             console.log(response.data);
//             txtDisplay.value = `${response.data.rows[0].message}`;
//         })
//         .catch((error) => {
//             txtDisplay.value = `${error}`;
//         });
// });

// // function to get the messages using GET
// // eslint-disable-next-line no-undef
// $(getMsgBtn).on('click', () => {
//     // axios to perform a POST query
//     // eslint-disable-next-line no-undef
//     axios.get(`${baseURL}/api/message`, {})
//         .then((response) => {
//             // initialize the string message
//             let strMsgs = '';
//             // eslint-disable-next-line no-plusplus
//             for (let i = 0; i < response.data.length; i++) {
//                 console.log(response.data[i].message);
//                 // concatenate the messages
//                 strMsgs += `id: ${response.data[i].id}, message: ${response.data[i].message} \n`;
//             }
//             txtDisplay.value = `${strMsgs}`;
//         })
//         .catch((error) => {
//             txtDisplay.value = `${error}`;
//         });
// });
