/**
 * Created by Freeman on 2017/6/14.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import Modal from './Modal'
/**
 *
 * @param title
 * @param message
 * @param callbackOrActions
 * @param type
 * @param defaultValue
 * @return {{close: close}}
 */
export default function (title, message, callbackOrActions,type='default',defaultValue='') {

  if (!callbackOrActions) {

    return
  }
  const prefixCls = 'mi-modal'

  let data = {};
  function onChange(e) {
    const target = e.target;
    const inputType = target.getAttribute('type');
    data[inputType] = target.value;
  }
  let inputDom;
  const focusFn = function (input) {
    setTimeout(() => {
      if (input) {
        input.focus();
      }
    }, 500);
  };
  switch (type) {
    case 'login-password':
      inputDom = (<div>
        <div className={`${prefixCls}-input`}>
          <input type="text" defaultValue={defaultValue} ref={input => focusFn(input)} onChange={onChange}/>
        </div>
        <div className={`${prefixCls}-input`}>
          <input type="password" defaultValue="" onChange={onChange}/>
        </div>
      </div>);
      break;
    case 'secure-text':
      inputDom = (<div>
        <div className={`${prefixCls}-input`}>
          <input type="password" defaultValue="" ref={input => focusFn(input)} onChange={onChange}/>
        </div>
      </div>);
      break;
    case 'plain-text':
    case 'default':
    default:
      inputDom = (<div>
        <div className={`${prefixCls}-input`}>
          <input type="text" defaultValue={defaultValue} ref={input => focusFn(input)} onChange={onChange}/>
        </div>
      </div>);
      break;
  }
  let content = (<div>
    {message}
    {inputDom}
  </div>);


  let div = document.createElement('div')
  document.body.appendChild(div)
  function close () {
    ReactDOM.unmountComponentAtNode(div)
    div.parentNode.removeChild(div)
  }

  function getArgs(func) {
    const text = data.text || '';
    const password = data.password || '';
    if (type === 'login-password') {
      return func(text, password);
    }
    else if (type === 'secure-text') {
      return func(password);
    }
    return func(text);
  }
  let actions;
  if (typeof callbackOrActions === 'function') {
    actions = [
      { text: '取消' },
      { text: '确定', onPress: () => { getArgs(callbackOrActions); } },
    ];
  }
  else {
    actions = callbackOrActions.map(item => {
      return {
        text: item.text,
        onPress: () => {
          if (item.onPress) {
            return getArgs(item.onPress);
          }
        },
      };
    });
  }

  const footer =
    <div className={`${prefixCls}-button-group-${actions.length === 2 ? 'h' : 'v'}`}>
      {
        actions.map((button,index) => {
          const orginPress = button.onPress || function () { }
          button.onPress = () => {
            const res = orginPress()
            if (res && res.then) {
              res.then(() => {
                close()
              })
            }
            else {
              close()
            }
          }
          return <a key={index} className={`${prefixCls}-button`} role="button" onClick={button.onPress}>
            {button.text}
          </a>
        })
      }
    </div>

  ReactDOM.render(
    <Modal
      show
      title={title}
      footer={footer}
    >
      <div
        style={{zoom: 1, overflow: 'hidden'}}
      >
        {content}
      </div>
    </Modal>, div)

  return {
    close,
  }
}
