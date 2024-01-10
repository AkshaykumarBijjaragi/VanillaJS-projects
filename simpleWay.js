const form = document.getElementById("form")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password= document.getElementById("password")
const password2 = document.getElementById("password2")


form.addEventListener("submit", validateForm)




function validateForm(e) {
    e.preventDefault();
    if (username.value === "") {
        showError(username,"username is required")        
    } else {
        showSuccess(username)
    }
    if (email.value === "") {
        showError(email,"email is required")
    }
    else if(!isValidEmail(email.value)){
        showError(email, "email is invalid")
    }    
    else {
        showSuccess(email)
    }
    if (password.value === "") {
        showError(password,"Password is required")
    } else {
        showSuccess(password)
    }
    if (password2.value === "") {
        showError(password2,"confirm password is needed")
    } else {
        showSuccess(password2)
    }
}


if (condition) {
    
} else {
    
}


//check valid email

function isValidEmail(value) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(value);    
}





//show error message with class manipulation of parent
function showError(input,message) {
    const formControl = input.parentElement;    
    formControl.className = "form-control error"
    const small = formControl.querySelector("small")
    small.innerText = message;
}



//show success by altering the border to grees (class manipulation)
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success"

}





