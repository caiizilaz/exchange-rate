// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Counter.css';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import * as CRUD from '../dbmodules/crud';

class Counter extends Component {
  logChange(val) {
    if (val !== null) {
      this.setState({
        selectedCurrency: val.value
      });
    } else {
      this.setState({
        selectedCurrency: ''
      });
    }
    this.cancel();
  }
  addCurrency() {
    this.setState({
      manageMode: 'add'
    });
  }
  editCurrency() {
    let currencyToEdit = this.state.currency.filter((c) =>
      c.currencyid === this.state.selectedCurrency);
    this.setState({
      manageMode: 'edit',
      selectedCurrencyName: currencyToEdit[0].currencyname,
      selectedCurrencyCountry: currencyToEdit[0].currencycountry
    });
  }
  cancel() {
    this.setState({
      manageMode: ''
    });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  edit() {
    if (this.state.selectedCurrencyName === ''
      || this.state.selectedCurrencyCountry === '') {
      alert('กรอกข้อมูลให้ครบถ้วน');
    } else {
      let currency = {
        currencyname: this.state.selectedCurrencyName,
        currencycountry: this.state.selectedCurrencyCountry
      }
      CRUD.update(currency, this.state.selectedCurrency, (res) => {
        alert('แก้ไขสกุลเงินสำเร็จ');
        this.setState({
          selectedCurrency: '',
          manageMode: ''
        });
        this.getData();
      });
    }
  }
  remove() {
    CRUD.delete(this.state.selectedCurrency, (res) => {
      alert('ลบสกุลเงินสำเร็จ');
      this.setState({
        selectedCurrency: '',
        manageMode: ''
      });
      this.getData();
    });
  }
  save() {
    if (this.state.currencyname === ''
      || this.state.currencycountry === '') {
      alert('กรอกข้อมูลให้ครบถ้วน');
    } else {
      let currency = {
        currencyname: this.state.currencyname,
        currencycountry: this.state.currencycountry
      }
      CRUD.insert(currency, (res) => {
        alert('เพิ่มสกุลเงินสำเร็จ');
        this.setState({
          manageMode: ''
        });
        this.getData();
      });
    }
  }
  getData() {
    CRUD.select((res) => {
      res.map((r) => {
        r.label = r.currencyname
        r.value = r.currencyid
      });
      this.setState({
        currency: res
      });
    });
  }
  manageDetail() {
    CRUD.selectDetail(this.state.selectedCurrency, (res) => {
      this.setState({
        manageMode: 'manageDetail',
        detailList: res
      });
    });
  }
  addDetail() {
    this.setState({
      manageMode: 'addDetail'
    });
  }
  saveDetail() {
    if (this.state.buy === ''
      || this.state.sell === '') {
      alert('กรอกข้อมูลให้ครบถ้วน');
    } else {
      let detail = {
        currencyid: this.state.selectedCurrency,
        detaildenom: this.state.denom,
        detailbuy: this.state.buy,
        detailsell: this.state.sell
      }
      CRUD.insertDetail(detail, (res) => {
        alert('เพิ่มรายละเอียดของสกุลเงินสำเร็จ');
        this.setState({
          manageMode: ''
        });
        this.manageDetail();
      });
    }
  }
  deleteDetail(id) {
    CRUD.deleteDetail(id, (res) => {
      alert('ลบรายละเอียดสกุลเงินสำเร็จ');
      this.setState({
        manageMode: ''
      });
      this.manageDetail();
    });
  }
  editDetail(data) {
    this.setState({
      manageMode: 'editDetail',
      selectedDetail: data.detailid,
      selectedDenom: data.detaildenom,
      selectedBuy: data.detailbuy,
      selectedSell: data.detailsell
    });
  }
  cancelAddDetail() {
    this.setState({
      manageMode: 'manageDetail'
    })
  }
  cancelEditDetail() {
    this.setState({
      selectedDetail: ''
    })
  }
  saveEditDetail() {
    if (this.state.selectedBuy === ''
      || this.state.selectedSell === '') {
      alert('กรอกข้อมูลให้ครบถ้วน');
    } else {
      let detail = {
        detaildenom: this.state.selectedDenom,
        detailbuy: this.state.selectedBuy,
        detailsell: this.state.selectedSell
      }
      CRUD.updateDetail(detail, this.state.selectedDetail, (res) => {
        alert('แก้ไขรายละเอียดสกุลเงินสำเร็จ');
        this.setState({
          selectedDetail: ''
        });
        this.manageDetail();
      });
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      selectedCurrency: '',
      manageMode: '',
      currencyname: '',
      currencycountry: '',
      selectedCurrencyName: '',
      selectedCurrencyCountry: '',
      denom: '',
      buy: '',
      sell: '',
      selectedDetail: '',
      selectedDenom: '',
      selectedBuy: '',
      selectedSell: '',
    }
    this.getData();
  }
  render() {
    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div className={styles.container} data-tid="container">
          <h3>สกุลเงิน</h3>
          <div className={styles.SelectContainer}>
            <Select
              name="currencylist"
              value={this.state.selectedCurrency}
              options={this.state.currency}
              onChange={this.logChange.bind(this)}
            />
          </div>
          <i className={`fa fa-plus fa-2x ${styles.addCurrency}`}
            onClick={this.addCurrency.bind(this)}></i>
          {
            this.state.selectedCurrency !== '' ?
              <span>
                <i className={`fa fa-cog fa-2x ${styles.editCurrency}`}
                  onClick={this.editCurrency.bind(this)}></i>
                <br />
                <button
                  onClick={this.manageDetail.bind(this)}>
                  จัดการรายละเอียดของสกุลเงิน
                </button>
              </span>
              : null
          }
        </div>
        {
          this.state.manageMode === 'add' ?
            <div className={styles.containerMinus}>
              <h3>เพิ่มสกุลเงินใหม่</h3>
              <label htmlFor="currencyname">ชื่อสกุลเงิน : </label>
              <input type="text"
                name="currencyname"
                className={styles.input}
                value={this.state.currencyname}
                onChange={this.onChange.bind(this)} />
              <br />
              <label htmlFor="currencycountry">ชื่อประเทศ : </label>
              <input type="text"
                name="currencycountry"
                className={styles.input}
                value={this.state.currencycountry}
                onChange={this.onChange.bind(this)} />
              <div>
                <button onClick={this.save.bind(this)}>เพิ่ม</button>
                <button onClick={this.cancel.bind(this)}>ยกเลิก</button>
              </div>
            </div>
            : null
        }
        {
          this.state.manageMode === 'edit' ?
            <div className={styles.containerMinus}>
              <h3>แก้ไขสกุลเงิน</h3>
              <label htmlFor="selectedCurrencyName">ชื่อสกุลเงิน : </label>
              <input type="text"
                name="selectedCurrencyName"
                className={styles.input}
                value={this.state.selectedCurrencyName}
                onChange={this.onChange.bind(this)} />
              <br />
              <label htmlFor="selectedCurrencyCountry">ชื่อประเทศ : </label>
              <input type="text"
                name="selectedCurrencyCountry"
                className={styles.input}
                value={this.state.selectedCurrencyCountry}
                onChange={this.onChange.bind(this)} />
              <div>
                <button onClick={() => this.edit()}>แก้ไข</button>
                <button onClick={() => this.remove()}>ลบ</button>
                <button onClick={() => this.cancel()}>ยกเลิก</button>
              </div>
            </div>
            : null
        }
        {
          this.state.manageMode === 'manageDetail'
            || this.state.manageMode === 'addDetail'
            || this.state.manageMode === 'editDetail' ?
            <div className={styles.containerMinus}>
              <h3>จัดการรายละเอียดสกุลเงิน</h3>
              <button
                onClick={() => this.addDetail()}>
                เพิ่มรายละเอียดสกุลเงิน
              </button>
              {
                this.state.manageMode === 'addDetail' ?
                  <div>
                    <label htmlFor="denom">Denom : </label>
                    <input type="text"
                      name="denom"
                      className={styles.input}
                      value={this.state.denom}
                      onChange={this.onChange.bind(this)} />
                    <br />
                    <label htmlFor="buy">Buy : </label>
                    <input type="number"
                      name="buy"
                      className={styles.input}
                      value={this.state.buy}
                      onChange={this.onChange.bind(this)} />
                    <br />
                    <label htmlFor="sell">Sell : </label>
                    <input type="number"
                      name="sell"
                      className={styles.input}
                      value={this.state.sell}
                      onChange={this.onChange.bind(this)} />
                    <div>
                      <button
                        onClick={this.saveDetail.bind(this)}>
                        เพิ่มรายละเอียด
                      </button>
                      <button
                        onClick={this.cancelAddDetail.bind(this)}>
                        ยกเลิก
                      </button>
                    </div>
                  </div>
                  : null
              }
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.tr}>Denom</th>
                    <th className={styles.tr}>Buy</th>
                    <th className={styles.tr}>Sell</th>
                    <th className={styles.tr}>Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.detailList.map((d) => {
                      if (this.state.selectedDetail === d.detailid) {
                        return <tr key={d.detailid}>
                          <td className={styles.tr}>
                            <input type="text"
                              name="selectedDenom"
                              className={styles.input}
                              value={this.state.selectedDenom}
                              onChange={this.onChange.bind(this)} />
                          </td>
                          <td className={styles.tr}>
                            <input type="number"
                              name="selectedBuy"
                              className={styles.input}
                              value={this.state.selectedBuy}
                              onChange={this.onChange.bind(this)} />
                          </td>
                          <td className={styles.tr}>
                            <input type="number"
                              name="selectedSell"
                              className={styles.input}
                              value={this.state.selectedSell}
                              onChange={this.onChange.bind(this)} />
                          </td>
                          <td className={styles.tr}>
                            <button
                              onClick={() => this.saveEditDetail()}>
                              บันทึก
                              </button>
                            <button
                              onClick={() => this.cancelEditDetail()}>
                              ยกเลิก
                              </button>
                          </td>
                        </tr>
                      } else {
                        return <tr key={d.detailid}>
                          <td className={styles.tr}>{d.detaildenom}</td>
                          <td className={styles.tr}>{d.detailbuy}</td>
                          <td className={styles.tr}>{d.detailsell}</td>
                          <td className={styles.tr}>
                            <button
                              onClick={() => this.editDetail(d)}>
                              แก้ไข
                              </button>
                            <button
                              onClick={() => this.deleteDetail(d.detailid)}>
                              ลบ
                              </button>
                          </td>
                        </tr>
                      }
                    })
                  }
                </tbody>
              </table>
            </div>
            : null
        }
      </div>
    );
  }
}

export default Counter;