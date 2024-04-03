$(document).ready(function() {
  $('#req').submit(function(event) {
    event.preventDefault();
    var source_lang = $('#source_lang').val();
    var target_lang = $('#target_lang').val();
    var text = $('#text').val();

    localStorage.setItem('source_lang', source_lang);
    localStorage.setItem('target_lang', target_lang);
    localStorage.setItem('text', text);

    if (source_lang === target_lang) {
      alert('The same languages choice not allowed!');
    } else {
      this.submit();
    }
  });
  if (localStorage.getItem('source_lang') != undefined) {
    $('#source_lang').val(localStorage.getItem('source_lang'));
    $('#target_lang').val(localStorage.getItem('target_lang'));
    $('#text').val(localStorage.getItem('text'));
  }
});
