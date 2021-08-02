
const baseUrl = 'http://localhost'
const port = "8001"

const container = document.getElementById('container')
const form = document.getElementById('form')
const inputDate = document.getElementById('date')
const head = document.getElementById('head')
const allLogsFrame = document.getElementById('allLogs')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const date = new Date(inputDate.value)
    let day = date.getDate()
    if (day < 10) {
        day = "0" + day
    }
    let month = date.getMonth() + 1
    if (month < 10) {
        month = "0" + month
    }
    const year = date.getFullYear()
    try {
        const response = await fetch(`${baseUrl}:${port}/logs/${day}_${month}_${year}`)
        const data = await response.json()

        if (data.length) {
            head.innerText = `${day}-${month}-${year}`
            for (let i = 0; i < data.length; i++) {
                buildLogItem(JSON.parse(data[i]), data.length - (i + 1))
            }
        } else {
            head.innerText = "NOTHING FOUND"
        }
    } catch (e) {
        console.log("NOTHING FOUND ", e)
    }

})

const buildLogItem = (data, idx) => {
    const el = document.createElement('div')
    const bgColor = data.logLevel === "fatal" ? "red" : data.logLevel === "info" ? "lightblue" : data.logLevel === "silly" ? "lightgreen" : "yellow"
    el.classList.add('logItem')
    el.style.background = bgColor
    el.style.maxWidth = "500px"
    el.style.margin = "15px auto"
    el.style.padding = "10px"
    el.style.borderRadius = "10px"
    el.style.overflowWrap ="break-word";
    el.style.boxShadow =`1px 1px 4px 3px ${bgColor}`;
    el.innerHTML = `
<p class="logText logText__index">${idx}</p>
<p class="logText logText__date">${data.date}</p>
<p class="logText logText__level">${data.logLevel}</p>
<p class="logText logText__content">${data.argumentsArray[0]}</p>
`
    allLogsFrame.prepend(el)
}

