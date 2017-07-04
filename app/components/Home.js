// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';

import * as CRUD from '../dbmodules/crud';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: [{
        detail: []
      }],
      path: `C:/Users/flukky/Downloads/abstraction-668966_960_720.jpg`
    }
    this.getData();
  }
  getData() {
    CRUD.selectedInner((res) => {
      this.setState({
        currency: res
      });

      this.state.currency.map((c, i) => {
        c.guid = i + 1;
      });

      console.log(this.state.currency);
    });
  }
  render() {
    return (
      <div>
        <div className={styles.settingButton} data-tid="settingButton">
          <Link to="/counter">
            <i className="fa fa-cogs fa-3x" />
          </Link>
        </div>
        <div className={styles.container} data-tid="container">
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th} style={{ minWidth: 400 }}>Currency</th>
                  <th className={styles.th}>Denom</th>
                  <th className={styles.th}>Buy</th>
                  <th className={styles.th}>Sell</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.currency.map((c, i) => {
                    return <tr className={styles.row} key={c.guid}>
                      <td className={styles.tr} style={{ minWidth: 500, textAlign: 'left' }}>
                        {
                          i === 0 ?
                            <div>
                              <div className={styles.currency}>
                                <img width="45" height="30" src={c.currencycountryflagpic} />
                                &nbsp; {c.currencyname}
                              </div>
                              <div className={styles.country}>{c.currencycountry}</div>
                              <img className={styles.currencyPic} width="110" height="55" src={c.currencypic} />
                            </div>
                            : this.state.currency[i].currencyid !== this.state.currency[i - 1].currencyid ?
                              <div>
                                <div className={styles.currency}>
                                  <img width="45" height="30" src={c.currencycountryflagpic} />
                                  &nbsp; {c.currencyname}
                                </div>
                                <div className={styles.country}>{c.currencycountry}</div>
                                <img className={styles.currencyPic} width="110" height="55" src={c.currencypic} />
                              </div>
                              : null
                        }
                      </td>
                      {/*this.state.currency[i].currencyid !== this.state.currency[i + 1].currencyid ? styles.borderBottom : null*/}
                      <td className={styles.tr}>{c.detaildenom}</td>
                      <td className={styles.green}>{c.detailbuy}</td>
                      <td className={styles.red}>{c.detailsell}</td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
