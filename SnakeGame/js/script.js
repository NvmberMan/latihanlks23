var sizeX = 30;
var sizeY = 48;
var moveDirection = 'east';
var playing = false;
var head, body, foot;
var xHead, yHead;
var childCount = 15;
var childs = [];


generateMap();
clickEvent();

function generateMap()
{
    var gameBoard = document.querySelector('.game');
    for (let x = 0; x < sizeX; x++) {
        for (let y = 0; y < sizeY; y++) {
            let grid = document.createElement('div');
            grid.id = 'grid(' + x + ',' + y + ')';
            grid.classList.add('grid');
            gameBoard.appendChild(grid);
        }

    }
    generateFood(4);


}

function generateFood(c)
{
    for (let i = 0; i < c; i++) {
        let xRandom = getRandomInt(0, sizeX);
        let yRandom = getRandomInt(0, sizeY);
        randomParentPosition = document.getElementById('grid(' + xRandom + ',' + yRandom + ')');
    
        if(!randomParentPosition.hasChildNodes())
        {
            let food = document.createElement('div');
            food.classList.add('food');
            randomParentPosition.appendChild(food);
        }

    }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function playGame()
{
    playing = true;

    randomParentPosition = document.getElementById('grid(' + sizeX / 2 + ',' + sizeY / 2  + ')');

    let snake = document.createElement('div');
    snake.classList.add('snake');
    randomParentPosition.appendChild(snake);
    xHead = sizeX / 2;
    yHead = sizeY / 2;

    head = randomParentPosition;
    foot = randomParentPosition;


    setInterval(move, 100);


}

function clickEvent()
{
    document.addEventListener('keydown', function(event) {
        if(event.key == 'w' && moveDirection != 'south')
        {
            moveDirection = 'north';
        }
        if(event.key == 'a' && moveDirection != 'east')
        {
            moveDirection = "west";
        }
        if(event.key == 's' && moveDirection != 'north')
        {
            moveDirection = 'south';
        }
        if(event.key == 'd' && moveDirection != 'west')
        {
            moveDirection = 'east'; 
        }

        // alert(event.key);
    })
}

const move = () => {
    if(moveDirection == 'east')
    {
        if(yHead == sizeY - 1)
        yHead = -1;

        yHead += 1;

        var nextGrid =  document.getElementById('grid(' + xHead+ ',' + yHead  + ')');
        let snake = document.createElement('div');
        snake.classList.add('snake');
        nextGrid.appendChild(snake);


        childs.push(head);

        if(childs.length > childCount)
        {
            childs[0].removeChild(childs[0].firstChild);
            childs.shift();
        }

        
        head = nextGrid;
    }else if(moveDirection == "west")
    {
        if(yHead == 0)
        yHead = sizeY;

        yHead -= 1;

        var nextGrid =  document.getElementById('grid(' + xHead+ ',' + yHead  + ')');
        let snake = document.createElement('div');
        snake.classList.add('snake');
        nextGrid.appendChild(snake);

        childs.push(head);
        if(childs.length > childCount)
        {
            childs[0].removeChild(childs[0].firstChild);
            childs.shift();
        }

        head = nextGrid;
    }else if(moveDirection == "south")
    {
        if(xHead == sizeX - 1)
        xHead = -1;

        xHead += 1;

        var nextGrid =  document.getElementById('grid(' + xHead+ ',' + yHead  + ')');
        let snake = document.createElement('div');
        snake.classList.add('snake');
        nextGrid.appendChild(snake);

        childs.push(head);

        if(childs.length > childCount)
        {
            childs[0].removeChild(childs[0].firstChild);
            childs.shift();
        }

        head = nextGrid;
    }
    else if(moveDirection == "north")
    {
        if(xHead == 0)
        xHead = sizeX;

        xHead -= 1;

        var nextGrid =  document.getElementById('grid(' + xHead+ ',' + yHead  + ')');
        let snake = document.createElement('div');
        snake.classList.add('snake');
        nextGrid.appendChild(snake);

        childs.push(head);

        if(childs.length > childCount)
        {
            childs[0].removeChild(childs[0].firstChild);
            childs.shift();
        }

        head = nextGrid;
    }
    checkPath();

};

function checkPath()
{
    let currentGrid = document.getElementById('grid(' + xHead+ ',' + yHead  + ')');

    if(currentGrid.childElementCount > 1)
    {
        if(currentGrid.firstChild.classList.contains('snake'))
        {
            alert('gameover');
        }
        currentGrid.removeChild(currentGrid.firstChild);
        childCount++;
        generateFood(1);
    }
}

function removeFoot()
{
    let snake = document.createElement('div');
    snake.classList.add('snake');
    foot.appendChild(snake);
}


