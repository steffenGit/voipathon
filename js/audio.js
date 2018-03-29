/**
 * Created by hermes on 24.03.2018.
 */
'use strict';

export class Audio {
  constructor() {
    this.mediaRecorder = null;
    this.recordedChunks = null;
    this.sourceBuffer = null;
    this.connection = undefined;
    // Empty constructor
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia supported.');
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then(function(stream) {
          window.stream = stream;
          console.log('getUserMedia() got stream: ', stream);
        })
        .catch(function(err) {
          console.error('The following getUserMedia error occured: ' + err);
        });
    } else {
      console.log('getUserMedia not supported on your browser!');
    }
  }

  startRecording() {
    this.recordedChunks = [];
    const options = { mimeType: 'audio/webm;codecs=opus' };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.log(options.mimeType + ' is not Supported');
    }
    try {
      this.mediaRecorder = new MediaRecorder(window.stream, options);
    } catch (err) {
      console.error('Exception while creating MediaRecorder: ' + err);
      // alert('Exception while creating MediaRecorder: ' + err);
      return;
    }
    console.log(
      'Created MediaRecorder',
      this.mediaRecorder,
      'with options',
      options
    );

    this.mediaRecorder.onstop = this.handleStop;
    this.mediaRecorder.ondataavailable = this.handleDataAvailable;

    this.mediaRecorder.start(30); // collect 30ms of data
    console.log('MediaRecorder started', this.mediaRecorder);
  }

  stopRecording() {
    this.mediaRecorder.stop();
    console.log('Recorded Chunks: ', this.recordedChunks);
  }

  handleStop() {
    console.log('Recorder stopped: ', event);
    console.log('Recorded data length: ', this.recordedChunks.length);
  }

  handleDataAvailable() {
    if (event.data && event.data.size > 0) {
      this.recordedChunks.push(event.data);
    }
  }

  onAudio(data) {
    console.log(data);
  }

  setConnection(connection) {
    this.connection = connection;
  }
}
