const lazyload = {
    install(Vue, options){
        const defaultSrc = options.default
        Vue.directive('lazy', {
            bind(el, binding){
                lazyload.init(el, binding.value, defaultSrc)
            },
            inserted(el){
                if(IntersectionObserver){
                    lazyload.observe(el)
                }else{
                    lazyload.listenerScroll(el)
                }
            }
        })
    },
    // 初始化
    init(el, val, def){
        el.setAttribute('data-src', val)
        el.setAttribute('src', def)
    },
    observe(el){
        var io = new IntersectionObserver((entries) => {
            const realSrc = el.dataset.src
            if (entries[0].isIntersecting) {
                if (realSrc) {
                    el.src = realSrc
                    el.removeAttribute('data-src')
                }
            }
        })
        io.observe(el)
    },
    listenerScroll(el){
        const handler = LazyLoad.throttle(LazyLoad.load, 300)
        LazyLoad.load(el)
        window.addEventListener('scroll', () => {
            handler(el)
        })
    },
    // 加载真实图片
    load(el) {
        const windowHeight = document.documentElement.clientHeight
        const elTop = el.getBoundingClientRect().top
        const elBtm = el.getBoundingClientRect().bottom
        const realSrc = el.dataset.src
        if (elTop - windowHeight < 0 && elBtm > 0) {
            if (realSrc) {
                el.src = realSrc
                el.removeAttribute('data-src')
            }
        }
    },
    throttle(fn, delay, immediate){
        let timer, callNow = immediate;
        return function(){
            if(callNow){
                fn.apply(this, arguments)
                callNow = false
            }
            if(!timer){
                timer = setTimeout(() => {
                    fn.apply(this, arguments)
                    timer = null
                }, delay)
            }
        }
    }
}
export default lazyload