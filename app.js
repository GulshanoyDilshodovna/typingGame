//consts
const word = document.getElementById('word')
const wordInput = document.getElementById('word-input')
const timeEL = document.getElementById('time')
const scoreEl = document.getElementById('score')
const overflow = document.querySelector('.overflow')
const modal = document.querySelector('.modal')
const lastScore =document.getElementById('lastScore')
const select = document.getElementById('select')


wordInput.focus()

function get(){
    fetch('https://random-words-api.vercel.app/word').then(function(data){
        return data.json()
    }).then(showRandomWord)
}

get()
//lets
let randomWord
let score = 0
let time = 30
let difficulty

select.value = localStorage.getItem('difficulty') == null ? 'medium' : localStorage.getItem('difficulty')


//show random word
 function showRandomWord(e){
     randomWord = e[0].word
     word.textContent = randomWord
 }

// showRandomWord()


//input event
wordInput.addEventListener('input', (e)=>{
    const inputValue = e.target.value
    if(inputValue==randomWord){
            score++
        scoreEl.textContent = score
       get()
        e.target.value =''
            if(select.value == 'easy'){
                time+=8
            }else if(select.value == 'medium'){
                    time+=5
            }else{
                time+=3
            }
    }
})


//time function
const setTimeGame = setInterval(changeTime, 1000)
function changeTime(){
        time--
    timeEL.textContent = time
    if(time<=0){
        clearInterval(setTimeGame)
        modal.classList.remove('hidden')
        overflow.classList.remove('hidden')
        lastScore.textContent = score
    }
}


select.addEventListener('change', () => {
    difficulty = select.value
    localStorage.setItem('difficulty', difficulty)
})