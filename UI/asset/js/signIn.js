(function(){
    'use strict';

    const emailInput = document.querySelector('#email');
    const emailError = document.querySelector('.emailError');
    const passwordInput = document.querySelector('#password');
    const passwordError = document.querySelector('.passwordError');
    const signInBtn = document.querySelector('#signIn');
    let passwordValue;
    let emailValue;

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

    signInBtn.addEventListener('click',()=>{
        console.log({emailValue,passwordValue});    
        if(emailValue && passwordValue){
            console.log({emailValue,passwordValue});
            location.href = '/redflag.html';
        }else{
            
        }
    });
})();