"use strict";
import {Fsm} from 'js/fsm';
import {STATES, Connection} from './connection';

class App {

  constructor() {
    this.connection = new Connection();
    this.fsm = new Fsm();
    this.connection.setFsm(this.fsm);
    this.fsm.setConnection(this.connection);
  }


}

let app = new App();