window.onload=function(){
    var oldColor= document.querySelector("div").style.backgroundColor;
    document.querySelector("button").onclick=function(){
        if(document.querySelector("div").style.backgroundColor==oldColor){
            document.querySelector("div").style.backgroundColor="transparent";
        }else{
            document.querySelector("div").style.backgroundColor=oldColor;
        }
        
    }
}