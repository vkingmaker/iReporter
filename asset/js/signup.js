(function(){
    'use strict';
    const emailInput = document.querySelector('#email');
    const emailError = document.querySelector('.emailError');
    const formError = document.querySelector('.formError');
    const firstnameError = document.querySelector('.firstnameError');
    const passwordError = document.querySelector('.passwordError');
    const lastnameError = document.querySelector('.lastnameError');
    const phonenoError = document.querySelector('.phonenoError');
    const passwordInput = document.querySelector('#password');
    const phoneNoInput = document.querySelector('#phoneNo');
    const firstnameInput = document.querySelector('#firstname');
    const lastnameInput = document.querySelector('#lastname');
    const signUpBtn = document.querySelector('#signUp');
    let firstnameValue;
    let lastnameValue;
    let passwordValue;
    let emailValue;
    let phonenoValue;

    emailInput.addEventListener("blur",(e)=>{
const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(pattern.test(e.target.value)){
                emailError.textContent = '';
                e.target.style.border = '';
                emailValue = e.target.value;
            }else{
                emailError.textContent = `${e.target.value} is an invalid email`;
                e.target.style.border = "1px solid red";
                emailValue = '';
            }
        });

        passwordInput.addEventListener("blur",(e)=>{
            const pattern= /[Aa-zZ0-9\.]{5}/;
            if(pattern.test(e.target.value)){
                passwordError.textContent = '';
                e.target.style.border = '';
                passwordValue = e.target.value;
            }else{
                passwordError.textContent = `password must be at least 6 digits`;
                e.target.style.border = "1px solid red";
                passwordValue = '';
            }
        });
    
    
        firstnameInput.addEventListener('blur',(e)=>{
            const pattern = /\w{6,}/;
            if(pattern.test(e.target.value)){
                firstnameError.textContent = '';
                e.target.style.border = '';
                firstnameValue = e.target.value;
            }else{
                firstnameError.textContent = `password must be at least 6 digits`;
                e.target.style.border = "1px solid red";
                firstnameValue = '';
            }
        });
    
        lastnameInput.addEventListener('blur',(e)=>{
            const pattern = /[aA-zZ]{3,}/;
            if(pattern.test(e.target.value)){
                lastnameError.textContent = '';
                e.target.style.border = '';
                lastnameValue = e.target.value;
            }else{
                lastnameError.textContent = `lastname must be alphabets only`;
                e.target.style.border = "1px solid red";
                lastnameValue = '';
            }
        });
    
        phoneNoInput.addEventListener('blur',(e)=>{
            const pattern = /\d{11,14}/;
            if(pattern.test(e.target.value)){
                phonenoError.textContent = '';
                e.target.style.border = '';
                phonenoValue = e.target.value;
            }else{
                phonenoError.textContent = `Number must be 11 to 14 characters`;
                e.target.style.border = "1px solid red";
                phonenoValue = '';
            }
        });

        signUpBtn.addEventListener('click',()=>{
            if(emailValue && phonenoValue && firstnameValue && lastnameValue && passwordValue){
                formError.textContent = '';
                console.log({emailValue,phonenoValue,firstnameValue,lastnameValue,passwordValue});
                location.href = '/redflag.html';
            }else{
                formError.textContent = `Please fill the form properly`;
            }
        });
       
})()