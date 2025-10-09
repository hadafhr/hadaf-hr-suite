// Utility functions for OpenAI Realtime Audio API

export class AudioRecorder {
  private stream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private processor: ScriptProcessorNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;

  constructor(private onAudioData: (audioData: Float32Array) => void) {}

  async start() {
    try {
      console.log("Starting audio recorder...");
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 24000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      this.audioContext = new AudioContext({
        sampleRate: 24000,
      });
      
      console.log("Audio context created with sample rate:", this.audioContext.sampleRate);
      
      this.source = this.audioContext.createMediaStreamSource(this.stream);
      this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);
      
      this.processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        this.onAudioData(new Float32Array(inputData));
      };
      
      this.source.connect(this.processor);
      this.processor.connect(this.audioContext.destination);
      
      console.log("Audio recorder started successfully");
    } catch (error) {
      console.error('Error accessing microphone:', error);
      throw error;
    }
  }

  stop() {
    console.log("Stopping audio recorder...");
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
    if (this.processor) {
      this.processor.disconnect();
      this.processor = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    console.log("Audio recorder stopped");
  }
}

export const encodeAudioForAPI = (float32Array: Float32Array): string => {
  // Convert Float32Array to Int16Array (PCM16)
  const int16Array = new Int16Array(float32Array.length);
  for (let i = 0; i < float32Array.length; i++) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  
  // Convert Int16Array to Uint8Array with proper byte order (little endian)
  const uint8Array = new Uint8Array(int16Array.buffer);
  
  // Convert to base64
  let binary = '';
  const chunkSize = 0x8000; // Process in chunks to avoid call stack limits
  
  for (let i = 0; i < uint8Array.length; i += chunkSize) {
    const chunk = uint8Array.subarray(i, Math.min(i + chunkSize, uint8Array.length));
    binary += String.fromCharCode.apply(null, Array.from(chunk));
  }
  
  return btoa(binary);
};

// Create WAV file from PCM data
export const createWavFromPCM = (pcmData: Uint8Array): Uint8Array => {
  console.log("Creating WAV from PCM data, size:", pcmData.length);
  
  // Convert bytes to 16-bit samples (little endian)
  const int16Data = new Int16Array(pcmData.length / 2);
  for (let i = 0; i < pcmData.length; i += 2) {
    int16Data[i / 2] = (pcmData[i + 1] << 8) | pcmData[i];
  }
  
  // WAV header parameters
  const sampleRate = 24000;
  const numChannels = 1;
  const bitsPerSample = 16;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const byteRate = sampleRate * blockAlign;
  const dataLength = int16Data.byteLength;
  
  // Create WAV header (44 bytes)
  const wavHeader = new ArrayBuffer(44);
  const view = new DataView(wavHeader);
  
  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  // RIFF header
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataLength, true); // File size minus 8 bytes
  writeString(view, 8, 'WAVE');
  
  // Format chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // Format chunk size
  view.setUint16(20, 1, true); // Audio format (PCM)
  view.setUint16(22, numChannels, true); // Number of channels
  view.setUint32(24, sampleRate, true); // Sample rate
  view.setUint32(28, byteRate, true); // Byte rate
  view.setUint16(32, blockAlign, true); // Block align
  view.setUint16(34, bitsPerSample, true); // Bits per sample
  
  // Data chunk
  writeString(view, 36, 'data');
  view.setUint32(40, dataLength, true); // Data chunk size

  // Combine header and data
  const wavArray = new Uint8Array(wavHeader.byteLength + int16Data.byteLength);
  wavArray.set(new Uint8Array(wavHeader), 0);
  wavArray.set(new Uint8Array(int16Data.buffer), wavHeader.byteLength);
  
  console.log("WAV file created, total size:", wavArray.length);
  return wavArray;
};

// Audio Queue for sequential playback
export class AudioQueue {
  private queue: Uint8Array[] = [];
  private isPlaying = false;
  private audioContext: AudioContext;

  constructor(audioContext: AudioContext) {
    this.audioContext = audioContext;
    console.log("AudioQueue initialized");
  }

  async addToQueue(audioData: Uint8Array) {
    console.log("Adding audio data to queue, size:", audioData.length);
    this.queue.push(audioData);
    if (!this.isPlaying) {
      await this.playNext();
    }
  }

  private async playNext() {
    if (this.queue.length === 0) {
      console.log("Queue empty, stopping playback");
      this.isPlaying = false;
      return;
    }

    this.isPlaying = true;
    const audioData = this.queue.shift()!;
    console.log("Playing next audio chunk, size:", audioData.length);

    try {
      const wavData = createWavFromPCM(audioData);
      // Ensure we have an ArrayBuffer (not SharedArrayBuffer)
      const arrayBuffer = wavData.buffer instanceof ArrayBuffer 
        ? wavData.buffer 
        : new ArrayBuffer(wavData.byteLength).constructor === ArrayBuffer
          ? new Uint8Array(wavData).buffer
          : (() => {
              const buffer = new ArrayBuffer(wavData.byteLength);
              new Uint8Array(buffer).set(new Uint8Array(wavData.buffer));
              return buffer;
            })();
      
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      
      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.audioContext.destination);
      
      source.onended = () => {
        console.log("Audio chunk finished, playing next");
        this.playNext();
      };
      
      source.start(0);
      console.log("Audio chunk started playing");
    } catch (error) {
      console.error('Error playing audio:', error);
      this.playNext(); // Continue with next segment even if current fails
    }
  }

  clear() {
    console.log("Clearing audio queue");
    this.queue = [];
    this.isPlaying = false;
  }
}

// Singleton audio queue instance
let audioQueueInstance: AudioQueue | null = null;

export const playAudioData = async (audioContext: AudioContext, audioData: Uint8Array) => {
  if (!audioQueueInstance) {
    audioQueueInstance = new AudioQueue(audioContext);
  }
  await audioQueueInstance.addToQueue(audioData);
};

export const clearAudioQueue = () => {
  if (audioQueueInstance) {
    audioQueueInstance.clear();
  }
};