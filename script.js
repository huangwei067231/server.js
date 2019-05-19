
// button.addEventListener('click',(e)=>{
//     let image=document.createElement('img')
//     image.src='/pay'
//     image.onload=function(){
//         alert('成功')
//        amount.innerText=amount.innerText-1
//     }
//     image.onerror=function(){
//         alert('失败')
//     }
// })
  



// window.xxx=function(result){
//    if(result==success){
//     amount.innerText=amount.innerText-1
//    }else{{
//        alert('失败')
//    }}
//  }




     button.addEventListener('click',(e)=>{
        let script=document.createElement('script')

        let functionName='frank'+parseInt(Math.random()*100000,10)
        window[functionName]=function(result){
                if(result=='success'){
        amount.innerText=amount.innerText-1
              }else{{
            alert('失败')
        }}
    }

    script.src='http://jack.com:8002/pay?callbackName'+functionName
    document.body.appendChild(script)

    // script.onload=function(){
    //      alert('成功')
    // }
    debugger
    script.onload=function(e){
     e.currentTarget.remove()
     delete window[functionName]//清除之前的数
    }
    script.onerror=function(){
         alert('失败')
     delete window[functionName]
    }
})







button.addEventListener('click',(e)=>{ //需引入jQuery
$.ajax({
   url:"http://jack.com:8002/pay",
   dataType:"jsonp",
   success:function(response){
       Console.log(response)
    }
  })
})