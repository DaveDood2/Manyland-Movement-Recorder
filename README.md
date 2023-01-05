# Manyland-Movement-Recorder
An in-game recorder that uses javascript code to turn your character's movements into Dynamic animations. Useful for creating fake players, tutorials, or just for fun!

Click the image below to see a video example of how I used it to create an animation of a Hamsterdog diving into a pool.
[![The Recorder in Action](http://img.youtube.com/vi/7JxhQfU-L00/0.jpg)](http://www.youtube.com/watch?v=7JxhQfU-L00)

# How to use
1. Open the browser version of Manyland, as javascript doesn't play nice with the Steam version.
2. Go to someplace you can edit.
3. Hit **Create+** in the top-right, hit `Type...`, `Automation`, then hit `Change` until the type changes to brain.
4. Hit the three horizontal line `≡` button at the top to open the brain's code menu.
5. Paste the contents of `recorderBrainv2.js` into the code menu. Hit **Ok**, then the green checkmark `✔️` in the bottom-right to save the brain.
6. Open your browser's debug menu. This is usually done with **F12** for most browsers.
7. Equip the brain you made from the right-menu. You should see some text above your character that says something like **Recording in...**.
8. After ~3 seconds, the brain should start to record your movements. Try moving around!
9. Once you see **Finished Recording!**, the brain will have output dynamic code to the console window in the debug menu.
10. Copy the parts of the output that is in all caps, like `0S: CELL 1 SHOW  +2.5-+.1:CELLS POSITION 0 0` (see the video above for a demonstration).
11. Drag an existing body you made onto the **Create+** button to edit it.
12. Click **Body**, then change the type to **Dynamic**. Hit the three horizontal line `≡` button to open the dynamic's code, paste in the code you got from step 10.
13. Hit **Ok**, then the green checkmark `✔️` in the bottom-right to save the dynamic.
14. Place the dynamic down where you started the animation (or wherever) and watch it move! Voila!


# Limitations/Troubleshooting
In Manyland, Dynamics have the following limitations:
1. The total number of characters in the code cannot exceed 5000 characters.
  * This means some complicated animations might get cut short.
  * Animations where the character changes their state a lot (e.g., they keep flipping left/right or go from standing still to moving to standing again several times in a short span of time) are prone to hit this limit.
2. Cells cannot travel too far from the starting point of the dynamic.
  * If your animation is still moving but it looks like it got stuck on something invisible, this may be why.
  * Try adjusting where you're starting the animation from, if this happens.
3. Animations cannot play longer than 15 seconds.
  * You may need to do some experimentation and rerecords to get your animation to what you want it to be.
  * Also try manually editing the end of the animation to get it to loop properly, such as with ```+0-+.1:CELLS POSITION 0 0``` at the very end to make the character go back to the start of the animation before it repeats.
