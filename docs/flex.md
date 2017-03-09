### Properties

1. Flex

Name | Type | Default | Description 
--------- | ------------- | ------------- | -------------
direction |	enum:row,row-reverse,column,column-reverse	| row |	项目的排列方向.
wrap	| enum: nowrap,wrap,wrap-reverse|	nowrap	|子元素的换行方式，可选nowrap,wrap,wrap-reverse
justify|	enum: start,end,center,between,around|'start'|	子元素在主轴上的对齐方式.
align|	enum: start/top,center/middle,end/bottom,baseline,stretch	|center |		子元素在交叉轴上的对齐方式.
alignContent|	enum: start,end,center,between,around,stretch|	'stretch'	|有多根轴线时的对齐方式

2. Flex.Item

Flex.Item 组件默认加上了样式flex:1,保证所有 item 平均分宽度, Flex 容器的 children 不一定是 Flex.Item
