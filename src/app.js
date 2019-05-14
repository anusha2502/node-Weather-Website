const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const express=require('express')
const path=require('path')
const hbs=require('hbs')
const app=express()

// console.log(__dirname)
// //console.log(__filename)
// console.log(path.join(__dirname,'../public'))

//defining Path for express config
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//set up handlebars and engine location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicPath))

//suppose we have app.com
//within that we have app.com/help or app.com/about
//the first arg in get take the route for the navigation through servers

app.get('',(req,res)=>{
    res.render('index',{
        title:'A Weather App',
        name:'Anusha A Naik'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'A Weather App About Page',
        name:'Anusha A Naik',
        Text:'About Page for the App'
     
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'A Weather App - Help Section',
        name:'Anusha A Naik',
        helpText:'This is a page for Help Page'
    })
})





app.get('/weather',(req,res)=>{

    const address=req.query.address
   if(!req.query.address){
       return res.send({
           error:'You must enter an address'
       })
   }
   geocode (address,(error,{latitude,longitude,location}={}) => {
    if(error)
    {
        return res.send({
            error: error
    })
   }
         
  
    forecast(latitude, longitude, (error, fdata) => {
        if(error){

            return res.send({
                error:error
            }) 
        }
        res.send({
                latitude,
                longitude,
                location,
                fdata:fdata
        })
   //   console.log(location)
   //   console.log(fdata)
      })
   
 } )
  
  
        // {
        //     place:'Bangalore',
        //     temperature:45.09,
        //     humidity:7+'%'
        // },
        // {
        //     place:'Mumbai',
        //     temperature:78.09,
        //     humidity:54+'%'
        // }
    
})

app.get('/products',(req,res) => {

    if(!req.query.search){
        return res.send({
            error:'You must enter a search term'
        })
          
        
    }

    console.log(req.query.search)
    res.send({
    product : []
   })
})




app.get('/help/*',(req,res)=>{
    res.render('error',{
        Text:'404 Error Page!! This Help Page doesnt exist! '
})
})



app.get('*',(req,res)=>{
    res.render('error',{
        Text:'404 Error Page!! This Page doesnt exist'
})
}) 
app.listen(3000,()=>{
    console.log("server up and running in port 3000")
})