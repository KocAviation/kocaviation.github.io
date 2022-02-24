var serial = "";

async function setSerial() {
  serial = $("#serial-input").val();
  $("#initial").addClass("hidden");
  $("#position-selector").removeClass("hidden");
}

$(window).on("load", function () {
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
  $("html").addClass("paper");
  print();
  $("body").hide();
  location.reload();
}
