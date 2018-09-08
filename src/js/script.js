$(document).ready(() => {
    let originalURL = "https://jsonplaceholder.typicode.com/photos";
    let queryURL = "https://cors-anywhere.herokuapp.com/" + originalURL
    let currentPage = 23;
    loadData(currentPage);

    function debounce(func, wait=10, immediate=true) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };


    $(window).on('scroll', debounce => {
       let scrollHeight = $(document).height();
      let scrollPosition = $(window).height() + $(window).scrollTop();
        if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
            // when scroll to bottom of the page
            $('.loading').css('display',"block");
            currentPage += 23;    
             loadData(currentPage);
        }
        console.log(scrollHeight)
      
    })

    function loadData(currentpageNumber) {

        $.ajax({
            url: queryURL,
            method: 'get',
            dataType: 'json',
            success: (data) => {
                let gallery= $(".gallery");
                $.each(data, (index, item) => {

                   gallery.append(`<div class="images"><img src="${item.url}"></div>`);
                    if (index == currentpageNumber) {
                        return false;
                    }

                    $('.loading').css('display', 'none');
                });
                console.log(data);
            }
        }).done(() => {
            //$('.loading').hide();

        }).fail(() => {
            console.log("failed")
            $('.loading').hide();
        })
    }

});