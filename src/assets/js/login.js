const preBox = document.querySelector('.pre-box');
const enter = document.getElementById('enter');
const login = document.getElementById('login');
const register = document.getElementById('register');
const newCode01 = document.getElementById('newCode');
enter.onclick = () => {
    move2(preBox, 523, function () {
        addClass(preBox, 'jianbian')
        removeClass(preBox, 'jianbian2')
    });
}
login.onclick = () => {
    move2(preBox, 0, function () {
        addClass(preBox, 'jianbian2')
        removeClass(preBox, 'jianbian')
    });
}
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

//保存全局，与新输入的验证码进行校验
let code;
//1.获取对应的标签
let codeDiv = document.getElementById("code");
let newCodeInput = document.getElementById("newCode");
let validate = document.getElementById("validate");
//加载页面获取对应的验证码
creatCode();

//获取min到max之间的整数（1-100）
function random(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

function creatCode() {
    //设置默认的空的字符串
    code = '';
    //设置长度
    let codeLength = 4;
    let randomCode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E',
        'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
        'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (let i = 0; i < codeLength; i++) {
        //设置随机范围0-36
        let index = random(0, 36);
        code += randomCode[index];
    }
    // return code;
    codeDiv.innerHTML = code;
}

//验证按钮效验
document.onkeyup = function (event) {
    if (event.key === 'Enter') {
        //获取用户新输入的验证码
        let newCode = newCodeInput.value.toUpperCase();
        if (newCode === code) {
            //验证成功，跳转对应的网址
            window.location.href = 'https://www.bilibili.com/';
        } else {
            //验证失败
            // newCode01.placeholder.value='da'
            creatCode();
            //输入口的值置为空
            newCodeInput.value = "";
        }
    }
}

//切换眼睛
/*            const eyebtn = document.getElementById('toggleBtn');
            const changeeye = document.getElementById('eye');
            eyebtn.addEventListener('click',()=>{
                if (hasClass('fa-eye')){
                changeeye.classList.remove('fa-eye');
                changeeye.classList.add("fa-eye-slash");
                return true;
                }
            })*/
function changeeyes(fontBtn, psw) {
    $(fontBtn).onclick = function () {
        if ($(psw).type === "password") {
            $(psw).setAttribute('type', 'text');
            $(fontBtn).classList.remove('hide');
        } else {
            $(psw).setAttribute('type', 'password');
            $(fontBtn).classList.add('hide');
        }
    }
}

changeeyes("toggleBtn", "login-psw");
changeeyes("toggleBtn01", "registered-psw1");
changeeyes("toggleBtn02", "registered-psw2");

//验证表单
function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : null;
}

//用户名验证
function validationForm(id, reg) {
    //1.获取输入的内容
    let value = $(id).value;
    //声明一个判断用户名为字母数字下划线组成的6-18的字符串验证规则
    var reg1 = reg;
    console.log(value)
    if (!(reg1.test(value))) {
        //验证不通过
        return false;
    } else {
        return true;
    }
}


//密码验证
function validationpswForm(id, reg, btn) {
    //1.获取输入的内容
    let value = $(id).value;
    //声明一个判断用户名为字母数字下划线组成的6-18的字符串验证规则
    var reg1 = reg;
    // console.log(value)
    if (!(reg1.test(value))) {
        //验证不通过
        /*$('login-psw').setAttribute('type','text');
        $(btn).classList.remove('hide');*/
        // $(id).setAttribute('placeholder',prompt);
        // $(id).value = "";
        return false;
    } else {
        return true;
    }
}


//确认密码验证
function validationpswFormT(id, btn) {
    //1.获取输入的内容
    let value = $(id).value;
    // console.log(value)
    if (!(value === $('registered-psw1').value)) {
        //验证不通过
        /*$('login-psw').setAttribute('type','text');
        $(btn).classList.remove('hide');*/
        // $(id).setAttribute('placeholder',prompt);
        // $(id).value = "";
        return false;
    } else {
        return true;
    }
}

//抖动
const box = document.querySelectorAll(".box")[0];
box.onclick = function () {

}
//登录验证
const logine_text = document.getElementById('login-prompt-text');
register.onclick = () => {
    //获取用户新输入的验证码
    let newCode = newCodeInput.value.toUpperCase();
    if (newCode === code) {
        //验证成功，跳转对应的网址
        window.location.href = 'javascript:;';
    } else {
        //验证失败
        // newCode01.placeholder.value='da'
        creatCode();
        //输入口的值置为空
        newCodeInput.value = "";
    }

    //开始验证
    validationForm('login-user', /^[a-zA-Z0-9_]{6,18}$/ig);
    validationpswForm('login-psw', /^[\W\da-zA-Z_]{6,20}$/);
    const login_form = document.getElementById('login_form');
    login_form.onsubmit = function () {
        return loginPrompt();
    }

    function loginPrompt() {
        if (validationForm('login-user', /^[a-zA-Z0-9_]{6,18}$/ig) && validationpswForm('login-psw', /^[\W\da-zA-Z_]{6,20}$/)) {
            return true;
        } else {
            move(box, "left", 10, 100, function () {
                move(box, "top", 10, 100, function () {
                    move(box, "left", 0, 100, function () {
                        move(box, "top", 0, 100, function () {
                        });
                    });
                });
            });
            logine_text.style.display = "block";
            $("login-user").value = "";
            $("login-psw").value = "";
            return false;
        }
    }
}

//注册验证
const loginr = document.getElementById('loginr');
const registerPrompt_text = document.getElementById('register-prompt-text')
loginr.onclick = function () {
    validationForm('registered-user', /^[a-zA-Z0-9_]{6,18}$/ig);
    validationpswForm('registered-psw1', /^[\W\da-zA-Z_]{6,20}$/);
    validationpswFormT('registered-psw2', "toggleBtn02");
    const register_form = document.getElementById('register_form');
    register_form.onsubmit = function () {
        return registerPrompt();
    }

    function registerPrompt() {
        if (validationForm('registered-user', /^[a-zA-Z0-9_]{6,18}$/ig) && validationpswForm('registered-psw1', /^[\W\da-zA-Z_]{6,20}$/) && validationpswFormT('registered-psw2', "toggleBtn02")) {
            return true;
        } else {
            move(box, "left", 10, 100, function () {
                move(box, "top", 10, 100, function () {
                    move(box, "left", 0, 100, function () {
                        move(box, "top", 0, 100, function () {
                        });
                    });
                });
            });
            registerPrompt_text.style.display = 'block';
            $("registered-user").value = "";
            $("registered-psw1").value = "";
            $("registered-psw2").value = "";
            return false;
        }
    }
}

//聚焦时隐藏红色错误提示信息
$("login-user").onfocus = function () {
    logine_text.style.display = "none";
}
$("login-psw").onfocus = function () {
    logine_text.style.display = "none";
}
$("registered-user").onfocus = function () {
    registerPrompt_text.style.display = "none";
}
$("registered-psw1").onfocus = function () {
    registerPrompt_text.style.display = "none";
}
$("registered-psw2").onfocus = function () {
    registerPrompt_text.style.display = "none";
}