const copy = {
    bind(el, { value }) {
        el.$value = value
        el.handler = (e) => {
            if (!el.$value) {
                console.log('无复制内容')
                return
            }

            if (navigator.clipboard) {
                navigator.clipboard.writeText(el.$value);
            } else {
                // 动态创建 textarea 标签
                const textarea = document.createElement('textarea')
                // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
                textarea.readOnly = 'readonly'
                textarea.style.position = 'absolute'
                textarea.style.left = '-9999px'
                // 将要 copy 的值赋给 textarea 标签的 value 属性
                textarea.value = el.$value
                // 将 textarea 插入到 body 中
                document.body.appendChild(textarea)
                // 选中值并复制
                textarea.select()
                const result = document.execCommand('Copy')
            }
        }
        el.addEventListener('click', el.handler)
    },
    componentUpdated(el, { value }) {
        el.$value = value
    },
    unbind(el) {
        el.removeEventListener('lick', el.handler)
    }
}
export default copy