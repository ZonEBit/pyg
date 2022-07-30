window.addEventListener('load', function () {
    var focus = document.querySelector('.focus');
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    var focusWidth = focus.offsetWidth;
    //1.鼠标经过，显示隐藏左右按钮
    focus.addEventListener('mouseenter', function () {
        prev.style.display = 'block';
        next.style.display = 'block';
        clearInterval(timer);//清除定时器
        timer = null;
    });
    focus.addEventListener('mouseleave', function () {
        prev.style.display = 'none';
        next.style.display = 'none';
        timer = setInterval(function () {
            //手动调用点击事件
            next.click();
        }, 2000);
    });
    //2.动态生成小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        //给li添加索引号
        li.setAttribute('index', i);
        ol.appendChild(li);
        //3.小圆圈的排他思想
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            //留下自己
            this.className = 'current';
            //4.点击小圆圈，移动图片,移动ul，移动距离为索引号*图片宽度
            var index = this.getAttribute('index');
            //保证按钮和圆圈与图片同步
            num = index;
            circle = index;
            animate(ul, -index * focusWidth);
        });
    }
    ol.children[0].className = 'current';

    //5.克隆第一张图片到ul的最后
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    //6.点击右侧按钮，滚动一张图片
    var num = 0;
    var circle = 0;
    //设置节流阀
    var flag = true;
    next.addEventListener('click', function () {
        if (flag) {
            flag = false;//先关闭
            //如果到了克隆的那张图，则直接跳转到第一张图，实现无缝跳转
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;//动画完成后再打开节流阀
            });
            //7.点击右侧按钮，小圆圈随着变化
            circle++;
            //到最后一张图片时，进行复原
            if (circle == ul.children.length - 1) {
                circle = 0;
            }
            //排他思想
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }
    });
    //8.左侧按钮
    prev.addEventListener('click', function () {
        if (flag) {
            flag = false;
            //如果到了克隆的那张图，则直接跳转到第一张图，实现无缝跳转
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            //9.点击左侧按钮，小圆圈随着变化
            circle--;
            //没点击时，circle=0，处于第一张图片，点击后，circl--，小于0，此时为第四个图片，小圆圈也改为第四个
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            //排他思想
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }
    });
    //10.自动播放
    var timer = setInterval(function () {
        //手动调用点击事件
        next.click();
    }, 2000);

});