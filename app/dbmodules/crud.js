import connection from '../dbmodules/connection';

export default {
    select(callback) {
        connection.query('select * from currency',
            (err, res) => {
                if (err) throw err;
                callback(res);
            });
    },
    insert(currency, callback) {
        connection.query('insert into currency set ?', currency,
            (err, res) => {
                if (err) throw err;
                callback(res);
            });
    },
    update(currency, id, callback) {
        connection.query('update currency set ? where currencyid = ' + id, currency,
            (err, res) => {
                if (err) throw err;
                callback(res);
            });
    },
    delete(id, callback) {
        connection.query('delete from currency where currencyid = ' + id,
            (err, res) => {
                if (err) throw err;
                callback(res);
            });
    },
    // Detail
    insertDetail(detail, callback) {
        connection.query('insert into detail set ?', detail,
            (err, res) => {
                if (err) throw err;
                callback(res);
            });
    },
    selectDetail(id, callback) {
        let query = '';
        if (id === null) {
            query = 'select * from detail'
        } else {
            query = 'select * from detail where currencyid = ' + id
        }
        connection.query(query,
            (err, res) => {
                if (err) throw err;
                callback(res);
            });
    },
    deleteDetail(id, callback) {
        connection.query('delete from detail where detailid = ' + id,
            (err, res) => {
                if (err) throw err;
                callback(res);
            });
    },
    updateDetail(detail, id, callback) {
        connection.query('update detail set ? where detailid = ' + id, detail,
            (err, res) => {
                if (err) throw err;
                callback(res);
            });
    },
    selectedInner(callback) {
        let query = `select * from currency inner join detail 
                    on currency.currencyid = detail.currencyid
                    order by currency.currencyid`;
        connection.query(query,
            (err, res) => {
                if (err) throw err;
                callback(res);
            });
    }
}