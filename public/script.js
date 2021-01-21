// client-side js, loaded by index.html
// run by the browser each time the page is loaded

console.log("hello world :o");

//variable to store user input
var user1_in=''

//Specifies the language of the input text. 
var lang_from = 'en';

//Specifies the language of the output text. 
var lang_to= 'es'


// event to capture send button click
$('.send_message').click(function(e) {
  user1_in = $('.message_input').val();
  $('.message_input').val('');
  console.log("user1_in:", user1_in);
  AddtoChat(user1_in,'right');
  fetch("/translate?user_in="+ user1_in +"&lang_from="+lang_from+"&lang_to="+lang_to)
  .then(response=> {
    response.json().then(function(data) {
      console.log(data[0]['translations'][0].text);
      AddtoChat(data[0]['translations'][0].text,'left');
    });
  });
});

// event to capture Enter button
$('.message_input').keyup(function(e) {
  if (e.which === 13) {
    user1_in = $('.message_input').val();
    $('.message_input').val('');
    console.log("user1_in:", user1_in);
    AddtoChat(user1_in,'right');
    fetch("/translate?user_in="+ user1_in +"&lang_from="+lang_from+"&lang_to="+lang_to)
      .then(response=> {
      response.json().then(function(data) {
        console.log(data[0]['translations'][0].text);
        AddtoChat(data[0]['translations'][0].text,'left');
      });    
    }); 
  }
});

// Function to add user input ang translated text to UI
function AddtoChat(text,message_side) {
	var $messages, message;

	$messages = $('.messages');
	message = new Message({
		text: text,
		message_side: message_side,
		messageid:'.messages'
	});
	message.draw();
	$messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
	
};

// Function to create individual message elements
function Message(arg) {

    this.text = arg.text, this.message_side = arg.message_side;
		this.messageid=arg.messageid;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $(_this.messageid).append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
};
