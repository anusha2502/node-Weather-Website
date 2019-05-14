const request=require('request')
const l = console.log



const forecast = (lat,long,callback)=>{

    const url='https://api.darksky.net/forecast/ee27d89256b607e6c9b90380df9a4596/'+lat+','+long


    request({ url  , json : true},(error,{body})=>{
        if(error)
        {
            callback("cannot connect to the Weather API",undefined)
        }
        else if(body.error) {
            callback('Error in the co-ordinates',undefined)
        }
        else{
            callback(undefined, {
                summary:body.daily.summary,
                temp:body.currently.temperature,
                humid:body.currently.humidity
                
                })
            
        }
    }

    )
        
   
    }



module.exports=forecast