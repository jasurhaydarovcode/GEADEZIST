import { message } from 'antd';

let messageDisplayed = false;

export const showErrorMessage = (msg: string) => {
  if (!messageDisplayed) {
    messageDisplayed = true;
    message.error(msg, 1); 
    setTimeout(() => {
      messageDisplayed = false; 
    }, 1500);
  }
};
