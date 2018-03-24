/**
 * Created by hermes on 24.03.2018.
 */
"use strict";

export class Audio {
    constructor() {

        this.mediaRecorder = null;
        this.recordedChunks = null;
        this.sourceBuffer = null;

        // Empty constructor
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log('getUserMedia supported.');
            navigator.mediaDevices.getUserMedia({audio : true, video : false})
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
        recordedChunks = [];
        const options = {mimeType: 'audio/webm;codecs=opus'};
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            console.log(options.mimeType + ' is not Supported');
        }
        try{
            mediaRecorder = new MediaRecorder(window.stream, options);
        } catch (err) {
            console.error('Exception while creating MediaRecorder: ' + err);
            alert('Exception while creating MediaRecorder: ' + err);
            return;
        }
        console.log('Created MediaRecorder', mediaRecorder, 'with options', options);

        mediaRecorder.onstop = audio.handleStop;
        mediaRecorder.ondataavailable = audio.handleDataAvailable;

        mediaRecorder.start(30); // collect 30ms of data
        console.log('MediaRecorder started', mediaRecorder);
    }

    stopRecording() {
        mediaRecorder.stop();
        console.log('Recorded Chunks: ', recordedChunks);
    }

    handleStop() {
        console.log('Recorder stopped: ', event);
        console.log('Recorded data length: ', recordedChunks.length)
    }

    handleDataAvailable() {
        if (event.data && event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    }
}