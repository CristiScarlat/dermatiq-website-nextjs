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
    else {
      try{
        foundAll = foundAll && (lowerCaseText?.search(w) >= 0)
      }
      catch (e){
        console.log(e)
      }
    }
  })
  return foundAll
}

export const removeDuplicates = (arr) => {
  const obj = {}
  arr.forEach(item => obj[item] = null)
  return Object.keys(obj);
}

// export const generateTimeIntervals = (
//   step,
//   startHour,
//   startMin,
//   endHour,
//   endMin
// ) => {
//   const strEndHour =
//     endHour < 10 ? `0${endHour}` : endHour;
//   const strEndMin =
//     endMin < 10 ? `0${endMin}` : endMin;
//   const dt = new Date(1970, 0, 1, startHour, startMin, 0);
//   const rc = [];
//   while (dt.getDate() === 1) {
//     const hh =
//       dt.getHours() < 10 ? `0${dt.getHours()}` : `${dt.getHours()}`;
//     const mm =
//       dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : `${dt.getMinutes()}`;
//     rc.push(hh + ":" + mm);
//     dt.setMinutes(dt.getMinutes() + step);
//   }
//   console.log({rc})
//  return rc.filter((t, index, arr) => index < arr.indexOf(strEndHour + ":" + strEndMin))
// };

export const generateTimeIntervals = (
  step,
  startHour,
  startMin,
  endHour,
  endMin
) => {
  const dt = new Date(1970, 0, 1, startHour, 0, 0);
  const rc = [];
  while (dt.getDate() === 1) {
    if(dt.getHours() <= endHour)rc.push([dt.getHours(), dt.getMinutes()]);
    dt.setMinutes(dt.getMinutes() + step);
  }
  let startRcIndex = null;
  let endRcIndex = null;
  rc.filter((t, i) => startHour === t[0])
    .forEach((t, i, arr) => {
      if(startMin === arr[0]){
        startRcIndex = rc.indexOf(arr[i])
      }
      else if(startMin <= arr[arr.length-1][1] && arr[i+1] && startMin >= arr[i][1] && startMin <= arr[i+1][1]){
        startRcIndex = rc.indexOf(arr[i]);
      }
      else if(startMin >= arr[arr.length-1][1] && startMin >= arr[i][1]){
        startRcIndex = rc.indexOf(arr[i])
      }
    })
  endRcIndex = startRcIndex
  rc.filter((t, i) => endHour === t[0])
    .forEach((t, i, arr) => {
      if(endMin !== 0 && endMin > t[1]){
        endRcIndex = rc.indexOf(arr[i])
      }
      else if(endMin === 0){
        endRcIndex = rc.indexOf(arr[0])-1
      }
    })
  return rc.filter((t, index) => index >= startRcIndex && index <= endRcIndex)
    .map(t =>{
      const hh =
        t[0] < 10 ? `0${t[0]}` : `${t[0]}`;
      const mm =
        t[1] < 10 ? `0${t[1]}` : `${t[1]}`;
      return hh + ":" + mm;
    });
};