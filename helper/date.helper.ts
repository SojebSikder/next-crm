// simple debouce
/**
 * DateHelper
 */
export const DateHelper = {
  // format date
  format: function (date: Date) {
    const d = new Date(date);
    return d.toDateString();
  },
  now: function () {
    const date = new Date();
    return date.toDateString();
  },
  addDays: function (dateData: Date, days: number) {
    days = Number(days);
    const date = new Date(dateData.valueOf());
    date.setDate(date.getDate() + days);
    return date.toDateString();
  },
};

// Date.prototype.addDays = function (days) {
//   var date = new Date(this.valueOf());
//   date.setDate(date.getDate() + days);
//   return date;
// };

// var date = new Date();

// console.log(date.addDays(5));
