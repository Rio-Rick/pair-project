function postTime(date) {
    let nowDate = new Date()
    // console.log(date.getHours());
    // console.log(date.getMinutes());
    let hour = nowDate.getHours() - date.getHours() 
    let minute = nowDate.getMinutes() - date.getMinutes()  
    if(hour <= 0) {
        return `${minute} minutes ago`
    } else {
        return `${hour} hours ago`
    }
}


// postTime(date)
module.exports = postTime