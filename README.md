# Commands

```bash
# json format
k6 run --out json=mock/test.json mock/index.js

# html format
k6 run --out web-dashboard=report=logs.html mock/index.js

# multiple scenario example
k6 run --out web-dashboard=report=logs.html scenarios/index.js
```
