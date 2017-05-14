new Vue({

  // We want to target the div with an id of 'quiz-edit'
  el: '#quiz-edit',

  // Here we can register any values or collections that hold data
  // for the application
  data: {
    quiz: {
      title: '',
      description: '',
      prompt: 'Enter a place.',
      question: 'Which place is this?',
      answer: 'The answer is {{title}}.',
      initialZoom: 17,
      minZoomForPoints:4,
      mapTypeId: 'satellite',
      autocomplete: [],
      mapStyles: [{featureType:"all",elementType:"labels",stylers:[{visibility:"off"}]}],
      places: []
    },
    place: { title: '', lat: 0, long: 0 },
    importField: ''
  },

  computed: {
    asJSON: function () {
      return JSON.stringify(this.quiz, null, 2)
    }
  },

  // Anything within the ready function will run when the application loads
  ready: function() {},

  // Methods we want to use in our application are registered here
  methods: {
    addPlace: function () {
      this.quiz.places.push(this.place)
      this.quiz.autocomplete.push(this.place.title)
      this.place = { title: '', lat: 0, long: 0 }
    },
    removePlace: function (pl) {
      let i = this.quiz.autocomplete.indexOf(pl.title)
      this.quiz.autocomplete.splice(i, 1)
      let j = this.quiz.places.indexOf(pl)
      this.quiz.places.splice(j, 1)
    },
    toggleMapTypeId: function () {
      if (this.quiz.mapTypeId === 'satellite') {
        this.quiz.mapTypeId = 'roadmap'
        this.quiz.mapStyles = [{featureType:"all",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"labels",stylers:[{visibility:"on"}]},{featureType:"administrative.country",elementType:"geometry.stroke",stylers:[{weight:3}]}]
      } else {
        this.quiz.mapTypeId = 'satellite'
        this.quiz.mapStyles = [{featureType:"all",elementType:"labels",stylers:[{visibility:"off"}]}]
      }
    },
    importJSON: function () {
      if (this.importField !== '') {
        this.quiz = JSON.parse(this.importField)
      }
    }
  }
});