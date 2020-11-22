const btnTop = (selector) => {
    const header = document.querySelector(selector);
    const headerHeight = header.offsetHeight * 0.5;
    handleScroll(headerHeight);
};

const createBtn = () => {
    const item = document.createElement('a');
    item.href = '#';
    item.classList.add('btn');
    item.classList.add('btn--top');
    item.style.display = 'none';
    item.onclick = item.blur;
    document.body.append(item);
    return item;
};

const handleScroll = (headerHeight) => {
    let btn = createBtn();
    window.addEventListener('scroll', function(){
        if(window.pageYOffset > headerHeight){
            btn.style.display = 'block';
        }
        else{
            btn.style.display = 'none';
        }
    });
};