const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const password2 = document.getElementById("password2")
const form = document.getElementById("form")



// event listener for submit
form.addEventListener("submit",validateForm);



// validate form

function validateForm(e) {
    e.preventDefault();
    // alert("logged in form")
    if (username.value==="") {
        showError(username,"username is required");
    } else {
        showSuccess(username);
    }

    if (email.value==="") {
        showError(email, "email is required")
    } else {
        showSuccess(email)
    }
    if (password.value==="") {
        showError(password,"password is required")
    } else {
        showSuccess(password)
    }
    if (password2.value==="") {
        showError(password2,"conform password is required")
    } else {
        showSuccess(password2)        
    }
}


//show error by manipulating classes
function showError(input,message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error"
    const small = formControl.querySelector("small")
    small.innerText = message;
}



//show success outline in green

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success"
}


