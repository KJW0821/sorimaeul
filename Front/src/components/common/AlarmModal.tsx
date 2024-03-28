import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect } from 'react';
import { isProduction } from '../../utils/axios';
import { getCookie } from '../../utils/cookie';

function AlarmModal() {
  const EventSource = EventSourcePolyfill || NativeEventSource;

  useEffect(() => {
    const eventSource = new EventSource(
      `${isProduction ? "https://j10e201.p.ssafy.io/api" : "http://localhost:8000/api"}/sse/connect`, 
      {
        headers: {
          Authorization: getCookie('accessToken')
        }
      }
    );

    eventSource.onmessage = (e) => {
      if (e.type === "message" && e.data.startsWith("{")) {
        console.log(JSON.parse(e.data));
      }
    }

    eventSource.addEventListener("error", function (e) {
      if (e) {
        eventSource.close();
      }
    });

  }, [])

  return (
    <></>
  )
}

export default AlarmModal;