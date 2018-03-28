/**
 * Created by peleikis on 24.03.2018.
 */
'use strict';

export const REGISTER_STATE = {
  UNREGISTERED: 0,
  REGISTERED: 1
};

export class Fsm {
  constructor() {
    this.connection = undefined;
    this.id = undefined;
    this.state = REGISTER_STATE.UNREGISTERED;
    this.callId = 0;
    this.type = undefined;
    this.group = 0;
    this.onopen = undefined;
    // this.groupAttached = undefined;
    this.groupAttached = groupID => {
      console.log('Attached to group: ', groupID);
      this.group = groupID;
    };
    this.onCallReady = undefined;
    this.onCallEnded = undefined;
  }

  setConnection(connection) {
    this.connection = connection;
  }

  register(user) {
    if (this.state === REGISTER_STATE.UNREGISTERED) {
      return this.connection.registerReq({
        user: user
      });
    } else {
      return 0;
    }
  }

  _onRegisterAck(message) {
    if (message.result === 200) {
      this.state = REGISTER_STATE.REGISTERED;
      this.onopen();
    }
  }

  attachGroup(groupId) {
    if (this.state === REGISTER_STATE.REGISTERED) {
      return this.connection.groupAttachReq({
        id: groupId
      });
    } else {
      return 0;
    }
  }

  _onGroupAttachAck(message) {
    if (message.result === 200) {
      this.group = message.id;
      this.groupAttached(this.group);
    }
  }

  setupCall(calledId) {
    console.log(
      'FSM::setupCall - ignoring calledID parameter and using this.group instead: ',
      this.group
    );
    if (this.state === REGISTER_STATE.REGISTERED && this.callId === 0) {
      return this.connection.setupReq({
        calledId: this.group
      });
    } else {
      return 0;
    }
  }

  _onSetupAck(message) {
    if (message.result === 200) {
      this.callId = message.callId;
      this.type = 'tx';
    } else {
      this.callId = 0;
      this.type = undefined;
      this.onCallReady(this.id, 'tx');
    }
  }

  _onSetupInd(message) {
    this.callId = message.callId;
    this.type = 'rx';
    this.onCallReady(message.callingId, 'rx');
  }

  disconnectCall(callId) {
    callId = callId || this.callId;
    if (
      this.state === REGISTER_STATE.REGISTERED &&
      this.callId !== 0 &&
      this.type === 'rx'
    ) {
      return this.connection.disconnectReq({
        callId: callId
      });
    } else {
      return 0;
    }
  }

  _onDisconnectAck(message) {
    if (message.result === 200) {
      this.callId = 0;
      this.type = undefined;
      this.onCallEnded(message.callId);
    }
  }

  _onDisconnectInd(message) {
    this.callId = 0;
    this.type = undefined;
    this.onCallEnded(message.callId);
  }
}
