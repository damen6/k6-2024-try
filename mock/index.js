// Solution 1: using xk6 lib, but NOT WORKING .. [Reference: https://github.com/grafana/xk6] (Verified)

// import http, { mock } from 'k6/x/mock';

// const mockUrl = 'http://mock-bis-api.com';

// mock(mockUrl, app => {
//   app.get('/test', () => {
//     res.json({ data: [{ id: '1' }, { id: '2' }] });
//   });
// });

// export default async function () {
//   const res = await http.asyncRequest('GET', mockUrl);

//   console.log('🏝️🏝️🏝️🏝️: ', res.json());
// }

// Solution 2: using faker js to mock data [Reference: https://fakerjs.dev/guide/usage]

import { sleep } from 'k6';
import multiple from './tests/multiple.js';
import single from './tests/single.js';

export default function() {
  single();
  sleep(Math.random() * 2);
  multiple();
}
