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
            $('.click-img img, #num0, #num1, #num2').click(function () {
                fetch(movURL + `/${$(this).attr('data-serv')}`)
                    .then(res => res.json())
                    .then(({title, rating, ranking, description, genre, actors, img, backdrop}) => {
                        classToggle()
                        $('#title').html(title)
                        $('#rating').html(rating)
                        $('#info').html(description)
                        $('#genre').html(`<span class="mx-2">${genre.join("</span><span class='mx-2'>")}</span>`)
                        $('#actors').html(actors)
                        $('#rank').html(`Movie Rating: ${ranking}`)
                        $('.card-main').attr('data-num', $(this).attr('data-serv')).attr('data-back', backdrop)
                        $('#edit-title').val(title)
                        $('#edit-des').val(description)
                        $('#edit-rating').val(rating)
                        $('#edit-ranking').val(ranking)
                        $('#cardPoster').attr('src', img)
                        //console.log(genre.length)
                        let allCheckBoxes = $(".checkBoxes")
                        //console.log(allCheckBoxes)
                        for (let i = 0; i < allCheckBoxes.length; i++) {
                            allCheckBoxes[i].checked = false
                        }
                        for (let i = 0; i <= genre.length-1; i++) {
                            for (let j = 0; j <= allCheckBoxes.length-1; j++) {
                                if (genre[i] === allCheckBoxes[j].defaultValue) {
                                    allCheckBoxes[j].checked = true
                                }
                            }
                        }
                        document.getElementById('des-pane').scrollIntoView()
                    })
            })
        }

        function buttonDis(SoN) {
            $('button').attr('disabled', SoN)
        }

        // default on page display of images
        const pageLoad = () => {
            buttonDis(true)
            $('#img-display').children().remove();
            fetch(movURL)
                .then(res => res.json())
                .then(data => {
                    toggleLoad();
                    buttonDis(false)
                    $('#add-title').val("")
                    console.log(data)
                    let allCheckBoxes = $(".checkBoxes2")
                    for (let i = 0; i < allCheckBoxes.length; i++) {
                        allCheckBoxes[i].checked = false
                    }
                    let object = data.sort((a, b) => b.ranking - a.ranking)
                    $('#carousel-display').removeClass('d-none')
                    for (let i = 0; i <= 2; i++) {
                        $(`#num${i}`).attr('src', object[i].backdrop).attr('data-serv', object[i].id)
                        $(`#${i}`).html(object[i].title)
                    }
                    for (let element of data) {
                        $('#img-display').append(`<div class="dis-hover"><img data-serv='${element.id}' src=${element.img} alt="${element.title}"></div>`)
                    }
                    listener1()
                })
        }

        //filter functionality
        $('#filter-button').click(() => {
            $('.overallPuppy').addClass('d-none')
            $('#noTitles').addClass('d-none')
            let input = $('#filter-search').val().toLowerCase();
            $('#img-display').children().remove();
            buttonDis(true)
            toggleLoad()
            fetch(movURL)
                .then(res => res.json())
                .then(data => {
                    buttonDis(false)
                    let newData = data.filter(({title, description, genre}) => title.toLowerCase().includes(input) || description.toLowerCase().includes(input) || genre.join(" ").toLowerCase().includes(input))
                    if (newData.length === 0) {
                        $('.cardTog').addClass('d-none')
                        $('.overallPuppy').removeClass('d-none')
                        $('#noTitles').removeClass('d-none')
                        $('#popcorn-guy').hide()
                    }
                    toggleLoad()
                    for (let element of newData) {
                        $('#img-display').append(`<div class="dis-hover"><img data-serv='${element.id}' src="${element.img}"></div>`)
                    }
                    listener1()
                })
        })

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

        $('#update-data').click(() => {
            $('.overallPuppy').addClass('d-none')
            $('#noTitles').addClass('d-none')
            $('#popcorn-guy').show()
            toggleLoad()
            if ($('#add-title').val() === "") {
                alert('Please Enter a valid movie title')
                toggleLoad()
            } else {
                fetch(`https://api.themoviedb.org/3/search/movie?api_key=8176c068ae709bb1b0760fbd4fc2800c&query=${$('#add-title').val()}`)
                    .then(data => data.json())
                    .catch(error => console.log("Here's an error"))
                    .then((data) => {
                        if (data.total_results === 0) {
                            $('.overallPuppy').removeClass('d-none')
                            $('#noTitles').removeClass('d-none')
                            $('#popcorn-guy').hide()
                            toggleLoad()
                        } else {
                            function descriptionChoice () {
                                if ($('#add-des').val() === ""){
                                    return data.results[0].overview
                                } else{
                                    return $('#add-des').val()
                                }
                            }
                            let newInfo = {
                                title: $('#add-title').val(),
                                rating: $('#add-rating').val(),
                                ranking: $('#add-ranking').val(),
                                description: descriptionChoice(),
                                genre: checkValue(),
                                img: `https://image.tmdb.org/t/p/original${data.results[0].poster_path}`,
                                backdrop: `https://image.tmdb.org/t/p/original${data.results[0].backdrop_path}`
                            }
                            fetch(movURL, {
                                method: 'POST',
                                headers: {"Content-Type": "application/json"},
                                body: JSON.stringify(newInfo)
                            }).then(pageLoad)
                        }
                    })
            }

        })


        $('#delete').click(() => {
            let response = confirm("Would you like to delete this movie?")
            if (response) {
                buttonDis(true)
                let idNum = $(".card-main").attr('data-num')
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
                let newNum = $(".card-main").attr('data-num')
                console.log(newNum)
                let editedInfo = {
                    title: $('#edit-title').val(),
                    rating: $('#edit-rating').val(),
                    ranking: $('#edit-ranking').val(),
                    description: $('#edit-des').val(),
                    genre: checkValue(),
                    img: $('#cardPoster').attr('src'),
                    backdrop: $('.card-main').attr('data-back')
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
* Advertised movies in a carousel
* carousel advertises the top three rated movies, title of carousel connects user to seeing what is popular
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
* book movie button on the bottom right
* disable attribute on click listeners when loading
* image with the movie from api
* when user adds a movie do a get request for the movie's image from the api/ have a default image in case the movie doesn't have an image in database or in general
*make Modals pretty
* add catch for no return search
* clear the add movie Modal after each use
* ranking system
* * TODO play with display
* //TODO FUTURE UPDATES
TODO visual ranking system
* TODO filters for the movie infos prioritize movie rating
* TODO drag and drop with a clip of film roll
* TODO trailers display option
*  TODO image selector for new movies added to make sure correct poster is linked with the new movie
*   TODO update image alts
* */
