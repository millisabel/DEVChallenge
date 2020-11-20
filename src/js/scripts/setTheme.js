const setTheme = (selector, toggleClass) => {
    const btn = document.querySelector(selector);
    btn.addEventListener('click', function(){
        document.body.classList.toggle(toggleClass);
        btn.blur();
    });
};
