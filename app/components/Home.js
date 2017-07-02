// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';

import * as CRUD from '../dbmodules/crud';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: []
    }
    this.getData();
  }
  getData() {
    CRUD.select((res) => {
      this.setState({
        currency: res
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
          <ul>
            {
              this.state.currency.map((c) => {
                return <li key={c.currencyid}>{c.currencyname}</li>
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}
