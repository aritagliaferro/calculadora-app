const body = document.getElementById('body')

const telaCalculadora = document.querySelector('.calculator__screen')
const botoesNumeros = document.querySelectorAll('.button__number')
const botoesOperacoes = document.querySelectorAll('.button__operator')

const botaoIgual = document.querySelector('.button__equal')
const botaoReset = document.getElementById('reset')
const botaoDelete = document.getElementById('delete')

let opAtual = ""
let opAnterior = ""
let operacao = undefined

botoesNumeros.forEach((botaoNumero)=>{
    botaoNumero.addEventListener('click', ()=> addNumber(botaoNumero.innerHTML))
})

botoesOperacoes.forEach((botaoOperador)=>{
    botaoOperador.addEventListener('click', ()=> selectOperator(botaoOperador.innerHTML))
})

botaoIgual.addEventListener('click', ()=> {
    calculate()
    updateDisplay()
})

botaoReset.addEventListener('click', ()=> {
    reset()
    updateDisplay()
})

botaoDelete.addEventListener('click', ()=> {
    deleteNum()
    updateDisplay()
})
    
function updateDisplay(){ telaCalculadora.innerHTML = opAtual.toString().slice(0, 10) }

function addNumber(number){
    if(number === "." && telaCalculadora.innerHTML.includes('.')) return
    opAtual === "0" ? opAtual = number : opAtual = opAtual.toString() + number.toString()
    updateDisplay()
}

function selectOperator(operator){
    if(opAtual === "") return
    if(opAnterior != ""){
        calculate()
    }
    operacao = operator.toString()
    opAnterior = opAtual
    opAtual = ""
}

function calculate(){
    let calculation
    const previous = parseFloat(opAnterior)
    const current = parseFloat(opAtual)
    if(isNaN(previous) || isNaN(current)) return
    switch(operacao){
        case "+":
            calculation = previous + current
        break
        case "-":
            calculation = previous - current
        break
        case "x":
            calculation = previous * current
        break
        case "/":
            calculation = previous / current
        break
        default:
            return
    }
    calculation === Infinity ? opAtual = 'Error' : opAtual = calculation
    operacao = undefined
    opAnterior = ""
}

function deleteNum(){
    opAtual === 'Error' ? opAtual = "" : opAtual = opAtual.toString().slice(0, -1) 
}

function reset(){
    opAtual = ""
    opAnterior = ""
    operacao = undefined
}



