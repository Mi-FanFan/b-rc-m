---
order: 0
title: 基本
---


````jsx
import { InputNumber } from 'b-rc-m';

function onChange(value) {
  console.log('changed', value);
}

ReactDOM.render(
  <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
, mountNode);
````
