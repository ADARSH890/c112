Webcam.set({
    width:350,
    height:300,
    image_format:"jpg",
    jpg_quality:90
}) ;
camera=document.getElementById("camera");
Webcam.attach(camera);
 function takesnapshot(){
     Webcam.snap(function(data_uri){
         document.getElementById("snapshot").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';

     }) ;
 }
 console.log("ml5 version",ml5.version);
 classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ANtuhk3sm/model.json",modelLoaded);
 function modelLoaded(){
     console.log("modelLoaded");

 } 
 var prediction_1="";
 var prediction_2="";
 
 function speak(){
     var synth=window.speechSynthesis;
     speak_data_1 = "The first prediction is " + prediction_1;
     speak_data_2 = "The second prediction is " + prediction_2;
     var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
     synth.speak(utterThis);

    
    }
    function predict(){
        img=document.getElementById("captured_image");
        classifier.classify(img,gotresult);
    }
    function gotresult(error,results){
        if(error){
            console.error(error);
        }
        else{
            console.log(results);
            document.getElementById("result_emotion_name").innerHTML=results[0].label;
            document.getElementById("result_emotion_name2").innerHTML=results[1].label;
            prediction_1=results[0].label;
            prediction_2=results[1].label;
            speak();
            if(results[0].label =="HAPPY" ){
                document.getElementById("update_emoji").innerHTML="&#128512;";
            }
            if(results[0].label =="SAD" ){
                document.getElementById("update_emoji").innerHTML="&#128531;";
            }
            if(results[0].label =="ANGRY" ){
                document.getElementById("update_emoji").innerHTML="&#128545;";
            }
            if(results[0].label =="POINT" ){
                document.getElementById("update_emoji").innerHTML="&#9757;";
            }

            if(results[1].label =="HAPPY" ){
                document.getElementById("update_emoji2").innerHTML="&#128512;";
            }
            if(results[1].label =="SAD" ){
                document.getElementById("update_emoji2").innerHTML="&#128531;";
            }
            if(results[1].label =="ANGRY" ){
                document.getElementById("update_emoji2").innerHTML="&#128545;";
            }
            if(results[1].label =="POINT" ){
                document.getElementById("update_emoji2").innerHTML="&#9757;";
            }

        }
    }
