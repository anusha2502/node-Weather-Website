console.log("Client side JavaScript!")



const f1=document.querySelector('form')
const inp=document.querySelector('input')
const para1 = document.querySelector('#msg1')
const para2 = document.querySelector('#msg2')


para1.textContent='from JavaScript'


f1.addEventListener('submit',(e)=>{
e.preventDefault()
const loc=inp.value
para1.textContent='Loading Message'
para2.textContent=''

fetch('http://localhost:3000/weather?address='+loc).then((response)=> {
    response.json().then((data)=>
    {
        if(data.error){
            para1.textContent=data.error
            para2.textContent=''
        }else{
        para1.textContent=data.location
        para2.textContent=data.fdata.summary
       // para2.textContent=data.latitude
        //para2.textContent=data.longitude
        }
      
    })
})

})
