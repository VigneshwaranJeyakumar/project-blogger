 //This function for getting the value and storing in the local storage
 var t,d,file;
 function input() 
 {
     t = document.getElementById("title").value;
     d = document.getElementById("desc").value;
     file = document.querySelector('input[type=file]').files[0];
     // getting the element from the user and stored in the variables
     if (t&&d&&file !='')
     {
         // converting the image into base64 format and uploading the variable in LS
         var reader = new FileReader();
         if (file) {
             reader.readAsDataURL(file);
         }
         reader.addEventListener("load", function () 
         {
             localStorage.setItem("url", reader.result);               
         }, false); 
         
         localStorage.setItem("title", t); 
         localStorage.setItem("desc", d);                    
     }
     else
     {
         alert("Please enter the value");
     }                    
 }

 // This function is used for displaying the array values
 function display()
 {
     
     var x = localStorage.getItem("title");
     var y = localStorage.getItem("desc");
     var z = localStorage.getItem("url");
     if (x&&y&&z !='') 
     {
         var data ={'title':x,'desc':y,'image':z,'post':0};
         var blogArray = JSON.parse(localStorage.getItem("blog"));
         //console.log(blogArray);
         if(blogArray == null) 
         {
             var blogArray = [];
         }
         blogArray.push(data);
         localStorage.setItem("blog", JSON.stringify(blogArray)); 
         localStorage.removeItem("title");
         localStorage.removeItem("desc");
         localStorage.removeItem("url");
     }

     //displaying the  blog
     var jsonString = localStorage.getItem("blog");
     var displayData = JSON.parse(jsonString);
     for (let i = 0;i < displayData.length; i++) 
     {    
         
         var parent = document.createElement("div");
         parent.setAttribute('id', 'card');
         parent.innerHTML = "<div class='blogCard' ><div class='blogImage'><img class='image'src=" + displayData[i].image + " onClick="+'visit()'+"></div><div class ='blogContent'><h2>" + displayData[i].title +"</h2><p>" + displayData[i].desc + "</p></div><div class ='likeButton'><button id="+i+" class = 'blogButton' onClick="+'reply_click(this.id)'+">"+ displayData[i].post + ' ' + 'Like'+"</button><button id="+i+" class = 'blogButton' onClick="+'postDelete(this.id)'+">"+'Delete'+"</button></div></div>";
         document.getElementById("displayarea").appendChild(parent);
     }
     
 }

 //like button countdown
 function reply_click(clicked_id)
 {
     var jsonString = localStorage.getItem("blog");
     var likeCount = JSON.parse(jsonString);
     for (let j = 0;j < likeCount.length; j++) 
     {    
         if (likeCount[clicked_id].post ==likeCount[j].post) 
         {
             likeCount[clicked_id].post = likeCount[clicked_id].post + 1;
             localStorage.setItem("blog",JSON.stringify(likeCount));
             var textnode = document.createTextNode(likeCount[clicked_id].post+ ' ' + 'Like');
             var item = document.getElementById(clicked_id);
             item.replaceChild(textnode, item.childNodes[0]);
         }
     }
 }

 //delete the blog
 function postDelete(clicked_id) 
 {
     var jsonString = localStorage.getItem("blog");
     var deleteBlog = JSON.parse(jsonString);
     for (let k = 0;k < deleteBlog.length; k++) 
     {    
         if (deleteBlog[clicked_id].post ==deleteBlog[k].post) 
         {
            var retVal = confirm("Do you want to continue ?");
            if( retVal == true ) 
            {
                deleteBlog.splice(clicked_id,1);
                localStorage.setItem("blog",JSON.stringify(deleteBlog)); 
/*                 var list = document.getElementById("card"); 
                list.style.display='none'; */
                location.reload();
                return true;
            } 
         }
     }
 }

 //visting the blog
 function visit(clicked_id) 
 {
     location.assign("blog.html");
 }