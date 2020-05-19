// Author: Caroline Hoang
// Two Lists that have Drag and Drop functionality between them: The Office Edition
// [A UI Design Class Assignment]

employees = [
    "Phyllis",
    "Angela",
    "Dwight",
    "Oscar",
    "Creed",
    "Pam",
    "Jim",
    "Stanley",
    "Michael",
    "Kevin",
    "Kelly"
    ]

// the lists we work with
var non_ppc = employees; 
var ppc = [];

var draggableSettings= { //the settings with which we configure every draggable (name)
    cursor: 'move',    //make the name keep the move arrow while dragging
    revert: "invalid", //true
    stack: ".names"
  }

//make the divs for each name in the non-ppc list and give them data of their name and index
function makeNONListViews(){
    $('#non-ppc-list').empty();
    non_ppc.forEach(function(name, index){
        ($("<div class='names non-ppc'>" +index+": " + name + "</div>").data( 'name', name ).data( 'index', index )).draggable(draggableSettings).appendTo($('#non-ppc-list'));
    });
}

//make the divs for each name in the ppc list
function makeListViews(){
    $('#ppc-list').empty();
    ppc.forEach(function(name, index){
        ($("<div class='names ppc'>" +index+": " + name + "</div>").data( 'name', name ).data( 'index', index )).draggable(draggableSettings).appendTo($('#ppc-list'));
    });
}

//a function to run both of the above programs at once
function makeView(){
    makeNONListViews();
    makeListViews();
}

//main function
$(document).ready(function(){
    makeView();   //make the view on load

    //determine the behavior of the ppc droppable area while name is being dragged and on drop
    $('#ppc-list-target').droppable( {
        accept: ".non-ppc",
        tolerance: "touch", //accept any amount of overlay to make the drop off more sensitive
        //hoverClass is depreciated so I use classes instead
        classes: {
            "ui-droppable-active": "targeting", //make medium blue when dragging
            "ui-droppable-hover": "targeted"    //make dark blue when hovering above the drop off area
          },
        drop: function(event, ui){
            ppc.push($( ui.draggable ).data("name")); //add a new name to ppc list
            
            //remove the dragged list from non-ppc list

            //match the index in the list with the index value 
            //given to the name of the draggable on generation
            var index=$( ui.draggable ).data("index")
            non_ppc.splice(index,1);
            
            makeView(); //rerender view
            
        }
      }); 
      $('#non-ppc-list-target').droppable( {
        accept: ".ppc",
        tolerance: "touch",
        classes: {
            "ui-droppable-active": "targeting",
            "ui-droppable-hover": "targeted"
          },
        drop: function(event, ui){
            non_ppc.push($( ui.draggable ).data("name"));
            
            //remove the dragged list from non-ppc list

            //match the index in the list with the index value 
            //given to the name of the draggable on generation
            var index=$( ui.draggable ).data("index")
            ppc.splice(index,1);
            
            makeView(); //rerender view
        }
      });       
})





