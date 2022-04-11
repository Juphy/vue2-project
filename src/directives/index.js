import copy from './copy'
import longpress from './longpress'
import debounce from './debounce'
import emoji from './emoji'
import lazyload from './lazyload'
import draggable from './draggable'
import watermarker from './watermark'
import permission from './permission'

const directives = {
    copy,
    longpress,
    debounce,
    emoji,
    lazyload,
    draggable,
    watermarker
}

export default{
    install(Vue){
        Object.keys(directives).forEach(key => {
            Vue.directive(key, directives[key])
        })
    }
}