import * as mysql from 'mysql';
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root'
});
function connect() {
    connection.connect((err) => {
        chkRes('connect', err);
    });
}

function close() {
    connection.end((err) => {
        chkRes('end', err);
    });
}

function chkRes(mode, err) {
    if (err) {
        console.error(`error ${mode}ing: ${err.stack}`);
        return;
    }
    console.log(`${mode}ed as id ${connection.threadId}`);
}

export { connect, close }
