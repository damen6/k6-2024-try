
import { check } from 'k6';
import http from 'k6/http';
import { userData } from '../payload.js';

export let options = {
  stages: [
    { duration: '10s', target: 4 }
  ],
  thresholds: {
    http_req_duration: [ "p(95)<1700", "p(99)<2000" ],
    http_req_failed:   [ "rate<0.000001" ],
  },
};

const simpleBaseUrl = 'https://fakestoreapi.com/users/1';
const baseUrl = 'https://fakestoreapi.com/users';
const differentUrl = 'https://fakestoreapi.com/products?limit=5';

function triggerRequestMultipleTimes() {
  const message = userData();

  JSON.stringify(message);

  let headers = { 'Content-Type': 'application/json' };
  const batchAPIs = [['GET', simpleBaseUrl, { headers }], ['GET', baseUrl, { headers }], ['GET', differentUrl, { headers }]];

  let mockResponses = http.batch(batchAPIs);

  for (let i = 0; i < batchAPIs.length; i++) {
    check(mockResponses[i], {
      'status is 200': (r) => r.status && r.status === 200,
    });

    if (mockResponses[i].status && mockResponses[i].status === 200) console.log(mockResponses[i].json());
  }
}

export default function() {
  triggerRequestMultipleTimes();
}
