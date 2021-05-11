//https://teachablemachine.withgoogle.com/models/e97mYy1g5/
Prediction_001="";
Prediction_002="";

Camera_Variable=document.getElementById("Camera");
Webcam.attach('#Camera_Variable');

Webcam.set({
    width: 300,
    height: 300,
    image_format: "png",
    png_quality: 90
});

function Snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("Result").innerHTML='<img id="Captured_Image" src="'+data_uri+'">';
    });
}

console.log("ml version:",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/e97mYy1g5/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}

function Speak() {
    var Synth=window.speechSynthesis;
    Speak_Data_001="First Prediction Is "+Prediction_001;
    Speak_Data_002="Second Prediction Is "+Prediction_002;
    var UtterThis=new SpeechSynthesisUtterance(Speak_Data_001+Speak_Data_002);
    Synthspeak(UtterThis);
}

function CheckEmoji() {
    img=document.getElementById("Captured_Image");
    classifier.classify(img,GotResult);
}

function GotResult(error,results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("Result_Emotion_Name_001").innerHTML=results[0].label;
        document.getElementById("Result_Emotion_Name_002").innerHTML=results[1].label;
        Prediction_001=results[0].label;
        Prediction_002=results[1].label;
        Speak();
        if(results[0].label=="Happy"){
            document.getElementById("Update_Emoji_001").innerHTML="&#128512";
        }
        if(results[0].label=="Sad"){
            document.getElementById("Update_Emoji_001").innerHTML="&#128532";
        }
        if(results[0].label=="Angry"){
            document.getElementById("Update_Emoji_001").innerHTML="&#128545";
        }

        if(results[1].label=="Happy"){
            document.getElementById("Update_Emoji_002").innerHTML="&#128512";
        }
        if(results[1].label=="Sad"){
            document.getElementById("Update_Emoji_002").innerHTML="&#128532";
        }
        if(results[1].label=="Angry"){
            document.getElementById("Update_Emoji_002").innerHTML="&#128545";
        }
    }
}