export const timestampToTime = (timestamp) => {
  var date = new Date(timestamp);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y + M + D + h + m + s;
};

export const isInteger = (rule, value, callback) => {
  if (!Number(value)){
    callback(new Error("请输入整数"))
  }
  if (value > 999){
    callback(new Error("请输入小于1000的整数"))
  }
  callback();
};

export const isDecimalLessThanOne = (rule, value, callback) => {
  if (!Number(value)){
    callback(new Error("请输入小数"))
  }
  if (value > 1){
    callback(new Error("请输入小于1的小数"))
  }
  callback();
};

export const isDecimal = (rule, value, callback) => {
  if (!Number(value)){
    callback(new Error("请输入小数"))
  }
  callback();
};


