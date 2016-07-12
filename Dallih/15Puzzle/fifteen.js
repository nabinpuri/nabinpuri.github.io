/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
(function(){
    var isShuffled=false;
    $(document).ready(function(){
        //alert("welcome");
      init();
      $('.puzzlepiece').click(function(){
          
          if(checkIfMovable($(this))){
              swap($(this));
              if(CheckWon()){
                  isShuffled=false;
                  alert("Congrats! You won.......");
              }
          }
      });
      
      $('#shufflebutton').click(shuffle);
      
  });
  
    var emptySpace= (function(){
        var x;
        var y;
        var row;
        var column;
        var object= {
            set: function(xPos,yPos,rowNo,colNo){
                x=xPos;
                y=yPos;
                row=rowNo;
                column=colNo;
            },
            getX:function(){
                return x;
            },
            getY:function(){
                return y;
            },
            getRow:function(){
                return row;
            },
            getColumn:function(){
                return column;
            }
        };
        return object;
    })();
    
    var init = function() {
        var puzzleArea = $('#puzzlearea');
        var divs = puzzleArea.find("div");
        var i=0;
        // initialize each piece
        
        for (i=0; i< divs.length; i++) {
            var div = $(divs[i]);

            // calculate x and y for this piece
            var x = ((i % 4) * 100) ;
            var y = (Math.floor(i / 4) * 100) ;

            // set basic style and background
            div.addClass("puzzlepiece");
            div.css({left:x + 'px',top: y + 'px',
                backgroundImage:'url("img/puzzle.jpg")',
                backgroundPosition:-x + 'px ' + (-y) + 'px'});

            // store x and y for later
            div.data("x",x);
            div.data("y",y);
            
            var row=i % 4;
            var column=Math.floor(i / 4);
            
            div.data("row",row); 
            div.data("column",column); 
            
            div.data("actualRow",row);
            div.data("actulaCol",column);

       }
       //alert(div);
       row=i % 4;
       column=Math.floor(i / 4);
       x=((i % 4) * 100) ;
       y = (Math.floor(i / 4) * 100) ;
       emptySpace.set(x,y,row,column);
       
       refreshmovable();
    };
    
    var swap= function(square){
          
        //just swap empty with clicked one
        var tempX= square.data("x"); 
        var tempY=square.data("y");
        var temRow=square.data("row");
        var temCol=square.data("column");
        //alert("swap...row="+temRow+" col="+temCol);
       // alert(temRow);
       // if(checkIfNeighbourEmpty(temRow,temCol)){
        square.data("x",emptySpace.getX());
        square.data("y",emptySpace.getY());
        square.data("row",emptySpace.getRow());
        square.data("column",emptySpace.getColumn());
        
        square.css({left:emptySpace.getX() + 'px',top: emptySpace.getY() + 'px',
                backgroundImage:'url("img/puzzle.jpg")'});
        
        emptySpace.set(tempX,tempY,temRow,temCol);
        refreshmovable();
    //}
    };
    
    var refreshmovable= function(){
         $('#puzzlearea div').each(function(){
            //remove exsiting if present
            $(this).removeClass("movablepiece");
            if(checkIfMovable($(this))){
                $(this).addClass("movablepiece");
            }
            else{
                 $(this).removeClass("movablepiece");
            }
        });
    };
    
    var CheckWon=function(){
        var isWon=true;
        if(!isShuffled){
            return false;
        }
        $('#puzzlearea div').each(function(){
            var currRow=$(this).data('row');
            var currCol=$(this).data('column');
            
            var actualRow=$(this).data('actualRow');
            var actualCol=$(this).data('actulaCol');
          //  console.log(id+":"+curId);
          //alert("currCol="+currCol+" actualCol="+actualCol);
            if((currRow!=actualRow)||(currCol!=actualCol)){
                isWon= false;
                return;
            }
        });
        
        return isWon;
    };
    
    var checkIfMovable= function(square){
        var emptyRow=emptySpace.getRow();
        var emptyCol=emptySpace.getColumn();
       var temRow=square.data("row");
       var temCol=square.data("column");
       
       if(temRow==emptyRow){
           if((temCol==emptyCol+1)||(temCol==emptyCol-1)){
                return true;
            }
            else{
                return false;
            }
       }
       if(temCol==emptyCol){
            if((temRow==emptyRow+1)||(temRow==emptyRow-1)){
                return true;
            }
            else{
                return false;
            }
       }
        return false; 
    };
    
    var shuffle= function(){
        var suffleCount=0;
        isShuffled=true;
        while(suffleCount<=100){    
            
           var available=$('.movablepiece');
           var random=Math.floor(Math.random()*available.length);
           swap($(available[random]));
            suffleCount++;
        }
    };
})();
 
