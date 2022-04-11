const longpress = {
    bind: function(el, binding, VNode){
        if(typeof binding.value !== 'function'){
            throw 'callback must be a function'
        }
        // 定义变量
        let pressTimer = null;
        let start = (e) => {
            console.log(e.type, Date.now())
            if(e.type === 'click'&&e.button !== 0){
                return
            }
            if(pressTimer === null){
                pressTimer = setTimeout(() => {
                    handler()
                }, 2000)
            }
        }
        let cancel = (e) => {
            console.log(e.type, Date.now())
            if(pressTimer !== null){
                clearTimeout(pressTimer)
                pressTimer = null
            }
        }
        let handler = (e) => {
            console.log(Date.now())
            binding.value(e)
        }
        // 添加事件监听器
        el.addEventListener('mousedown', start)
        el.addEventListener('touchstart', start)
        // 取消计时器
        el.addEventListener('click', cancel)
        el.addEventListener('mouseout', cancel)
        el.addEventListener('touchend', cancel)
        el.addEventListener('touchcancel', cancel)
    },
    componentUpdate(el, { value }){
        el.$value = value
    },
    unbind(el){
        el.removeEventListener('click', el.handler)
    }
}
export default longpress