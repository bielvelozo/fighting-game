function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
        rectangle2.position.x && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}


let timer = 60

function determineWinner({player , enemy , timerID}) {

    showDisplayFinish('')

    clearTimeout(timerID)
    if(enemy.health === player.health) 
      showDisplayFinish('Tie')


    else if(enemy.health > player.health) {
        showDisplayFinish('Player 2 Wins!')
        timer = 0
       
    }

    else if(enemy.health < player.health) {
        showDisplayFinish('Player 1 Wins!')
        timer = 0
       
    }
    
}

function showDisplayFinish(result) {
    const displayResult = document.querySelector('#displayFinish')
    const displayAgain = document.querySelector('#again')
    const display = document.querySelector('.finish')

    display.style.visibility = 'visible'
    displayResult.innerHTML = result
    displayAgain.onclick = () => location.reload()
}


let timerID
function decreaseTimer() {

    if(timer > 0 ){
        timerID = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }

    if(timer === 0) {
       
        determineWinner({player , enemy , timerID})
    }
    
    }
