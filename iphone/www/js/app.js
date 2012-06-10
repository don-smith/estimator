;(function(app, $) {

    // If you want to prevent dragging, uncomment this section
    /*
     function preventBehavior(e) 
     { 
     e.preventDefault(); 
     };
     document.addEventListener("touchmove", preventBehavior, false);
     */
    
    $(function() {
    	document.addEventListener('deviceready', onDeviceReady, false);
    });
    
    /* When this function is called, Cordova has been initialized and is ready to roll */
    function onDeviceReady()
    {
	    $('#captureVideo').click(function() {
	    	console.log('capturing video');
	        navigator.device.capture.captureVideo(captureSuccess, captureError);
	    });

        return false;
    }

    function captureSuccess(mediaFiles) {
        var i, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            //console.log("All good! for " + mediaFiles[i].fullPath)
            uploadFile(mediaFiles[i]);
        }       
    }
    
    function captureError(error) {
    	var show = true, msg = '';
    	switch(error.code) { 
    		case CaptureError.CAPTURE_INTERNAL_ERROR :
    			msg = 'For some reason the camera failed to capture the video. Please try again.';
    			break;
    		case CaptureError.CAPTURE_APPLICATION_BUSY :
    			msg = 'The camera seems to be busy serving another capture request. Please try again.';
    			break;
    		case CaptureError.CAPTURE_INVALID_ARGUMENT :
    			msg = 'The programmer of this app has done something inappropriate. Please let him know.';
    			break;
    		case CaptureError.CAPTURE_NOT_SUPPORTED :
    			msg = 'Capturing video doesn\'t seem to be supported on this device. Please use a supported device.';
    			break;
    		case CaptureError.CAPTURE_NO_MEDIA_FILES :
    			show = false; // user cancelled
    			break;
		}

    	if(show) {
	        navigator.notification.alert(msg, null, 'Uh oh!');
	    }
    }
    
    // Upload files to server
    function uploadFile(mediaFile) {
        var ft = new FileTransfer(),
        date = new Date(),
        //name = mediaFile.name,
        size = mediaFile.size,
        fileKey = 'file',
        pathToFile = mediaFile.fullPath,
        fileName = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'-'+date.getHours()+'-'+(date.getMinutes()+1)+'.mov',
        uploadOptions = new FileUploadOptions(),
        params = { filename: fileName };

        uploadOptions.fileKey  = 'file';
        uploadOptions.fileName = fileName;
        uploadOptions.filename = fileName;
        uploadOptions.mimeType = 'video/quicktime'
        uploadOptions.params   = params;

//        uploadOptions = {
//        	fileKey: 'file',
//          acl: 'public-read',
//          fileName: fileName,
//          key: 'uploads/${filename}', 
//          AWSAccessKeyId: '1Z9R29H6R69CHFGVJ202',
//          success_action_redirect: 'http://estimator.azurewebsites.net/upload-success',
//          policy: 'eyAiZXhwaXJhdGlvbiI6ICIyMDEzLTAxLTAxVDAwOjAwOjAwWiIsCiAgImNvbmRpdGlvbnMiOiBbIAogICAgeyJidWNrZXQiOiAid2UtZXN0aW1hdGUtdmlkZW9zIn0sIAogICAgWyJzdGFydHMtd2l0aCIsICIka2V5IiwgInVwbG9hZHMvIl0sCiAgICB7ImFjbCI6ICJwdWJsaWMtcmVhZCJ9LAogICAgeyJzdWNjZXNzX2FjdGlvbl9yZWRpcmVjdCI6ICJodHRwOi8vZXN0aW1hdG9yLmF6dXJld2Vic2l0ZXMubmV0L3VwbG9hZC1zdWNjZXNzIn0sCiAgICBbInN0YXJ0cy13aXRoIiwgIiRDb250ZW50LVR5cGUiLCAidmlkZW8iXSwKICAgIFsiY29udGVudC1sZW5ndGgtcmFuZ2UiLCAwLCA0MTk0MzA0XQogIF0KfQ==',
//          signature: 'pQmpug/gFlsxJNrT+Isd4ykA2Mo=',
//          'Content-Type': 'video/quicktime'
//        };
        
        console.log('file upload initiating ...');

        ft.upload(pathToFile,
          //'https://we-estimate-videos.s3.amazonaws.com/',
          'http://we.locksmithdon.net/upload',
          uploadSuccess,
          uploadError,
          uploadOptions);

        $('#status').slideDown();
    }

    function uploadSuccess(result) {
	    console.log('Upload code: ' + result.code);
	    console.log('Upload bytesSent: ' + result.bytesSent);
	    console.log('Upload response: ' + result.response);
	    $('#status').slideUp();
    }

    function uploadError(error) {
        console.log('Error uploading file. ' + error.code);
	    $('#status').slideUp();
    }

    function uploadProgress(sent, total) {
    	var percent = 100 / total * sent;
    	console.log('Uploaded ' + percent);
    }

})(window.estimator = window.estimator || {}, jQuery);    
