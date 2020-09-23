(function ($) {
    $(document).ready(function () {

        let movURL = 'https://ebony-palm-titanosaurus.glitch.me/movies'

        const toggleLoad = () => $('.lds-grid').toggleClass('d-none')

        function classToggle() {
            $('#popcorn-guy').addClass('d-none')
            $('.cardTog').removeClass('d-none')
        }

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
                    })
            })
        }

        const pageLoad = () => {
            fetch(movURL)
                .then(res => res.json())
                .then(data => {
                    toggleLoad();
                    console.log(data)
                    for (let element of data) {
                        $('#img-display').append(`<div class="dis-hover"><img id='${element.id}' src="img/theaterentrance.jpg"></div>`)
                    }
                    listener1()
                })
        }
        $('#filter-button').click(() => {
            searchFilter()
        })
        const searchFilter = () => {
            let input = $('#filter-search').val().toLowerCase();
            $('#img-display').children().remove();
            toggleLoad()
            fetch(movURL)
                .then(res => res.json())
                .then(data => {
                    let newData = data.filter(({searchables}) => searchables.includes(input))
                    toggleLoad()
                    for (let element of newData) {
                        $('#img-display').append(`<div class="dis-hover"><img id='${element.id}' src="img/theaterentrance.jpg"></div>`)
                    }
                    listener1()
                })
        }
        $('#update-data').click(()=>{
            let newInfo = {title: $('#add-title').val(), rating: $('#add-rating').val(), description: $('#add-des').val()}
            console.log($('#add-des').val())
            fetch(movURL, {
                method: 'POST',
                headers: {"Content-Type" :"application/json"},
                body: JSON.stringify(newInfo)
            }).then(pageLoad)
        })
        pageLoad();
    })
})(jQuery);
/*Movie displayed in cards
*
* TODO Advertised movies in a carousel
*  TODO carousel advertises the top three rated movies, title of carousel connects user to seeing what is popular
* each card outer border with image metal plating
*
* splash screen when card not chosen/ popcorn guy
*  click on image will create a container with info on top of cards and carousel moves up
*   movie info consists of title, description, movie rating, ranking system, genre, actors,
* actors will be like two or three lead actors
*
*loading screen will be on splash
* get request for page load
*        TODO add a movie as a modal using forms
*         TODO when user adds a movie do a get request for the movie's image from the api/ have a default image in case the movie doesn't have an image in database or in general
*          TODO delete info button on bottom left that deletes from db
*          TODO edit info in movies we need to add an edit anchor in middle
*           TODO book movie button on the bottom right
*            TODO disable attribute on click listeners when loading
*             TODO drag and drop with a clip of film roll
*              TODO trailers display option
*               TODO image with the movie from api
*                TODO ranking system
*                  TODO filters for the movie infos prioritize movie rating
*TODO reveals movie info/ maybe a hover effect?
* */


