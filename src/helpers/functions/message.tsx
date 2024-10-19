import { message } from 'antd';

// Global xabar funksiyasi (faqat bitta xatolik xabarini chiqaradi)
let messageDisplayed = false;

export const showErrorMessage = (msg: string) => {
  if (!messageDisplayed) {
    messageDisplayed = true;
    message.error(msg, 1); // Xabar faqat bir marta chiqadi
    setTimeout(() => {
      messageDisplayed = false; // 1 sekunddan so'ng yana xabarni chiqishiga ruxsat beriladi
    }, 2000); // bu vaqtni o'zingiz sozlashingiz mumkin
  }
};
