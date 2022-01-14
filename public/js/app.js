const weatherForm = document.querySelector('form') 
const search = document.querySelector('input')
const messageZero = document.querySelector('#message-0')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    messageZero.textContent = "Loading..."
    messageOne.textContent = ""
    messageTwo.textContent = ""
    
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data)=>{
            if(data.error) {
                messageOne.textContent = data.error
            } else {
                messageZero.textContent = "Location: " + data.placename
                messageOne.textContent = "Temperature: " + data.Temperature
                messageTwo.textContent = "Precipitation: " + data.Precipitation
                
            }
        })
    })
    //console.log(location)
})