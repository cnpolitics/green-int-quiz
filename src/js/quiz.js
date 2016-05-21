var total = 7;
var fullScore = 7;
var tScore = 0;
var record = 0;
var quizRec = "";
var mulRec = "";
var temp;

function next(t){
    $("div#bd > div.panel-body").hide();
    $("div.js_answer").eq(t).show();
    $("div.js_answer").eq(t).children("input").attr("checked","");
    gotoTop();
}
function result(t){
    $("div#bd > div.panel-body").hide();
    
    $("div.js_result").eq(fullScore - t).show();
	$("div.js_result").eq(fullScore - t).find(".resultscore").eq(0).html($("#totalsc").val());
	gotoTop();
}

function showAnswer(t){
	$("div#bd > div.panel-body").hide();
	$("div.popup-box")[t].style.removeProperty("display");
	$("div.popup-box").eq(t).addClass('appearAnimation');
	gotoTop();
}

function selected(t){
	    $(t).children("input").attr("checked","checked");
  		$("li.list-group-item").removeClass('active');
}
function showNext(t){
    $("div#bd > div.panel-body").hide();
    $("div.popup-box").hide();
	var index= t.value;
	next(index);
}

function push(){
    // Variable to hold request
	var request;

	

    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $("#collector");

    $('<input />').attr('type', 'hidden')
          .attr('name', "Total")
          .attr('value', tScore)
          .appendTo($form);
          
    for (i=1;i<7; i++){
    
      $('<input />').attr('type', 'hidden')
          .attr('name', "A"+i)
          .attr('value', quizRec[i-1])
          .appendTo($form); 
    }
    $('<input />').attr('type', 'hidden')
          .attr('name', "A7")
          .attr('value', mulRec)
          .appendTo($form); 
          
    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");
	temp = $form;
    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // Fire off the request to /form.php
    request = $.ajax({
        url: "http://zwen668.com/green-int-quiz/src/php/post.php",
        type: "post",
        data: serializedData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log("Hooray, it worked!");
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
        $inputs.prop("disabled", false);
    });

    // Prevent default posting of form
    event.preventDefault();
}


function toggle(t){
	var child =  $(t).children("input");
	temp = t;
	if (t.type == "submit" && t.value != ""){
		
		var size = $("input:checkbox:checked").size();
		for (i=0; i<size;i++){
		 mulRec += $("input:checkbox:checked")[i].value;
		}
		if (size == 3){
			if ($("input:checkbox:checked")[0].value == "A" && $("input:checkbox:checked")[1].value == "B" && $("input:checkbox:checked")[2].value == "D"){
				 tScore ++;
			}
		}
		setTimeout(function(){showAnswer(6);},500);
		return false;
	}else if (child.length == 0){
		var gender = document.getElementsByName("Gender")[0].value;
		var faculty = document.getElementsByName("Faculty")[0].value;
		var age = document.getElementsByName("Age")[0].value;
		if (gender == "" | faculty =="" | age == ""){
			alert("看结果前，请先完善您的个人信息");
		}else {
			push();
		
			//Hard coded maximum,please do not try to hack it 
			if (tScore > 10 ) {
				tScore = 10
			}
			
			modifyTitle(tScore);
			result(tScore);
		}
	
	}else {
    	$(t).children("input").attr("checked","checked");
  		$("li.list-group-item").removeClass('active');
    	var rt = $(t).children("input:checked").val();
    	var score = rt.match(/\d+/)[0];
      	tScore  = parseInt(tScore) + parseInt(score);
    	
    	quizRec = quizRec + rt.match(/[a-zA-Z]/);
		$("#totalsc").val(tScore);
   		$(t).addClass('active');
    	var t = $("div.js_answer").index($(t).parents("div.js_answer")) + 1;
    	if(t == total){
        	push();
		    modifyTitle(tScore);
        	result(tScore);
    	}else{
        	setTimeout(function(){showAnswer(t - 1);},500);
    	}
    }
}

function gotoTop(){
    $("body,html").animate({scrollTop:($("#header").offset().top + $("#header").height())}, 1000);
}