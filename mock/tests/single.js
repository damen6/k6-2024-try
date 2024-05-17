
import { check } from 'k6';
import http from 'k6/http';
import { userData } from '../payload.js';

export const options = {
  scenarios: {
    u5_duration_5s: {
      executor: "constant-arrival-rate",
      duration: "5s", // total duration
      preAllocatedVUs: 5,
      rate: 500, // 500 TPS
      timeUnit: "1s",
    },
    u10_duration_10s: {
      executor: "constant-arrival-rate",
      duration: "10s", // total duration
      preAllocatedVUs: 10,
      rate: 500, // 500 TPS
      timeUnit: "1s",
    },
  },
};

const baseUrl = 'https://fakestoreapi.com/products?limit=5';

export default function() {
  const message = userData();

  const data = JSON.stringify(message);

  let headers = { 'Content-Type': 'application/json' };

  let mockResponse = http.get(baseUrl, { headers });

  check(mockResponse, {
    'status is 200': (r) => r.status === 200,
  });

  if (mockResponse.status === 200) console.log(mockResponse.json());
}
