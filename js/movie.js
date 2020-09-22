(function ($) {
    $(document).ready(function () {

        let movURL = 'https://ebony-palm-titanosaurus.glitch.me/movies'

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
                        $('#description').html(description)
                        $('#genre').html(genre)
                        $('#actors').html(actors)

                    })
            })
        }

        fetch(movURL)
            .then(res => res.json())
            .then(data => {
                for (let element of data) {
                    $('#img-display').append(`<div class="dis-hover"><img id='${element.id}' src="img/theaterentrance.jpg"></div>`)
                }
                listener1()
            })


    })
})(jQuery);
/*Movie displayed in cards
*
* TODO Advertised movies in a carousel
*  TODO carousel advertises the top three rated movies, title of carousel connects user to seeing what is popular
* each card outer border with image metal plating
*  TODO image with the movie from api
*  TODO splash screen when card not chosen/ popcorn guy
*  TODO click on image will create a container with info on top of cards and carousel moves up
*  TODO movie info consists of title, description, movie rating, ranking system, genre, actors,
*   TODO ranking system
*    TODO actors will be like two or three lead actors
*     TODO filters for the movie infos prioritize movie rating
*      TODO loading screen will be on splash
*       TODO get request for page load
*        TODO add a movie as a modal using forms
*         TODO when user adds a movie do a get request for the movie's image from the api/ have a default image in case the movie doesn't have an image in database or in general
*          TODO delete info button on bottom left that deletes from db
*          TODO edit info in movies we need to add an edit anchor in middle
*           TODO book movie button on the bottom right
*            TODO disable attribute on click listeners when loading
*             TODO drag and drop with a clip of film roll
*              TODO trailers display option
*TODO reveals movie info/ maybe a hover effect?
* */


