export const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return (
        navigator.userAgent.match(/IEMobile/i) ||
        navigator.userAgent.match(/WPDesktop/i)
      );
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    }
  };

export const includesWord = (text, word) => {
  if(!word || word.length === 0)return false;
  const lowerCaseText = text.toLowerCase();
  const lowerCaseWord = word.toLowerCase();

  let foundAll = true;

  if(lowerCaseWord.split(" ").filter(w => w!== '').length === 1){
    const rgx = new RegExp(`dr.`, 'gm');
    const formatedWord = lowerCaseWord.trim().replaceAll(rgx, '').split(" ").filter(w => w!== '')[0];
    if(lowerCaseText.search(formatedWord) >= 0)return true;
  }

  lowerCaseWord.split(" ").forEach(w => {
    if(w.length === 1){
      const rgx = new RegExp(` ${w}`, 'gm');
      foundAll = foundAll && (lowerCaseText.search(rgx) >= 0)
    }
    else foundAll = foundAll && (lowerCaseText.search(w) >= 0)
  })
  return foundAll
}

export const removeDuplicates = (arr) => {
  const obj = {}
  arr.forEach(item => obj[item] = null)
  return Object.keys(obj);
}

export const generateTimeIntervals = (
  step,
  minHour,
  minMinutes,
  maxHour,
  maxMinutes,
) => {
  const now = new Date();
  const dt = new Date(1970, 0, 1, minHour, minMinutes, 0);
  const rc = [];
  while (dt.getDate() === 1) {
    if (
      dt.getHours() >= minHour &&
      dt.getHours() <= maxHour
    ) {
      const hh =
        dt.getHours() < 10 ? `0${dt.getHours()}` : `${dt.getHours()}`;
      const mm =
        dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : `${dt.getMinutes()}`;
      rc.push(hh + ":" + mm);
    }
    dt.setMinutes(dt.getMinutes() + step);
  }
  return rc;
};