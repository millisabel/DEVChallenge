
function setSlider(){
    const index = document.querySelector('.control__index');
    const lengthSlider = document.querySelector('.control__mark');
    const slide = document.querySelectorAll('.glide__slide');
    const btnPrev = document.querySelector('.btn--control-prev');
    const btnNext = document.querySelector('.btn--control-next');

    const glide =  new Glide('.glide', {
        // autoplay: 2000,
        rewind: false,
        perView: 1,
        gap: 20,
        peek: {
            before: 0,
            after: 680,
        },

        breakpoints: {
            1100: {
                perView: 1,
                peek: {
                    before: 0,
                    after: 0,
                },
            }
        }


    }).mount();

    glide.on('move', function() {
        index.innerText = glide.index + 1;
        disableBtn();
    });

    function disableBtn(){
        if(!glide.index){
            btnPrev.classList.add('disable');
        }
        else{
            if(btnPrev.classList.contains('disable')){
                btnPrev.classList.remove('disable');
            }
        }

        if(glide.index === (slide.length-1)){
            btnNext.classList.add('disable');
        }
        else{
            if(btnNext.classList.contains('disable')){
                btnNext.classList.remove('disable');
            }
        }
    }

    index.innerText = glide.index + 1;
    lengthSlider.innerText = slide.length;
    disableBtn();
}