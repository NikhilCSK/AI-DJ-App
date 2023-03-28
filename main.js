
song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;


function preload()
{

    song = loadSound("music.mp3");

}


function setup()
{

    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}

function  modelLoaded()
{

    console.log("PoseNet Is Initialized");

}

function gotPoses(results)
{

    console.log(results);

        if (results.length > 0)
            {

                

                leftWristX = results[0].pose.leftWrist.x;
                leftWristY = results[0].pose.leftWrist.y;

                console.log("Left Wrist X = " + leftWristX + " and Left Wrist Y = " + leftWristY ); 

                scoreLeftWrist = results[0].pose.keypoints[9].score;
                console.log("Score of Left Wrist is " + scoreLeftWrist);

                rightWristX = results[0].pose.rightWrist.x;
                rightWristY = results[0].pose.rightWrist.y;
                
                console.log("Right Wrist X = " + rightWristX + " and Right Wrist Y = " + rightWristY );
                
            }
        

}

function draw()
{

    image(video, 0, 0, 600, 500);

    fill("red");
    stroke("red");

    if (scoreLeftWrist > 0.2)
    {

        circle(leftWristX, leftWristY, 20);
        InNumberLeftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberLeftWristY);
        volume = remove_decimals/500;
        setVolume(volume);
        document.getElementById("volume").innerHTML = "Volume = " + volume;

    }

}

function play()
{

    song.play();
    song.setVolume(1);
    song.rate(1);

}