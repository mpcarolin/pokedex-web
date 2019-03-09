// todo: put this into a utility class named SwipeHelper. Or pair with component Swipe wrapper.
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

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
            return SWIPE_DIR.LEFT
        } else {
            return SWIPE_DIR.RIGHT
        }                       
    } else {
        if ( yDiff > 0 ) {
            return SWIPE_DIR.UP
        } else { 
            return SWIPE_DIR.DOWN
        }                                                                 
    }
};

export default {getSwipeProps, getSwipeDirection, SWIPE_DIR}