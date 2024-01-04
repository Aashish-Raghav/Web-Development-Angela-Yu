
module.exports.getDay = () => {
    const today = new Date();
    const options = {weekday : "long"};
    
    return today.toLocaleString("us-en",options);
}
module.exports.getDate = () =>{
    const today = new Date();
    const options = {weekday : "long", month : "long", day : "numeric"};

    return today.toLocaleString("us-en",options);
}