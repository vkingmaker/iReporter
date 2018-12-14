(function(){
    'use strict';
    const redIntPostHeading = document.querySelector('.redIntPost');
    const addRedFlagBtn = document.querySelector('.addRedFlag');
    const addIntervention = document.querySelector('#addIntervention');
    // const addInterventionBtn = document.querySelector('[class*="exclamation-triangle"]');
    const closeRFBtn = document.querySelector('#closeRFBtn');
    const editBtn = document.querySelector('.fa-pencil-square-o');
    const closeIVBtn = document.querySelector('#closeIVBtn');
    const addRedFlag = document.querySelector('#addRedFlag');
    const closeERFBtn = document.querySelector('#closeERFBtn');
    const closeDRFBtn = document.querySelector('#closeDRFBtn');
    const closeDInvBtn = document.querySelector('#closeDInvBtn');
    const editIntn = document.querySelector('#editIntn');
    const delIntn = document.querySelector('#delIntn');
    const closeEINVBtn = document.querySelector('#closeEINVBtn');
    const iDetails = document.querySelector('#iDetails');

   if(editIntn) {
    editIntn.addEventListener('click',()=>{
        document.querySelector('#editInv').style.display = 'block';
   });
   closeEINVBtn.addEventListener('click',(e)=>{
       e.preventDefault();
       document.querySelector('#editInv').style.display = 'none';
   });
   }
   if(delIntn){
    delIntn.addEventListener('click',()=>{
        document.querySelector('#deleteInv').style.display = 'block';
   });
  
   }
if(closeDInvBtn) {
   closeDInvBtn.addEventListener('click',() => {
    document.querySelector('#deleteInv').style.display = 'none';
   });
}
  
  

    redIntPostHeading.addEventListener('click',(e)=>{
        if(e.target.parentElement.parentElement.className === 'redIntPost'){
            document.querySelector('.heading').style.display = 'none';
            e.target.parentElement.parentElement.style.display = 'none';
            document.querySelector('#fullStory').textContent = `Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Aperiam iure illo neque quaerat voluptatibus mollitia autem repudiandae eius
            facere vitae nobis unde, fuga dolores quibusdam distinctio ratione aut tempore
            deserunt.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam iure illo
            neque quaerat voluptatibus mollitia autem repudiandae eius facere vitae nobis unde,
            fuga dolores quibusdam distinctio ratione aut tempore deserunt. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Similique ad itaque sequi veniam modi aspernatur!
            Vero neque architecto quisquam sit dolorem consectetur? Ipsa tempore aliquam eligendi
            eius labore exercitationem sed. Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Veniam quo nisi vitae a beatae doloribus recusandae repellendus dolores
            perspiciatis voluptates esse nemo, minima animi iure qui. Maiores labore earum nobis!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus voluptas minima at
            voluptates ipsam aspernatur deleniti excepturi incidunt voluptatem, magnam fugiat nam
            itaque sint, minus soluta ratione veritatis placeat adipisci? Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Delectus, animi vero. Rem totam rerum repellat
            itaque ab, aspernatur sed, quasi minima unde necessitatibus ex ea provident nam illum
            praesentium vel.`;
            document.querySelector('#blogImage').setAttribute('src','asset/img/criminal.jpg'); 
            document.querySelector('#storyStatus').textContent = 'Under Investigation'; 
            document.querySelector('#storyTitle').textContent = 'Car Theft'; 
            iDetails.style.display = 'block';
        }
    });

    if(document.querySelector('#editRedFlag')){
    iDetails.addEventListener('click',(e)=>{
        if(e.target.className.endsWith('fa-pencil-square-o')){
            // console.log(document.querySelector('#editRedFlag'))
            document.querySelector('#editRedFlag').style.display = 'block';
            // document.querySelector('#editInv').style.display = 'block';
        }
    });
}
if(document.querySelector('#deleteRedFlag')){
    iDetails.addEventListener('click',(e)=>{
        if(e.target.className.endsWith('fa-trash-o')){
            // console.log(document.querySelector('#deleteRedFlag'))
            document.querySelector('#deleteRedFlag').style.display = 'block';
            // document.querySelector('#editInv').style.display = 'block';
        }
    });
}

    addRedFlagBtn.addEventListener('click',(e)=>{
        console.log('ADD RED FLAG');
        e.preventDefault();
        addRedFlag.style.display = 'block';
    });
    if(closeRFBtn) {
    closeRFBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        addRedFlag.style.display = 'none';
    });
    }
    closeIVBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        addIntervention.style.display = 'none';
    });
    if(closeERFBtn){
    closeERFBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        document.querySelector('#editRedFlag').style.display = 'none';
    });
}
if(closeDRFBtn) {
    closeDRFBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        document.querySelector('#deleteRedFlag').style.display = 'none';
    });
}
    
    // addInterventionBtn.addEventListener('click',(e)=>{
    //     e.preventDefault();
    //     addIntervention.style.display = 'block';
    // });

    document.querySelector('#inputFileToLoad').addEventListener('change',()=>{
        var filesSelected = document.getElementById("inputFileToLoad").files;
        let imgArr = [];
        for(let i=0,img; img = filesSelected[i];i++){
        console.log(filesSelected.length);
       
          var fileReader = new FileReader();
            fileReader.onload = (function(theFile){
                return function(e){
                    imgArr.push(e.target.result);
                    console.log(imgArr);
                }
            })(img)
            fileReader.readAsDataURL(img);
          }
        });
})();