module.exports = {
  colorsHelper: function (color) {
    if (["lightgray", "gold", "palevioletred"].includes(color)) {
      return "black";
    } else {
      return "white";
    }
  },
};
