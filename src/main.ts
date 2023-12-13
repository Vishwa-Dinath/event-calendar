type CalEvent = {
    starttime:number
    endtime:number
    text:string
}
type CalendarDate = {
    date:string
    events:CalEvent[]
}
const data = [
    {
        date: "8/9/2023",
        events:[
            {starttime: 900, endtime: 1230, text: "9:00am to 12:30pm"},
            {starttime: 900, endtime: 1230, text: "9:00am to 12:30pm"},
        ]
    },
    {
        date:"12/11/2023",
        events:[
            {starttime: 900, endtime: 1230, text: "9:00am to 12:30pm"},
            {starttime: 900, endtime: 1230, text: "9:00am to 12:30pm"},
        ]
    },
    {
        date:"12/10/2023",
        events:[
            {starttime: 900, endtime: 1230, text: "9:00am to 12:30pm"},
            {starttime: 900, endtime: 1230, text: "9:00am to 12:30pm"},
        ]
    },
    {
        date:"12/05/2024",
        events:[
            {starttime: 900, endtime: 1230, text: "9:00am to 12:30pm"},
            {starttime: 900, endtime: 1230, text: "9:00am to 12:30pm"},
        ]
    }
]

class Day{
    constructor(public fullDate:Date, public year:number, public month:number, public date:number,
                public events:CalendarEvent[]) {
    }
}

class CalendarEvent{
    constructor(public startTime:number, public endTime:number, public text:string) {
    }
}

function getEventSet(data:CalendarDate[]){
    const dateSet : Day[] = []
    data.forEach(date=>{
        const dateDetails = date.date.split("/");
        const year = +dateDetails[2]
        const month = +dateDetails[1]-1
        const day = +dateDetails[0]
        const fullDate = new Date(year,month,day)
        const eventsSet : CalendarEvent[] = []
        date.events.forEach(event=>{
            eventsSet.push(new CalendarEvent(event.starttime,event.endtime,event.text))
        })
        dateSet.push(new Day(fullDate,fullDate.getFullYear(),fullDate.getMonth()+1,fullDate.getDate(),eventsSet))
    })
    return dateSet
}

function sortDateSet(dateSet : Day[]) {
    return dateSet.sort((d1,d2)=> d1.fullDate.getTime() - d2.fullDate.getTime())
}

const sortedDateSet = sortDateSet(getEventSet(data))

function getRelevantDate(month,year) {
    return sortedDateSet.filter((eachDay)=> eachDay.month==month && eachDay.year==year)
}

console.log(getRelevantDate(11,2023))

let date = new Date()
let year = date.getFullYear() // 2023
let month = date.getMonth() // 11

const currentDate = document.querySelector(".calendar-current-date")
const calendarDates = document.querySelector("#calendar-dates")
const navigationIcons = document.querySelectorAll(".calendar-navigation span")

const months = ["January","February","March","April","May","June","July","August","September",
                "October","November","December"]

const renderCalendar = ()=>{
    let dayOne = new Date(year, month, 1).getDay(); // 5
    let lastDate = new Date(year, month + 1, 0).getDate(); // 31
    let dayEnd = new Date(year, month, lastDate).getDay(); // 0
    let previousMonthLastDate = new Date(year,month,0).getDate() // 30

    let lit = ""

    for (let i = dayOne; i > 0 ; i--) {
        let dateNo = previousMonthLastDate - i + 1
        lit+=`<div id="${month-1}-${dateNo}" class="day">${dateNo}</div>`
    }

    for (let i = 1; i <= lastDate; i++) {
        lit+=`<div id="${month}-${i}" class="day">${i}</div>`
    }

    for (let i = dayEnd; i < 6; i++) {
        lit+=`<div id="" class="day">${i - dayEnd + 1}</div>`
    }

    currentDate.innerHTML = `${months[month]} ${year}`
    calendarDates.innerHTML = lit
}

function generateId(month){

}

renderCalendar()

navigationIcons.forEach(icon=>{
    icon.addEventListener("click",()=>{
        month = (icon.id === "calendar-prev")? month-1 : month+1
        if (month < 0 || month > 11){
            date = new Date(year,month,new Date().getDate())
            year = date.getFullYear()
            month = date.getMonth()
        }else {
            date = new Date()
        }
        renderCalendar()
    })
})

const dayElements = document.querySelectorAll(".day")
dayElements.forEach(elm=>{

})

