/**
 * Created by peleikis on 24.03.2018.
 */
"use strict";
export const STATES = {
  DISCONNECTED : 0,
  CONNECTED    : 1,
};

export class Connection {


  constructor() {
    this.socket = undefined;
    this.state = STATES.DISCONNECTED;
    this.fsm = undefined;
    this.audioDestination = undefined;
    this.onopen = undefined;
  }

  connect(address) {
    this.socket = new WebSocket(address);

  }

  _send(message) {
    if(this.state === STATES.DISCONNECTED)
      return 0;
    this.socket.send(message);
    return 1;
  }

  _onOpen(event) {
    this.state = STATES.CONNECTED;
    this.onopen();
  }

  _onMessage(message) {
    switch (message.type) {
      case 'audio':
        this.audioDestination.play(message.payload);
        break;
      case 'register_ack':
        this.fsm._onRegisterAck(message.payload);
        break;
      case 'groupAttach_ack':
        this.fsm._onGroupAttachAck(message.payload);
        break;
      case 'setup_ack':
        this.fsm._onSetupAck(message.payload);
        break;
      case 'setup_ind':
        this.fsm._onSetupInd(message.payload);
        break;
      case 'disconnect_ack':
        this.fsm._onDisconnectAck(message.payload);
        break;
      case 'disconnect_ind':
        this.fsm._onDisconnectInd(message.payload);
        break;
    }
  }

  registerReq(payload) {
    return this._send({
      type: 'register_req',
      payload: payload
    });
  }

  groupAttachReq(payload) {
    return this._send({
      type: 'groupAttach_req',
      payload: payload
    });
  }

  setupReq(payload) {
    return this._send({
      type: 'setup_req',
      payload: payload
    });
  }

  setupRes(payload) {
    return this._send({
      type: 'setup_res',
      payload: payload
    });
  }

  disconnectReq(payload) {
    return this._send({
      type: 'disconnect_req',
      payload: payload
    });
  }

  sendAudio(payload) {
    return this._send({
      type: 'audio',
      payload: payload
    })
  }

  _onClose(event) {
    this.state = STATES.DISCONNECTED;
  }

  _onError(event) {
    this.state = STATES.DISCONNECTED;
  }

  setFsm(fsm) {
    this.fsm = fsm;
  }

  setAudioDestination(audiodestination) {
    this.audioDestination = audiodestination;
  }



}
