//@flow
import React from 'react';
import './App.css';
import data from './Chat/message_1';

type Multimedia = {
  uri: string,
  creation_timestamp: number
}

type MessageType = {
  audio_files?: Array<Multimedia>,
  content?: string,
  photos?: Array<Multimedia>,
  sender_name: string,
  timestamp_ms: number
}

type MessageProps = {
  message: MessageType
}

function toDateFormat(timestampInMs: number): string{
  const date = new Date(timestampInMs);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  return day + '/' + month + '/' + year + ' at ' + hour + ':' + min + ':' + sec ;
}

function Message({ message }: MessageProps) {
  const { audio_files, content, sender_name, timestamp_ms } = message;
  let actualContent = content;
  if(actualContent == null) {
    actualContent = audio_files == null ? "fotos" : "audio";
  }
  return (
    <div>
      {sender_name} sent: {actualContent} - the {toDateFormat(timestamp_ms)}
    </div>
  );
}

function App() {
  const messages = data['messages'].reverse().filter(message => message['content'] != null);
  return (
    <div className="App">
      <header className="App-header">
        { messages.map((message) => <Message message={message} key={message['timestamp_ms']}/>) }
      </header>
    </div>
  );
}

export default App;
