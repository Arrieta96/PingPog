var game = function(){
    let time = 50;
    let movement = 20;
    let movementBar = 60;
    let width = document.documentElement.clientWidth - movement;
    let height = document.documentElement.clientHeight - movement;
    let controlGame;
    let player1;
    let player2;

    function start(){
        init();
        controlGame = setInterval(play, time);
    }

    function init(){
        ball.style.left = 0;
        ball.state = 1;
        ball.direction = 1; // right 1, left 2
        player1 = new Object();
        player2 = new Object();
        player1.keyPress = false;
        player1.keyCode = null;
        player2.keyPress = false;
        player2.keyCode = null;
    }

    function stop(){
        clearInterval(controlGame);
    }

    function play(){
        moveBall();
        moveBar();
        checkIfLost();        
    }

    function checkIfLost(){
        if(ball.offsetLeft >= width){
            stop();
            alert("Jugador 1 Gana.");
            var resultado  = window.confirm('Iniciar');
            if (resultado === true) {
                window.location.reload(9000);
            }
        }
        if(ball.offsetLeft <= 0){
            stop();
            alert("Jugador 2 Gana.");
            var resultado  = window.confirm('Iniciar');
            if (resultado === true) {
                window.location.reload(9000);
            }
        }
    }

    


    function moveBall(){
        checkStateBall();
        switch(ball.state){
            case 1: // Derecha, Abajo
                ball.style.left = (ball.offsetLeft + movement) + "px";
                ball.style.top = (ball.offsetTop + movement) + "px";
                break;
            case 2: // Derecha, Arriba
                ball.style.left = (ball.offsetLeft + movement) + "px";
                ball.style.top = (ball.offsetTop - movement) + "px";
                break;
            case 3: // Izquierda, Abajo
                ball.style.left = (ball.offsetLeft - movement) + "px";
                ball.style.top = (ball.offsetTop + movement) + "px";
                break;
            case 4: // Izquierda, Arriba
                ball.style.left = (ball.offsetLeft - movement) + "px";
                ball.style.top = (ball.offsetTop - movement) + "px";
                break;
        }
    }

    function checkStateBall(){

        if(collidePlayer2()){
            ball.direction = 2;
            if(ball.state == 1) ball.state = 3;
            if(ball.state == 2) ball.state = 4;
        }else if(collidePlayer1()){
            ball.direction = 1;
            if(ball.state == 3) ball.state = 1;
            if(ball.state == 4) ball.state = 2;
        }

        if(ball.direction ===1){
            if(ball.offsetTop >= height) ball.state=2;
            else if(ball.offsetTop <=0 ) ball.state=1;
        }else{
            if(ball.offsetTop >= height) ball.state=4;
            else if(ball.offsetTop <=0 ) ball.state=3;
        }
    }

    function collidePlayer1(){
        if(ball.offsetLeft <= (pallette_1.clientWidth) &&
           ball.offsetTop >= pallette_1.offsetTop &&
           ball.offsetTop <= (pallette_1.offsetTop + pallette_1.clientHeight)){
            return true;
        }

        return false;
    }
    function collidePlayer2(){
        if(ball.offsetLeft >= (width-pallette_2.clientWidth) &&
           ball.offsetTop >= pallette_2.offsetTop &&
           ball.offsetTop <= (pallette_2.offsetTop + pallette_2.clientHeight)){
            return true;
        }
        return false;

    }

    function moveBar(){
        if(player1.keyPress){
            if(player1.keyCode == 81 && pallette_1.offsetTop >=0)
                pallette_1.style.top = (pallette_1.offsetTop - movementBar) + "px";
            if(player1.keyCode == 65 && (pallette_1.offsetTop + pallette_1.clientHeight)<=height)
                pallette_1.style.top = (pallette_1.offsetTop + movementBar) + "px";
            
        }
        if(player2.keyPress){
            if(player2.keyCode == 79 && pallette_2.offsetTop>=0)
                pallette_2.style.top = (pallette_2.offsetTop - movementBar) +"px";
            if(player2.keyCode == 76 && (pallette_2.offsetTop + pallette_2.clientHeight)<=height)
                pallette_2.style.top = (pallette_2.offsetTop + movementBar) +"px";
        }
    }

    document.onkeydown = function(e){
        e = e || window.event;
        switch(e.keyCode){
            case 81: // Q
            case 65: // A
                player1.keyCode = e.keyCode;
                player1.keyPress = true;
            break;
            case 79: // O
            case 76: // L
                player2.keyCode = e.keyCode;
                player2.keyPress = true;
            break;
        }
    }

    document.onkeyup = function(e){
        if(e.keyCode == 81 || e.keyCode == 65)
            player1.keyPress = false;
        if(e.keyCode == 79 || e.keyCode == 76)
            player2.keyPress = false;
    }

    start();
}();