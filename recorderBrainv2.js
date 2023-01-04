/* Code by: Dave Dood
   How to use it:
1. Use the web browser version of Manyland (I'm sorry Steam/mobile players :<)
2. Equip this brain
3. Press play. After 3 seconds, the brain will start recording.
4. Move around or do whatever for 15 seconds while the brain records your movements.
5. After 15 seconds, the brain will spit out dynamic code. To copy it, either...
  - Open your browser's debug console. Scroll all the way down and copy everything from "//PASTE INTO DYNAMIC" to the bottom of the output.
  - Or, click and highlight the output in the brain itse1f (this won't work if you accidentally pressed down while recording). Once the output is all blue, click and drag it anywhere into this brain's code, then immediately press CTRL + X to cut it (you might want to try pasting it again to make sure you copied it correctly).
6. Paste the code into a body-turned-dynamic, and hit the green checkmark.
7. Place the dynamic where you started recording and watch it move!
*/

//VARIABLES
var memory = { startX: 0, startY:0, waitBeforeRecording: 30, recordingTime: 0, recorded: [], outputFinished: 0, facing: "left", actionsThisFrame: ""};
var dynamicScale = 1.0; //Changes how spread out the resulting dynamic will be compared to the player's actual movements.
//From some quick tests, 1.0 seems to be a good value for this, though it's possible that if you walk really far from where you started
//recording, the recording may get displaced a bit.

//The gameloop function
function update(my) {
  var reaction = {}
  if (my.sight){ //Adding "if (my.sight){ insert code here }" to the update function ensures that the brain won't crash randomly (as sometimes my.sight is undefined for a frame)
    if (memory.waitBeforeRecording > 0){ //Countdown before recording begins
        if ((memory.waitBeforeRecording % 10) == 0)
            log("Starting recording in:", memory.waitBeforeRecording, "...")
            reaction.speech = "Recording in..." + memory.waitBeforeRecording
        memory.waitBeforeRecording -= 1;
        memory.startX = rounded(my.x);
        memory.startY = rounded(my.y);
    }
    else if (memory.recordingTime < 150){ //Currently recording the player's movements
        memory.recordingTime += 1;
        //var newFrame = new recordedFrame(getMyActions(my), rounded(my.x), rounded(my.y));
        var newFrame = {actions: getMyActions(my), time: memory.recordingTime, X: rounded(my.x), Y: rounded(my.y), state: getMyState(my)}
        memory.recorded.push(newFrame);
        logFresh("Recorded frame:", newFrame);
        return;
    }
    else if (memory.outputFinished == 0){ //Finished recording! Output dynamic code
        reaction.speech = "Finished recording!"
        console.log("Recorded is:", memory.recorded)
        var dynamicCode = createDynamicCode()
        log(dynamicCode)
        console.log(dynamicCode)
        memory.outputFinished = 1;
    }
  }//end of if my.sight was defined
  return reaction
}//end of update function

/* Referenced from: stackoverflow.com/questions/7342957/how-do-you-round-to-1-decimal-place-in-javascript*/
function rounded(num){
    //Round the value given in num to the nearest tenth decimal place (as this is the smallest time intervals/position changes dynamics can do)
    var rounded = Math.round(num * 10) / 10;
    return rounded;
}

function createDynamicCode(){
    //Convert the player's movements (stored in memory.recorded) into dynamic code.
    logFresh();
    var skipped = 0;
    var code = "0S: CELL 1 SHOW\n";
    for (var frameNum = 0; frameNum < memory.recorded.length; frameNum ++){
        var frame = memory.recorded[frameNum]
        var nextFrame = memory.recorded[frameNum + 1];
        console.log("Framenum is:", frameNum, "frame:", frame, "nextFrame:", nextFrame)
        if (frame.time == memory.recorded.length - 2){ //No next frame, so no more changes to animate... Maybe?
            console.log("breaking at time:", frame.time)
            break;
        }
        //console.log("frame:", frame, "nextFrame:", nextFrame, "recorded:", recorded)
        var xChange = rounded((nextFrame.X - frame.X) * dynamicScale);
        var yChange = rounded((nextFrame.Y - frame.Y) * dynamicScale);
        var xPos = rounded((memory.startX - frame.X) * dynamicScale);
        var yPos = rounded((memory.startY - frame.Y) * dynamicScale);
        if ((xChange == 0) && (yChange == 0)){
            //If the player's position didn't change at all, skip adding anything this frame and increase the waiting time for the next frame.
            skipped += .1;
            continue;
        }
        //Add the timings to this frame (and skip if there was any)
        code += "+"+rounded(skipped)+"-+.1:";
        //Reset the 'skipped' waiting time
        skipped = 0;
        //Change the cell position
        code += "CELLS POSITION " + -xPos + " " + -yPos
        //Flip the player if their left/right direction changed.
        if (memory.facing == "left" && xChange > 0){
            memory.facing = "right"
            code += ",CELLS FLIP HORIZONTAL";
        }else if (memory.facing == "right" && xChange < 0){
            memory.facing = "left"
            code += ",CELLS FLIP HORIZONTAL";
        }
        if (nextFrame.state != frame.state){
            if (nextFrame.state == "standing"){
                code += ",CELLS HIDE,CELL 1 SHOW";
            }
            else if (nextFrame.state == "walking"){
                code += ",CELLS HIDE,CELL 2 SHOW";
            }
            else if (nextFrame.state == "rising"){
                code += ",CELLS HIDE,CELL 3 SHOW";
            }
            else if (nextFrame.state == "falling"){
                code += ",CELLS HIDE,CELL 4 SHOW";
            }
            else if (nextFrame.state == "climbing"){
                code += ",CELLS HIDE,CELL 5 SHOW";
            }
        }
        code += "\n";        
    }
    return code;
}


function getMyActions(my){
    //Figure out which inputs the player is doing
    //Returns a string that represents which inputs are pressed.
    //Note: currently the actions are unused in this particular version of the brain.
    //I was originally planning on also having the dynamic code display like... a keyboard or something, to help display tricky inputs.
    var returnActions = "";
    if (my.control.action){
        returnActions += "a";
    }
    if (my.control.left){
        returnActions += "l";
    }else if (my.control.right){
        returnActions += "r";
    }
    if (my.control.up){
        returnActions += "u";
    }else if (my.control.down){
        returnActions += "d";
    }
    memory.actionsThisFrame = returnActions;
    return returnActions;
}

function getMyState(my){
    //Determine what state the player is in.
    //Specifically, is the player doing a walking animation? Are they falling? Etc.
    if (my.touch && my.touch.bottom){
        //Player is on the ground, they are either standing or running.
        if (memory.actionsThisFrame.includes("l") || memory.actionsThisFrame.includes("r")){
            return "walking";
        }
        else{
            return "standing";
        }
    }else if (my.touch && my.touch.center && my.touch.center.type == 'climbable'){
        //Player is climbing something
        return "climbing";
    }
    else{
        //Player is either falling or rising.
        if (my.velocity.y > 0){
            return "falling"
        }
        else{
            return "rising";
        }
    }
}