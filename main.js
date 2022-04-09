video = "";
Store = "";
status = "";
objects = [];

function setup(){
    canvas= createCanvas(400,400);
    canvas.position(760, 350);

    video = createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video, 0, 0, 480, 380);

    if(status != ""){
        objectdetector.detect(video, gotResult);

        for(i = 0; i<objects.length; i++){
            document.getElementById("Status").innerHTML = "Status: Objects Detected";
            stroke("red");
            fill("red");
            noFill();

            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 20, objects[i].y + 20);
            rect(objects[i].x, object[i].y, objects[i].width , objects[i].height);

            if(store == objects[i].label){
                video.stop();
                objectdetector.detect(video, gotResult);
                document.getElementById("No.Objects").innerHTML = store + " found";
            }
            else{
                document.getElementById("No.Objects").innerHTML = store + " not found";
            }

        }

    }
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function Start(){
    objectdetector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("Status").innerHTML = "Status: Detecting Objects";
    store = document.getElementById("Input1").value;
}

function modelloaded(){
    console.log("model has been loaded");
    status = true;
}