/*
  modifiy bootstap carousel to emulate multi item per view
  @param {string} elementID html element id
  @param {integer} numItems number of total items displeyed per view
  ref: http://www.bootply.com/132400
*/
export default (elementID, numItems) => {
  $('#' + elementID).find('.item').each((index, item) => {
    let next = $(item).next();
    if (!next.length) {
      next = $(item).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(item));
    for (let i = 0; i < numItems; i++) {
      next = next.next();
      if (!next.length) {
        next = $(item).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(item));
    }
  });
};
