$(document).on('page:change', function() {
  bindEvents();
  getAllWishes();
  $('#newWish').find('input').focus();
});

// var colors = ["#fc4949", "#5684f7", "#58f4cd", "#f28557", "#fc7e7e", "#bf68f9"];

function bindEvents(){
  $('#newWish').on('submit', makeAWish);
  $('#newWish').on('keyup', checkCharacters);
  // $('#new_question_form').on('submit', newQuestion);
  // $('#question_list').on('click', '.question_title', showQuestion);
  // $('#question_list').on('click', '.delete', deleteQuestion);
  $('body').on('click', '.vote', voteWish);
  // $('#search').on('keyup', search);

  // $('body').on('submit', '.new_answer_form', newAnswer);
  // $('body').on('click', '.answer_vote', voteAnswer);
};

// var getWishes = function(){
//   var data = $(this).serialize();
//   $.ajax({
//     url: "wishes",
//     type: 'get'
//     }).done(function(data) {
//     $('#wishes').html(data);
//     // $('#item-count').text(data.count);
//   }).fail(function() {
//       console.log('error');
//   });
// };

function getAllWishes(){
  var source = $('#all_wishes').html();
  var template = Handlebars.compile(source);
  Handlebars.registerPartial("new_wish", $("#new_wish").html());

  $.ajax({
    url: 'wishes',
    type: 'get'
  }).done(function(wishes) {
    for(var wish in wishes){
      wishes[wish].created_at = moment(wishes[wish].created_at).fromNow();
      // wishes[wish].color = colors[Math.floor(Math.random()*colors.length)];
    };
    context = {wishes: wishes}
    $('#wish_list').html(template(context))
  }).fail(function() {
    console.log('error');
  });
}

var makeAWish = function(){
  event.preventDefault();

  var source = $('#new_wish').html();
  var template = Handlebars.compile(source);
  var data = $(this).serialize();
  $.ajax({
    url: "wishes",
    type: 'post',
    data: data
  }).done(function(wish) {
    wish.created_at = moment(wish.created_at).fromNow();
    // wish.color = colors[Math.floor(Math.random()*colors.length)];
    $('#wish_list').prepend(template(wish));
    $('#newWish').find('input').val('');
    // $('#item-count').text(data.count);
  }).fail(function() {
      console.log('error');
  });
};

var checkCharacters = function(){
  var length = $('#newWish').find('input').val().length;
  $('#wish-length').html(140 - length);
}

// function newQuestion(event){
//   event.preventDefault();

//   var source = $('#new_question').html();
//   var template = Handlebars.compile(source);

//   var data = $(this).serialize();

//   $.ajax({
//       url: 'http://localhost:3000/questions',
//       type: 'post',
//       data: data
//   }).done(function(question) {
//     $('#question_list').prepend(template(question))
//     $('#form_title').val('');
//     $('#form_content').val('');
//   }).fail(function() {
//       console.log('may your jimmies remain unrustled');
//   });
// }

function voteWish(event){
  event.preventDefault();
  var link = $(this);
  var url = $(this).attr('href');

  $.ajax({
    url: 'wishes'+ url,
    type: 'post'
  }).done(function(vote) {
    link.siblings('.vote_count').text(vote)
  }).fail(function() {
      console.log('may your jimmies remain unrustled');
  });
};