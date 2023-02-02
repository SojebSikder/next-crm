import { AudioRecorder } from "./AudioRecorder";

/**
 * Audio manager
 */
export class AudioManager {
  static recorder() {
    return AudioRecorder;
  }
}
