// this calculates the times and adds the marks
class Times {
    constructor(h,m,s) {
        this.h = h,
        this.m = m,
        this.s = s
    }
}

let interval;
let timing = new Times(0,0,0);
let times = [];
let started = false;
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
seconds.innerHTML = timing.s
minutes.innerHTML = timing.m
hours.innerHTML = timing.h

const getLocalStorage = () => {
    var marks = localStorage.getItem("marks");
    if (marks && marks.length > 0){
        times = []
        times = [...JSON.parse(marks)];
        addMarkLoad()
    }
}

const startTimer = () => {
        if (started) {
            return
        } else {
            started = true;
            interval = setInterval(() => {
                addSeconds();
               },1000);
        }
}

const pauseTimer = () => {
    clearInterval(interval)
    started =false
}

const addSeconds = () => {
    if (timing.s === 59) {
        timing.s = 0;
        seconds.innerHTML = timing.s
        addMinutes();
    } else {
        timing.s += 1;
        seconds.innerHTML = timing.s
    }
}

let addMinutes = () => {
    if (timing.m === 59) {
        timing.m = 0;
        timing.h ++
        minutes.innerHTML = timing.m
        hours.innerHTML = timing.h
    } else {
        timing.m ++
        minutes.innerHTML = timing.m
    }
}

const addMarkLoad = () => {
    times.forEach((mark, i) => {
        let markHTML = `
        Mark added at:  ${mark.h}:${mark.m}:${mark.s}
        `;
        let tr = document.createElement('tr')
        let th = document.createElement('th')
        th.innerHTML = markHTML;
        tr.appendChild(th)
        let list = document.getElementById('markList')
        list.appendChild(tr)
    }) 
}
const addMark = () => {

    if (started) {
        const mark = new Times(timing.h, timing.m, timing.s);
        let markHTML = `
            Mark added at:  ${mark.h}:${mark.m}:${mark.s}
        `;
        let tr = document.createElement('tr')
        let th = document.createElement('th')
        times.push(mark)
        localStorage.clear()
        localStorage.setItem('marks', JSON.stringify(times))
        th.innerHTML = markHTML;
        tr.appendChild(th)
        let list = document.getElementById('markList')
        list.appendChild(tr)
    }
    

}
const removeAll = () => {
    times = [];
    localStorage.clear();
    document.getElementById('markList').innerHTML = ''
}
document.addEventListener('keyup', (e) => {
    if (e.code === "ArrowUp") {
        addMark()
    }
});
document.addEventListener('keyup', (e) => {
    if (e.code === "Enter") {
        startTimer()
    }
});
window.onload = getLocalStorage;