const dateConverter = date => {
    const splittedDate = String(date).split(':');
    const newDate = `${splittedDate[0].slice(0,splittedDate.length-11)},${splittedDate[0].slice(splittedDate.length-11,splittedDate.length-6)}`
    return newDate
};

const videoConverter = link => {
    if(link !== null || undefined){
        if(link.includes('v=')){
            return link.split('v=')[1]
        }
    } else {
        return link
    }
}

module.exports = {
    dateConverter,
    videoConverter
}