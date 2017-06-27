// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import * as CRUD from '../dbmodules/crud';

export default class Home extends Component {
  constructor(props) {
    super(props);
    CRUD.delete((res) => {
      console.log(res);
    });
    CRUD.insert((res) => {
      console.log(res);
    });
    CRUD.update((res) => {
      console.log(res);
    });
    CRUD.select((res) => {
      console.log(res);
    });
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
