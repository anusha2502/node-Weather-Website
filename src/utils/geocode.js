const request=require('request')



const geocode = (address,callback)=>{
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYW51c2hhLTk0IiwiYSI6ImNqdWloemFobzE5YTQ0ZHBkYW43MnkzdXgifQ.6r5M0hdpR9LWTUbkO086dA'
     
  
    
    request({url , json:true},(error,{body})=> {
            if(error)
            {
                callback("cannot connect to the Weather API",undefined)
        
            
            }else if(body.features.length === 0)
            {
                callback('Search query doesnt match',undefined)
                
            }
            else{
                callback(undefined,{
                     latitude: body.features[0].center[1],
                     longitude:body.features[0].center[0],
                     location:body.features[0].place_name
               

                })
            
            }
             

        })

    }
    

module.exports = geocode