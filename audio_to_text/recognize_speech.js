// Imports the Google Cloud client library
const fs = require('fs');
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const filename = 'Local path to audio file, e.g. /path/to/audio.raw';
// const encoding = 'Encoding of the audio file, e.g. LINEAR16';
// const sampleRateHertz = 16000;
// const languageCode = 'BCP-47 language code, e.g. en-US';

const config = {
  enableWordTimeOffsets: true,
  encoding: encoding,
  sampleRateHertz: sampleRateHertz,
  languageCode: languageCode,
};
const audio = {
  content: fs.readFileSync(filename).toString('base64'),
};

const request = {
  config: config,
  audio: audio,
};

// Detects speech in the audio file
const [response] = await client.recognize(request);
response.results.forEach(result => {
  console.log('Transcription: ', result.alternatives[0].transcript);
  result.alternatives[0].words.forEach(wordInfo => {
    // NOTE: If you have a time offset exceeding 2^32 seconds, use the
    // wordInfo.{x}Time.seconds.high to calculate seconds.
    const startSecs =
      `${wordInfo.startTime.seconds}` +
      '.' +
      wordInfo.startTime.nanos / 100000000;
    const endSecs =
      `${wordInfo.endTime.seconds}` +
      '.' +
      wordInfo.endTime.nanos / 100000000;
    console.log(`Word: ${wordInfo.word}`);
    console.log(`\t ${startSecs} secs - ${endSecs} secs`);
  });
});