/*
  Apex Service — уведомления о заявках.

  ВНИМАНИЕ: сайт статический (GitHub Pages, без сервера), поэтому токен ниже
  виден любому через "просмотр кода страницы". Используйте для этого отдельного
  бота, не связанного ни с чем другим. Если токен когда-либо скомпрометируют —
  зайдите к @BotFather → выберите бота → Bot Settings → Revoke Token, старый
  токен перестанет работать, впишите сюда новый.
*/
(function () {
  'use strict';

  var TELEGRAM_BOT_TOKEN = '8907787572:AAFa6z67E55Tyhx4g4p8vXnsXGtCRHO5l5c';
  var TELEGRAM_CHAT_ID = '5344545424';

  // Google Sheets пока не подключены — впишите сюда URL Google Apps Script
  // Web App, когда он будет готов, чтобы заявки дополнительно писались в таблицу.
  var GOOGLE_SHEETS_URL = '';

  function sendTelegram(title, lines) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
    var text = title + '\n' + (lines || []).join('\n');
    var url = 'https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/sendMessage';
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: text })
    }).catch(function () {});
  }

  function sendToSheet(title, lines) {
    if (!GOOGLE_SHEETS_URL) return;
    fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title, details: (lines || []).join(' | '), date: new Date().toISOString() })
    }).catch(function () {});
  }

  window.apexNotify = function (title, lines) {
    sendTelegram(title, lines);
    sendToSheet(title, lines);
  };
})();
