var xDown = null;                                                        
var yDown = null;                                                        

// todo: put this into a utility class named SwipeHelper
export const SWIPE_DIR = {
    "LEFT": "left",
    "RIGHT": "right",
    "UP": "up",
    "DOWN": "down"
}

// for touch start and move
export const getSwipeProps = (evt) => {                                         
    let xDown = evt.touches[0].clientX;                                      
    let yDown = evt.touches[0].clientY;                                      
    return { xDown, yDown }
};                                                

// for move
export const getSwipeDirection = (evt, xDown, yDown) => {
    if ( ! xDown || ! yDown ) {
        return;
    }

    const current = getSwipeProps(evt)

    var xDiff = xDown - current.xDown;
    var yDiff = yDown - current.yDown;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */
            return SWIPE_DIR.LEFT
        } else {
            /* right swipe */
            return SWIPE_DIR.RIGHT
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
            return SWIPE_DIR.UP
        } else { 
            /* down swipe */
            return SWIPE_DIR.DOWN
        }                                                                 
    }
};

export default {getSwipeProps, getSwipeDirection, SWIPE_DIR}