/**
 * Created by peleikis on 24.03.2018.
 */
"use strict";
export const CALL_STATE = {
  DISCONNECTED : 0,
  CONNECTED    : 1,
  CONNECTING   : 2
};

export const TX_STATE = {
  IDLE : 0,
  RX   : 1,
  TX   : 2,
};

export const CALL_TYPE = {
  P2P : 0,
  P2M: 1,
};


export class Call {
  constructor() {
    this.id = 0;
    this.caller = 0;
    this.called = 0;
    this.txState = TX_STATE.IDLE;
    this.callType = undefined;
    this.state = CALL_STATE.DISCONNECTED;
  }
}

