(function ($) {
    $(document).ready(function () {

        const movURL = 'https://ebony-palm-titanosaurus.glitch.me/movies'
//load toggle
        const toggleLoad = () => $('.lds-grid').toggleClass('d-none')

//splash screen toggle
        function classToggle() {
            $('#popcorn-guy').addClass('d-none')
            $('.cardTog').removeClass('d-none')
        }

// image to card info listener
        function listener1() {
            $('#img-display img').click(function () {
                fetch(movURL + `/${$(this).attr('id')}`)
                    .then(res => res.json())
                    .then(({title, rating, description, genre, actors}) => {
                        classToggle()
                        $('#title').html(title)
                        $('#rating').html(rating)
                        $('#info').html(description)
                        $('#genre').html(genre)
                        $('#actors').html(actors)
                        $('.card-body').attr('data-serv', $(this).attr('id'))
                        $('#edit-title').val(title);
                        $('#edit-des').val(description)
                        $('#edit-rating').val(rating)
                        for (let g of genre) {
                            $("#editor input[type='checkbox']").each((index, element) => {
                                if (g === $(element).val()) {
                                    $(element).attr('checked', 'checked')
                                }
                            })
                        }
                    })
            })
        }
        function buttonDis (SoN) {
            $('button').attr('disabled', SoN)
        }
// default on page display of images
        const pageLoad = () => {
            buttonDis(true)
            $('#img-display').children().remove();
            fetch(movURL)
                .then(res => res.json())
                .then(data => {
                    buttonDis(false)
                    toggleLoad();
                    console.log(data)
                    for (let element of data) {
                        $('#img-display').append(`<div class="dis-hover"><img id='${element.id}' src="img/theaterentrance.jpg"></div>`)
                    }
                    listener1()
                })
        }

        //filter functionality
        $('#filter-button').click(() => {
            searchFilter()
        })
        const searchFilter = () => {
            let input = $('#filter-search').val().toLowerCase();
            $('#img-display').children().remove();
            buttonDis(true)
            toggleLoad()
            fetch(movURL)
                .then(res => res.json())
                .then(data => {
                    buttonDis(false)
                    let newData = data.filter(({searchables}) => searchables.includes(input))
                    toggleLoad()
                    for (let element of newData) {
                        $('#img-display').append(`<div class="dis-hover"><img id='${element.id}' src="img/theaterentrance.jpg"></div>`)
                    }
                    listener1()
                })
        }
        // function that grabs values of checkboxes
        const checkValue = () => {
            let arr = [];
            $("input[type='checkbox']").each((index, element) => {
                if (element.checked === true) {
                    arr.push($(element).val())
                }
            })
            return arr;
        }

        //add new movie to database
        $('#update-data').click(() => {
            buttonDis(true)
            toggleLoad()
            let newInfo = {
                title: $('#add-title').val(),
                rating: $('#add-rating').val(),
                description: $('#add-des').val(),
                genre: checkValue()
            }
            fetch(movURL, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newInfo)
            }).then(pageLoad)
        })


        $('#delete').click(() => {
            let response = confirm("Would you like to delete this movie?")
            if (response) {
                buttonDis(true)
                let idNum = $(".card-main").attr('data-serv')
                fetch(`${movURL}/${idNum}`, {
                    method: 'DELETE',
                    headers: {"Content-Type": "application/json"}
                }).then(() => {
                    toggleLoad()
                    $('#popcorn-guy').removeClass('d-none')
                    $('.cardTog').addClass('d-none')
                })
                    .then(pageLoad)
            }
        })

        $('#edit-data').click(() => {
            let response = confirm("Would you like to save these changes?")
            if (response) {
                buttonDis(true)
                let newNum = $(".card-main").attr('data-serv')
                console.log(newNum)
                let editedInfo = {
                    title: $('#edit-title').val(),
                    rating: $('#edit-rating').val(),
                    description: $('#edit-des').val(),
                    genre: checkValue()
                }
                fetch(`${movURL}/${newNum}`, {
                    method: 'PUT',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(editedInfo)
                }).then(() => {
                    toggleLoad()
                    $('#popcorn-guy').removeClass('d-none')
                    $('.cardTog').addClass('d-none')
                })
                    .then(pageLoad)
            }
        })



        pageLoad();
    })

})(jQuery);

/*Movie displayed in cards
*
* TODO Advertised movies in a carousel
* TODO carousel advertises the top three rated movies, title of carousel connects user to seeing what is popular
* each card outer border with image metal plating
* splash screen when card not chosen/ popcorn guy
* click on image will create a container with info on top of cards and carousel moves up
* movie info consists of title, description, movie rating, ranking system, genre, actors,
* actors will be like two or three lead actors
* loading screen will be on splash
* get request for page load
* add a movie as a modal using forms
* delete info button on bottom left that deletes from db
* edit info in movies we need to add an edit anchor in middle
* TODO book movie button on the bottom right
* TODO disable attribute on click listeners when loading
* TODO drag and drop with a clip of film roll
* TODO trailers display option
* TODO image with the movie from api
* TODO ranking system
* TODO filters for the movie infos prioritize movie rating
* TODO reveals movie info/ maybe a hover effect?
* TODO when user adds a movie do a get request for the movie's image from the api/ have a default image in case the movie doesn't have an image in database or in general
* */


