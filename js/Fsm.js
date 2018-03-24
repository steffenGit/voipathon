/**
 * Created by peleikis on 24.03.2018.
 */
"use strict";


export const REGISTER_STATE = {
  UNREGISTERED : 0,
  REGISTERED   : 1,
};


export class Fsm {
  constructor() {
    this.connection = undefined;
    this.id = undefined;
    this.registerState = REGISTER_STATE.UNREGISTERED;
    this.call = undefined;
    this.group = 0;
  }

  setConnection(connection) {
    this.connection = connection;
  }


  _onRegisterAck(message) {
    if (message.result === 200) {
      this.registerState = REGISTER_STATE.REGISTERED;
    }
  }

  _onGroupAttachAck(message) {
    if (message.result === 200) {
      this.group = message.id;
    }
  }

  _onSetupAck(message) {
    if (message.result === 200) {

    }
  }

  _onSetupInd(message) {

  }

  _onConnectAck(message) {
    if (message.result === 200) {

    }
  }

  _onTxDemandAck(message) {
    // TODO: needed here?
  }

  _onTxCeasedAck(message) {
    // TODO: needed here?
  }

  _onTxInfoInd(message) {

  }

  _onDisconnectAck(message) {
    if (message.result === 200) {
      
    }
  }



  _onDisconnectInd(message) {
    this.call = undefined;
  }


}

