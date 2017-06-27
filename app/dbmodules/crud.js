import connection from '../dbmodules/connection';

export default {
    select(callback) {
        connection.query('select * from currency',
            (err, res) => {
                if (err) throw err;
                callback(res);
            });
    },
    insert(callback) {
        let currency = {
            currencyname: 'name',
            currencycountry: 'country',
            currencycountryflagpic: 'flag.jpg',
            currencypic: 'pic.jpg'
        }
        connection.query('insert into currency set ?', currency,
            (err, res) => {
                if (err) throw err;
                callback(res);
            });
    },
    update(callback) {
        let currency = {
            currencyname: 'uname'
        }
        connection.query('update currency set ?', currency,
            (err, res) => {
                if (err) throw err;
                callback(res);
            });
    },
    delete(callback) {
        connection.query('delete from currency',
            (err, res) => {
                if (err) throw err;
                callback(res);
            });
    }
}