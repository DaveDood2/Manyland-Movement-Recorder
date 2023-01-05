# Manyland-Movement-Recorder
An in-game recorder that uses javascript code to turn your character's movements into Dynamic animations. Useful for creating fake players, tutorials, or just for fun!

Click the image below to see a video example of how I used it to create an animation of a Hamsterdog diving into a pool.
[![The Recorder in Action](http://img.youtube.com/vi/7JxhQfU-L00/0.jpg)](http://www.youtube.com/watch?v=7JxhQfU-L00)

# How to use
1. Open the browser version of Manyland, as javascript doesn't play nice with the Steam version.
2. Go to someplace you can edit.
3. 

# Limitations/Troubleshooting
In Manyland, Dynamics have the following limitations:
1. The total number of characters in the code cannot exceed 5000 characters.
⋅⋅* This means some complicated animations might get cut short.
⋅⋅* Animations where the character changes their state a lot (e.g., they keep flipping left/right or go from standing still to moving to standing again several times in a short span of time) are prone to hit this limit.
2. Cells cannot travel too far from the starting point of the dynamic.
⋅⋅* If your animation is still moving but it looks like it got stuck on something invisible, this may be why.
⋅⋅* Try adjusting where you're starting the animation from, if this happens.
3. Animations cannot play longer than 15 seconds.
⋅⋅* You may need to do some experimentation and rerecords to get your animation to what you want it to be.
⋅⋅* Also try manually editing the end of the animation to get it to loop properly, such as with ```+0-+.1:CELLS POSITION 0 0``` at the very end to make the character go back to the start of the animation before it repeats.
