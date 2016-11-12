import _ from 'lodash';

export default 'arrayUtil';

export function randomSort(data) {
  if (_.isArray(data) && data.length) {
    const newArray = _.cloneDeep(data);
    let currentIndex = newArray.length;
    let temporaryValue = null;
    let randomIndex = null;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = newArray[currentIndex];
      newArray[currentIndex] = newArray[randomIndex];
      newArray[randomIndex] = temporaryValue;
    }
    return newArray;
  }
  return data;
}
