const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const form = document.getElementById("form");

// event listener for submit
form.addEventListener("submit", validateForm);

// validate form

function validateForm(e) {
  e.preventDefault();
  // alert("logged in form")
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 18);
  checkEmail(email);
  checkPasswordMatch(password, password2);
}

//check required function to validate each input

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

//checkLength function to verify min and max length
function checkLength(input, min, max) {
  if (input.value.trim().length < min) {
    showError(
      input,
      `${getFieldName(input)} should be atleast ${min} characters`
    );
  } else if (input.value.trim().length > max) {
    showError(
      input,
      `${getFieldName(input)} should not exceed ${max} characters`
    );
  }
}

// checking whether email is valid or not using regEx

function checkEmail(email) {
  let re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (re.test(email.value.trim())) {
    showSuccess(email);
  } else {
    showError(email, `Email is invalid`);
  }
}

// check password match or not
function checkPasswordMatch(password, password2) {
  if (password.value === password2.value) {
    showSuccess(input);
  } else {
    showError(password2, `Password did not match`);
  }
}

// getFieldName function to return the id With capital casing

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//show error by manipulating classes
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

//show success outline in green

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}
