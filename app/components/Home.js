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
      }]
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
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th} style={{minWidth: 400}}>Currency</th>
                <th className={styles.th}>Denom</th>
                <th className={styles.th}>Buy</th>
                <th className={styles.th}>Sell</th>
              </tr>
            </thead>
          </table>
          <tbody>
            {
              this.state.currency.map((c) => {
                return <tr className={styles.row} key={c.guid}>
                  <td className={styles.tr} style={{minWidth: 400, textAlign: 'left'}}>
                    <div>{c.currencyname}</div>
                    <div>{c.currencycountry}</div>
                  </td>
                  <td className={styles.tr}>{c.detaildenom}</td>
                  <td className={styles.tr}>{c.detailbuy}</td>
                  <td className={styles.tr}>{c.detailsell}</td>
                </tr>
              })
            }
          </tbody>
        </div>
      </div>
    );
  }
}
