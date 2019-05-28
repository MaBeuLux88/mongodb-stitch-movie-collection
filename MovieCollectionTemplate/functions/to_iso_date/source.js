const months = {
  'Jan' : '01',
  'Feb' : '02',
  'Mar' : '03',
  'Apr' : '04',
  'May' : '05',
  'Jun' : '06',
  'Jul' : '07',
  'Aug' : '08',
  'Sep' : '09',
  'Oct' : '10',
  'Nov' : '11',
  'Dec' : '12'
};

exports = function(date) {
  let parts = date.trim().split(" ").reverse();
  parts[1] = months[parts[1]];
  return new Date(parts.join("-"));
};