function animate(obj, target, callback) {
    //先清除一次定时器，避免造成定时器效果叠加
    clearInterval(obj.timer);
    //obj.timer 给不同元素指定不同的定时器
    obj.timer = setInterval(function () {
        //步长写在定时器里面，每次都要重新计算  (目标值-当前位置)/10
        var step = (target - obj.offsetLeft) / 10;
        //大于零向上取整，小于零向下取整（前进、后退）
        var step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            //回调函数写在定时器结束后
            if (callback) {
                callback();
            }
        } else {
            obj.style.left = obj.offsetLeft + step + 'px';
        }
    }, 15);
}