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
  }

  connect(address) {
    this.socket = new WebSocket(address);

  }

  _send(message) {
    this.socket.send(message);
  }

  _onOpen(event) {
    this.state = STATES.CONNECTED;
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
      case 'connect_ack':
        this.fsm._onConnectAck(message.payload);
        break;
      case 'txDemand_ack':
        this.fsm._onTxDemandAck(message.payload);
        break;
      case 'txCeased_ack':
        this.fsm._onTxCeasedAck(message.payload);
        break;
      case 'txInfo_ind':
        this.fsm._onTxInfoInd(message.payload);
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
    this._send({
      type: 'register_req',
      payload: payload
    });
  }

  groupAttachReq(payload) {
    this._send({
      type: 'groupAttach_req',
      payload: payload
    });
  }

  groupAttachReq(payload) {
    this._send({
      type: 'groupAttach_req',
      payload: payload
    });
  }

  setupReq(payload) {
    this._send({
      type: 'setup_req',
      payload: payload
    });
  }

  setupRes(payload) {
    this._send({
      type: 'setup_res',
      payload: payload
    });
  }

  connectReq(payload) {
    this._send({
      type: 'connect_req',
      payload: payload
    });
  }

  txDemandReq(payload) {
    this._send({
      type: 'txDemand_req',
      payload: payload
    });
  }

  txCeasedReq(payload) {
    this._send({
      type: 'txCeased_req',
      payload: payload
    });
  }

  sendAudio(payload) {
    this._send({
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
