// 画面が読み込まれたら実行
document.addEventListener('DOMContentLoaded', () => {
  
  // チェック対象の入力欄を取得
  const nameInput = document.getElementById('name');
  const kanaInput = document.getElementById('kana');
  const emailInput = document.getElementById('email');
  
  // フォーム自体を取得（HTMLのクラス名「main-form」から取得）
  const formElement = document.querySelector('.main-form');

  // イベントリスナーを設定（入力欄からフォーカスが外れた時「blur」にチェック）
  if (nameInput) nameInput.addEventListener('blur', () => checkEmpty(nameInput, 'name-error', 'お名前を入力してください。'));
  if (kanaInput) kanaInput.addEventListener('blur', () => checkEmpty(kanaInput, 'kana-error', 'フリガナを入力してください。'));
  if (emailInput) emailInput.addEventListener('blur', () => checkEmpty(emailInput, 'email-error', 'メールアドレスを入力してください。'));

  // 【追加】フォームが送信されようとしたときのイベント
  if (formElement) {
    formElement.addEventListener('submit', (e) => {
      // 全ての項目をチェック
      const isNameValid  = checkEmpty(nameInput, 'name-error', 'お名前を入力してください。');
      const isKanaValid  = checkEmpty(kanaInput, 'kana-error', 'フリガナを入力してください。');
      const isEmailValid = checkEmpty(emailInput, 'email-error', 'メールアドレスを入力してください。');

      // 1つでもエラーがあれば、送信（ページ遷移）を中止する
      if (!isNameValid || !isKanaValid || !isEmailValid) {
        e.preventDefault(); // 送信をブロック
        alert('入力内容に不備があります。赤枠の項目を確認してください。');
      }
    });
  }

  // 空チェックを行う共通の関数（戻り値として成否を返すように少し改良）
  function checkEmpty(inputElement, errorId, message) {
    if (!inputElement) return false;
    const errorElement = document.getElementById(errorId);
    if (!errorElement) return false;
    
    if (inputElement.value.trim() === '') {
      // 空だった場合：エラーメッセージを表示し、枠線を赤くする
      errorElement.textContent = message;
      errorElement.style.display = 'block';
      inputElement.classList.add('input-error');
      return false; // チェック失敗
    } else {
      // 入力されている場合：エラーを消す
      errorElement.textContent = '';
      errorElement.style.display = 'none';
      inputElement.classList.remove('input-error');
      return true; // チェック成功
    }
  }
});
