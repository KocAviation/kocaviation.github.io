var serial = "";

async function setSerial() {
  serial = $("#serial-input").val();
  $("#initial").addClass("hidden");
  $("#position-selector").removeClass("hidden");
}

function getURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split("&");
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split("=");
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}

function resetApp() {
  $("html").addClass("paper");
  print();
  $("body").hide();
  window.location.replace(window.location.toString().split('?')[0])
}

$(window).on("load", function () {
  let currentParam = getURLParameter("print")
  if (currentParam !== undefined) {
    serial = currentParam;
    $("#initial").addClass("hidden");
    $("#position-selector").removeClass("hidden");
  }
  for (let i = 1; i <= 14; i++) {
    $("#position-selector")
      .children()
      .last()
      .attr("onclick", `createSticker(${i})`);
    if (i != 14) {
      $("#position-selector").append($(".sticker-picker").last().clone());
    }
  }
});

function createSticker(posIndex) {
  $("#position-selector").addClass("hidden");
  $("#page-created").removeClass("hidden");
  for (let i = 1; i <= 14; i++) {
    if (i == posIndex) {
      $("#paper").append(
        $("#sticker-template").clone().removeAttr("id").removeClass("hidden")
      );
    } else {
      $("#paper").append(
        $("#sticker-buffer").clone().removeAttr("id").removeClass("hidden")
      );
    }
  }
  $("#sticker-template").remove();
  $("#serial").text(serial);
  new QRCode(document.getElementById("qr"), {
    text: `https://kocaviation.github.io/item.html?serial=${serial}`,
    width: 100,
    height: 100,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.L,
  });
  resetApp();
}