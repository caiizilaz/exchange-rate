import connection from '../dbmodules/connection';

export default {

    select() {
        connection.query('select * from currency', function (err, res) {
            if (err) throw err;
            console.log(res);
        });
    },
    insert() {
        let currency = {
            currencyname: 'name',
            currencycountry: 'country',
            currencycountryflagpic: 'flag.jpg',
            currencypic: 'pic.jpg'
        }
        connection.query('insert into currency set ?', currency, function (err, res) {
            if (err) throw err;
            console.log(res);
        });
    },
    update() {
        let currency = {
            currencyname: 'uname'
        }
        connection.query('update currency set ?', currency, function (err, res) {
            if (err) throw err;
            console.log(res);
        });
    },
    delete() {
        connection.query('delete from currency', function (err, res) {
            if (err) throw err;
            console.log(res);
        });
    },
}