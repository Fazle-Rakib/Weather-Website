console.log('Here we are running a js file!')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })
// fetch('http://localhost:3000/weather?address=boston').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error)
//         {
//             console.log(Error,data.error)
//         }
//         else
//         {
//             console.log(data)
//         }
        
//     })
// })

 const weatherForm  = document.querySelector('form')
 const searchLocation = document.querySelector('input')
 const messageOne = document.querySelector('#message-1')
 const messageTwo = document.querySelector('#message-2')
 //messageOne.textContent = 'Inside from JavaScript File'

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location = searchLocation.value
    console.log(location)
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((Data)=>{
            if(Data.Error)
            {
                // console.log(data.Error)
                messageOne.textContent = Data.Error
            }
            else
            {
                //console.log(Data)
                messageOne.textContent = Data.dataLocation
                messageTwo.textContent = Data.Total.body.daily.data[0].summary +' Temperature of (' +Data.dataLocation+') is ' + Data.Total.body.currently.temperature+ ' degrees. The probability of rain is ' + Data.Total.body.currently.precipProbability*100 +'%.'+ ' Wind Speed : ' + Data.Total.body.currently.windSpeed+
                ' The Highest temperature : '+Data.Total.body.daily.data[0].temperatureMax + ' & the lowest temperature : '+Data.Total.body.daily.data[0].temperatureLow
                //messageTwo.textContent = data.forecast.summary +' Temperature of (' +data.dataLocation+') is ' + data.forecast.temp+ ' degrees. The probability of rain is ' + data.forecast.precipProbability*100 +'%'
            }
            
        })
    })
    
})