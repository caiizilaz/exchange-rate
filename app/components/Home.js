// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import * as CRUD from '../dbmodules/crud';

export default class Home extends Component {
  constructor(props) {
    super(props);
    CRUD.delete();
    CRUD.insert();
    CRUD.update();
    CRUD.select();
  }
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
        </div>
      </div>
    );
  }
}
