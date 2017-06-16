## PropTypes

| Property        | Type           | Default  | Description |
|:------------- |:------------- |:-------------- |:---------- |
| show      | Boolean | false | whether to open datepicker |
| dateFormat | Array     | ['YYYY', 'M', 'D'] | according to year, month, day format specified display text. E.g ['YYYY年', 'MM月', 'DD日']|
| value | Date | new Date() | date value |
| min  | Date | new Date(1970, 0, 1) | minimum date |
| max | Date | new Date(2050, 0, 1) | maximum date |
| onSelect | Function | () => {} | the callback function after click button of done, Date object as a parameter |
| onCancel | Function | () => {} | the callback function after click button of cancel |
