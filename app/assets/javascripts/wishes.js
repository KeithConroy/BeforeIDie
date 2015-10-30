$(document).on('page:change', function() {
  bindEvents();
  getAllWishes();
  $('#newWish').find('input').focus();
});

var bindEvents = function(){
  $('#newWish').on('submit', makeAWish);
  $('#newWish').on('keyup', checkCharacters);
  $('body').on('click', '.vote', voteWish);
};

var getAllWishes = function(){
  var source = $('#all_wishes').html();
  var template = Handlebars.compile(source);
  Handlebars.registerPartial("new_wish", $("#new_wish").html());

  $.ajax({
    url: 'wishes',
    type: 'get'
  }).done(function(wishes) {
    for(var wish in wishes){
      wishes[wish].created_at = moment(wishes[wish].created_at).fromNow();
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
    $('#wish_list').prepend(template(wish));
    $('#newWish').find('input').val('');
  }).fail(function() {
      console.log('error');
  });
};

var checkCharacters = function(){
  var length = $('#newWish').find('input').val().length;
  $('#wish-length').html(140 - length);
}

var voteWish = function(event){
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