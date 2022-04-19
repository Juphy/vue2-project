const debounce = {
    inserted: function(el, binding){
        let eventName = binding.arg
        let timer;
        el.addEventListener(eventName, () => {
            if(timer) clearTimeout(timer)
            timer = setTimeout(() => {
                binding.value()
            }, 1000)
        })
    }
}
export default debounce