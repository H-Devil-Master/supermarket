var iSpeed = 0;
function move2(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {

        iSpeed += (target - obj.offsetLeft) / 5;
        iSpeed *= 0.7;

        if (Math.abs(iSpeed) < 1 && Math.abs(target - obj.offsetLeft) < 1) {
            clearInterval(obj.timer);
            callback && callback();
        } else {
            obj.style.left = obj.offsetLeft + iSpeed + 'px';
        }
    }, 30);
}
export {move2};
