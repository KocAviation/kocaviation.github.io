let serial = "1232123";

$(window).on("load", function () {
  new QRCode("test", {
    text: `https://kocaviation.github.io/item.html?serial=${serial}`,
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.L,
  });
});
