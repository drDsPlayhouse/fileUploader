
var $fileType = $('#fileInput'),
	videoData = [],
	counter = 0,
	$videoList = $('#videosUploaded'),
	$uploader = $('#uploader'),
	$videoPlayer = $('#videoPlayer'),
	$errorText = $('#error_text');



function progressHandler(e){
    if(e.lengthComputable){
        $('progress').attr({value:e.loaded,max:e.total});
    }
}


$fileType.on("change", function(){
	var videoFile = this.files[0];
	

	if ($fileType.val().split(".").pop().toLowerCase() !== "mp4"){
		$errorText.css({"display":"block"});
	}
	else{
		videoData.push($fileType.get(0).files[0]);
		console.log(videoData[0])
		$errorText.css({"display":"none"});

		
		}
})

$uploader.on("click", function (event){
	counter += 1;
var formData = new FormData($('form')[0]);
	if(counter >= 5){
		$errorText.replaceWith('<p style="background-color:#FF1214"><strong>Only five videos are allowed to be uploaded.</strong></p>');
	}
	if ($fileType.val().split(".").pop().toLowerCase() !== "mp4"){
		$errorText.css({"display":"block"});
	}
	else{
		

		$.ajax({
		    url: 'http://localhost:5000/api', 
		    type: 'POST',
		    xhr: function(){
		    	var myXhr = $.ajaxSettings.xhr();
		    	if(myXhr.upload){
		    		myXhr.upload.addEventListener('progress', progressHandler, false);
		    	}
		    	return myXhr;
		    },
		    data: formData,
		    contentType: false,
		    processData: false,
		    
		    success: function(data){
		        alert(data);
		    }
		});
			$videoList.append('<p><strong>Name:</strong> ' + videoData[0].name + ' <strong>Type:</strong> ' + videoData[0].type + ' <button id="playButton" class="pure-button">PLAY</button>' + '<p>'+'<p>Please see the console for the uploaded file</p>');

	}
});


// $('#playButton').on('click', function(){
//     var url = URL.createObjectURL(videoData[0]);
//     console.log(url);
//     $videoPlayer.css({"display":"block"});
//     var reader = new FileReader();
//     reader.onload = function() {
//     	$videoPlayer.src = url;
//     	$videoPlayer.play();
        
//     }
//     reader.readAsDataURL(videoData[0]);

// })









