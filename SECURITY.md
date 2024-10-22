# Xavfsizlik Siyosati / Security Policy

<div>
  <button onclick="showLanguage('uz')">O‘zbekcha</button>
  <button onclick="showLanguage('en')">English</button>
</div>

<div id="uz" style="display: block;">
  ## Qo‘llab-quvvatlanadigan Versiyalar

  | Versiya | Qo‘llab-quvvatlanadi |
  | ------- | -------------------- |
  | 5.1.x   | ✅ Ha                |
  | 5.0.x   | ❌ Yo‘q              |
  | 4.0.x   | ✅ Ha                |
  | < 4.0   | ❌ Yo‘q              |

  ## Zaiflikni Xabar Qilish

  Agar dasturiy ta’minotda xavfsizlik zaifligini topsangiz, bizga mas’uliyatli ravishda xabar berishingizni so‘raymiz. Quyidagi bosqichlarga amal qilishingizni tavsiya etamiz:

  1. **Qayerga Xabar Berish**  
     - Zaifliklar haqida [email yoki xavfsizlik formasi havolasi] orqali bog‘laning.  
     - Muammoni batafsil tasvirlab, uni qanday qayta tiklash mumkinligini tushuntirib bering.  

  2. **Javob Vaqti**  
     - Xabaringizni olganimizni **48 soat ichida** tasdiqlaymiz.  
     - 5 ish kuni ichida holat va keyingi qadamlar haqida ma’lumot beramiz.  

  3. **Keyingi Qadamlar**  
     - Agar xabar qilingan zaiflik haqiqiy va jiddiy deb topilsa, uni iloji boricha tezroq tuzatib, yangilanishni chiqaramiz.  
     - Sizning ruxsatingiz bilan, mualliflikingizni reliz yozuvlarida ko‘rsatamiz. Agar anonim qolishni istasangiz, bu ham hisobga olinadi.  

  4. **Doiradan Tashqaridagi Xabarlar**  
     - Qo‘llab-quvvatlanmayotgan versiyalardagi yoki loyiha doirasidan tashqaridagi zaifliklar ko‘rib chiqilmasligi mumkin.
</div>

<div id="en" style="display: none;">
  ## Supported Versions

  | Version | Supported          |
  | ------- | ------------------ |
  | 5.1.x   | ✅ Yes             |
  | 5.0.x   | ❌ No              |
  | 4.0.x   | ✅ Yes             |
  | < 4.0   | ❌ No              |

  ## Reporting a Vulnerability

  If you discover a security vulnerability, please report it to us responsibly. Follow the steps below to ensure a smooth reporting process:

  1. **Where to Report**  
     - Submit vulnerabilities via [email/security form link].  
     - Please include a detailed description of the issue and steps to reproduce it.

  2. **Response Time**  
     - We will acknowledge receipt of your report within **48 hours**.  
     - A status update will be provided within **5 business days** regarding our assessment and next steps.

  3. **Next Steps**  
     - If the vulnerability is valid and critical, we will work on a fix and release a patch as soon as possible.  
     - You will be credited in the release notes unless anonymity is requested.

  4. **Out-of-Scope Reports**  
     - Vulnerabilities in unsupported versions or those outside the scope of this project may not be addressed.
</div>

<script>
  function showLanguage(lang) {
    document.getElementById('uz').style.display = lang === 'uz' ? 'block' : 'none';
    document.getElementById('en').style.display = lang === 'en' ? 'block' : 'none';
  }
</script>
