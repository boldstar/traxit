 export function mapOrder  (array, order) {
    const newArray = [...array]
    newArray.sort( function (a, b) {
      if (order.indexOf(a) > order.indexOf(b)) {
        return 1;
      } else {
        return -1;
      }       
    });     
    return newArray;
  }