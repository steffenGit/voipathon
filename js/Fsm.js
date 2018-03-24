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
    this.state = REGISTER_STATE.UNREGISTERED;
    this.callId = 0;
    this.type = undefined;
    this.group = 0;
  }

  setConnection(connection) {
    this.connection = connection;
  }


  register(user) {
    if (this.state === REGISTER_STATE.UNREGISTERED) {
      return this.connection.registerReq({
        user  : user,
      });
    } else {
      return 0;
    }
  }

  _onRegisterAck(message) {
    if (message.result === 200) {
      this.state = REGISTER_STATE.REGISTERED;
    }
  }

  attachGroup(groupId) {
    if (this.state === REGISTER_STATE.REGISTERED) {
      return this.connection.groupAttachReq({
        id : groupId
      });
    } else {
      return 0;
    }
  }

  _onGroupAttachAck(message) {
    if (message.result === 200) {
      this.group = message.id;
    }
  }


  setupCall(calledId) {
    if (this.state === REGISTER_STATE.REGISTERED && this.callId === 0) {
      return this.connection.setupReq({
        calledId: calledId
      })
    } else {
      return 0;
    }
  }

  _onSetupAck(message) {
    if(message.result === 200) {
      this.callId = message.callId;
      this.type = 'tx';
    } else {
      this.callId = 0;
      this.type = undefined;
    }
  }

  _onSetupInd(message) {
    this.callId = message.callId;
    this.type = 'rx'
  }

  disconnectCall(callId) {
    if (this.state === REGISTER_STATE.REGISTERED && this.callId !== 0 && this.type === 'rx') {
      return this.connection.disconnectReq({
        callId: callId
      })
    } else {
      return 0;
    }
  }

  _onDisconnectAck(message) {
    if (message.result === 200) {
      this.callId = 0;
      this.type = undefined;

    }
  }

  _onDisconnectInd(message) {
    this.callId = 0;
    this.type = undefined;
  }


}

