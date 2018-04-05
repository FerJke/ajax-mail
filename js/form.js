/* use strict */

var validateForm = (function() {
  var parameters, errors = [];

  // input value is not empty
  function isset(elem) {
    if( elem.value.length !== 0 ) {
      return true;
    } else {
      return false;
    }
  }

  // Create span - element for error
  //function createElem(elem) {}

  // Validation input Name
  function validationName() {
    var inp = parameters.form.elements[parameters.name];
    if( !isset(inp) ){
      errors.push(false);
    }
  }

  // Validation input email
  function validationEmail() {
    var inp = parameters.form.elements[parameters.email];
    if( !isset(inp) ){
      errors.push(false);
    }
  }

  // Validation input Phone number
  function validationPhone() {
    var inp = parameters.form.elements[parameters.phone];
    if( !isset(inp) ){
      errors.push(false);
    }
  }

  // Validation textarea
  function validationMessage() {
    var msg = parameters.form.elements[parameters.message];
    if( !isset(msg) ){
      errors.push(false);
    }
  }

  // Check errors array
  function checkError(arr) {
    var stat = true;
    for( var i = 0; i < arr.length; i++ ) {
      if( arr[i] === false ) {
        stat = false;
        return stat;
      }
    }

    return stat;
  }

  // create request message
	// create request message
	function showMessage(msg){
		var wrapper = document.createElement("div");
		wrapper.classList.add("popup");

		var inner = document.createElement("div");
		inner.classList.add("popup__cont");
    inner.innerHTML = msg;

		wrapper.appendChild(inner);
		document.body.appendChild(wrapper);

		setTimeout(function(){
      document.body.removeChild(document.querySelector(".popup"));
    }, 1500);
	}

  // send AJAX
  function sendAJAX(form){
    var formData = new FormData(form);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "mail.php", true);
    xhr.onreadystatechange = function(){
      if( xhr.readyState == 4 && xhr.status == 200 ) {
				form.reset();
        showMessage(this.responseText);
      }
    };
    xhr.send(formData);
  }

  // Validation on submit
  function validate(e) {
    e.preventDefault();

    validationName();
    validationEmail();
    validationPhone();
    validationMessage();
    // check
    var status = checkError(errors);

    // clear errors array
    errors = [];

    // send AJAX if === true

    if( status ) {
      sendAJAX(parameters.form);
    }

  }

  function init() {
    parameters.form.addEventListener("submit", validate);
  }

  return {
    setParam : function (obj) {
      parameters = obj;
    },

    initValidator : function () {
      init();
    }
  }
})(); // end ValidateForm

window.onload = (function(){
  validateForm.setParam({
    form : document.getElementById("contact-form"),
    name : "name",
    email : "emailAddr",
    phone : "phone",
    message : "msg"
  });
  validateForm.initValidator();
})();
