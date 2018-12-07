(function(){
    'use strict';
    const redIntPostHeading = document.querySelector('.redIntPost');
    const addRedFlagBtn = document.querySelector('.addRedFlag');
    const addIntervention = document.querySelector('#addIntervention');
    // const addInterventionBtn = document.querySelector('[class*="exclamation-triangle"]');
    const closeRFBtn = document.querySelector('#closeRFBtn');
    const closeIVBtn = document.querySelector('#closeIVBtn');
    const addRedFlag = document.querySelector('#addRedFlag');
    const iDetails = document.querySelector('#iDetails');


    // 
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

    iDetails.addEventListener('click',(e)=>{
        if(e.target.className.endsWith('fa-pencil-square-o')){
            console.log('You can edit here Really');
        }
    });

    addRedFlagBtn.addEventListener('click',(e)=>{
        console.log('ADD RED FLAG');
        e.preventDefault();
        addRedFlag.style.display = 'block';
    });
    closeRFBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        addRedFlag.style.display = 'none';
    });
    closeIVBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        addIntervention.style.display = 'none';
    });
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