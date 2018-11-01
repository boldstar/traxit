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

  // example
  // engagementStatuses () {
  //   const statuses = this.allEngagements.reduce((acc, engagement) => {
  //     if (acc.indexOf(engagement.status) === -1) {
  //       acc.push(engagement.status)
  //     }
  //     return acc
  //   }, [])
  //   const ordered = mapOrder(statuses, this.statusesOrder)
  //   return ordered
  // }, 