export const realTime = (time) => {
    if (time) {
        let newTime = time.split(':')
        let end;
        let hour = Number(newTime[0])
        if (hour > 12) {
            hour -= 12
            end = 'PM'
        }
        else {
            end = 'AM'
        }
        return `${hour}:${newTime[1]} ${end}`
    }
}
export const realDate = (date) => {
    console.log(date, '....from utisl....')
    if(date){
        let newDate = date.split('-')
        const months = ['JAN', 'FEB', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC']
        newDate[1] = months[Number(newDate[1]) - 1]
        return `${newDate[1]} ${newDate[2]}, ${newDate[0]}`
    }
}