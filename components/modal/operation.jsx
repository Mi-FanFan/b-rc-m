/**
 * Created by Freeman on 2017/6/14.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';

export default function (actions =[{ text: '确定' }]) {

  const prefixCls = 'mi-modal';
  let div = document.createElement('div');
  document.body.appendChild(div);

  function close() {
    ReactDOM.unmountComponentAtNode(div);
    div.parentNode.removeChild(div);
  }

  const footer =
    <div className={`${prefixCls}-button-group-v`}>
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
      operation
      footer={footer}
      className="mi-modal-operation"
    /> , div,
  );

  return {
    close,
  };
}
