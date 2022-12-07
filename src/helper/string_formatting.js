// Library of custrom string formatting functions for use around the website.

function capitalizeEach(str) {
  const strArr = str.split(' ');
  const capitalWords = strArr.map(word => word[0].toUpperCase() + word.slice(1));
  return capitalWords.join(' ');
}

export { capitalizeEach };