type AudoType = {
  audioBlob: Blob;
  audioUrl: string;
};

/**
 * Audio recorder
 */
export class AudioRecorder {
  private static _mediaRecorder: MediaRecorder;
  private static _audioChunks: any[] = [];
  private static _audioBlob: Blob | MediaSource;
  private static _audio: HTMLAudioElement;
  private static _stream: MediaStream;

  /**
   * Record audio
   */
  static start(): Promise<MediaRecorder> {
    return new Promise((resolve, reject) => {
      if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
        //Feature is not supported in browser
        //return a custom error
        reject(
          new Error(
            "mediaDevices API or getUserMedia method is not supported in this browser."
          )
        );
      } else {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
          this._stream = stream;
          this._mediaRecorder = new MediaRecorder(stream);

          if (this._mediaRecorder.state != "recording") {
            this._mediaRecorder.start();
          }

          this._audioChunks = [];

          // store audio data while recording
          this._mediaRecorder.addEventListener("dataavailable", (event) => {
            this._audioChunks.push(event.data);
          });

          resolve(this._mediaRecorder);
        });
      }
    });
  }

  /**
   * Stop recording
   */
  static stop(): Promise<AudoType> {
    return new Promise((resolve) => {
      // convert the audio data chunks to a single audio data blob
      this._mediaRecorder.addEventListener("stop", () => {
        this._audioBlob = new Blob(this._audioChunks);
        const audioUrl = URL.createObjectURL(this._audioBlob);
        this._audio = new Audio(audioUrl);
        const audioBlob = this._audioBlob;
        console.log("stopped audio");

        resolve({ audioBlob, audioUrl });
      });
      if (this._mediaRecorder.state == "recording") {
        this._mediaRecorder.stop();
        this._stopStream(this._stream);
      }
    });
  }

  static play() {
    this._audio.play();
  }
  static pause() {
    this._audio.pause;
  }

  static getAudio() {
    return this._audio;
  }

  private static _stopStream(stream: MediaStream) {
    stream.getTracks().forEach((track) => track.stop());
  }
}
