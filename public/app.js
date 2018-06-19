function getResult() {
  $.getJSON("/all", function(data){
    for(var i = 0; i < data.length; i++){
      var cardcontainer = $('<div>').addClass('card red lighten-2');
      var cardcontent = $('<div>').addClass('card-content white-text');
      var titles = $('<span>').addClass('card-title title truncate');
      var summary = $('<p>').addClass('summary truncate');
      var urlcontainer = $('<div>').addClass('card-action');
      var url = $('<a>').addClass('URL').text("Read More").attr('href', data[i].URL);
      // console.log(data[i].URL);
      titles.text(data[i].Title);
      summary.text(data[i].Summary);
      urlcontainer.append(url);
      // console.log(data[i]);
      cardcontent.append(titles);
      cardcontent.append(summary);
      cardcontainer.append(cardcontent);
      cardcontainer.append(urlcontainer);
      // $(".card-content").append(titles);
      // $(".card-content").append(summary);
      $(".cardcontainer").append(cardcontainer);
      // $(".card-action").append(summary);
    }
    // $(".title").append(titles);
    // $(".summary").append(summary);
  })
}

getResult();

// function getResult() {
//   $.getJSON("/all", function(data){
//     for(var i = 0; i < data.length; i++){
//       var carddisplay = $('<div>').addClass('card-content white-text');
//       var cardcontent = $('<div>').addClass('card-content white-text');
//       var card = $('<div>').addClass('card red lighten-2');
//       var titles = $('<span>').addClass('card-title title truncate');
//       var summary = $('<p>').addClass('summary truncate');
//       // var url = $('<a>').addClass('URL truncate');
//       titles.text(data[i].Title);
//       summary.text(data[i].Summary);
//       console.log(data[i]);
//       card.append(titles);
//       card.append(summary)
//       // $(".card-content").append(titles);
//       // $(".card-content").append(summary);
//       $(cardcontent).append(card);
//       // $(".card-action").append(summary);
//     }
//     $(".card").append(card);
//     // $(".title").append(titles);
//     // $(".summary").append(summary);
//   })
// }

// getResult();