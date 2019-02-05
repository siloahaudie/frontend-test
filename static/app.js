/*
 * counter app
 */

var counter = (function(window) {
  'use strict';

  /***** private variables *****/
  var title = document.querySelector( '#title' );
  var addCounter = document.querySelector( '#addCounter' );
  var counterList = document.querySelector( '#counterList' );
  var emptyList = counterList.querySelector('.empty');
  var totalCount = document.querySelector( '#totalCount' );
  var listItem = '<h5 class="m-0"></h5><div class="btn-group"><button type="button" class="btn btn-increment btn-outline-secondary"><i class="fas fa-plus"></i></button><button type="button" class="btn itemCount btn-outline-secondary" disabled>0</button><button type="button" class="btn btn-decrement btn-outline-secondary"><i class="fas fa-minus"></i></button><button type="button" class="btn btn-delete btn-outline-danger"><i class="fas fa-trash"></i></button></div';

  /***** private methods *****/
  function addToList() { // create a list item
      if ( title.value === '' ) {
          title.classList.add( 'is-invalid' );
          return false;
      }

      atomic('/api/v1/counter', {
          method: 'POST',
          data : {
            title: title.value
          }
      })
      .then(function (response) {
          // console.log(response.data); // xhr.responseText
          var data = response.data[ response.data.length - 1 ]
          var li = dom( 'li', { 'class': 'list-group-item justify-content-between align-items-center fade d-flex show', 'data-id': data.id} );
          li.innerHTML = listItem;
          li.querySelector('h5').textContent = data.title;
          counterList.appendChild( li );

          title.value = ''; // reset the input field
          updateCount();
      })
      .catch(function (error) {
          console.log(error.status);
      });
  };

  function removeFromList( elem ) { // remove a list item
      atomic('/api/v1/counter', {
          method: 'DELETE',
          data : {
              id : elem.getAttribute( 'data-id' )
          }
      })
      .then(function (response) {
          // console.log(response.data); // xhr.responseText
          counterList.removeChild( elem );
          updateCount();
      })
      .catch(function (error) {
          console.log(error.status); // xhr.status
      });
  };

  function updateCounter( elem, action ) { // increment/decrement a counter /api/v1/counter/
      atomic('/api/v1/counter/' + action, {
          method: 'POST',
          data : {
              id : elem.getAttribute( 'data-id' )
          }
      })
      .then(function (response) {
          // console.log(response.data); // xhr.responseText
          var counter = elem.querySelector( '.itemCount' );
          if ( action === 'inc' ) {
              counter.textContent = parseInt(counter.textContent) + 1;
          } else if ( action === 'dec' ) {
              counter.textContent = parseInt(counter.textContent) - 1;
          }
          updateCount();
      })
      .catch(function (error) {
          console.log(error.status); // xhr.status
      });
  };

  function updateCount() {
      var count = 0;
      atomic('/api/v1/counters')
      .then(function (response) {
          // console.log(response.data); // xhr.responseText
          var count = 0;
          if ( response.data.length ) {
              emptyList.setAttribute( 'style', 'display:none' );
              response.data.forEach( function( item ) {
                  count += item.count;
              });
              totalCount.textContent = count;
          } else {
              totalCount.textContent = 0;
              emptyList.setAttribute( 'style', '' );
          }
      })
      .catch(function (error) {
          console.log(error.status); // xhr.status
          console.log(error.statusText); // xhr.statusText
      });
  };

  function renderCounters() {
      atomic('/api/v1/counters')
      .then(function (response) {
          // console.log(response.data); // xhr.responseText
          if ( response.data.length ) {
              response.data.forEach( function( item ) {
                  var li = dom( 'li', { 'class': 'list-group-item justify-content-between align-items-center fade d-flex show', 'data-id': item.id} );
                  li.innerHTML = listItem;
                  li.querySelector('h5').textContent = item.title;
                  li.querySelector('.itemCount').textContent = item.count;
                  counterList.appendChild( li );
              });
          }
          updateCount();
      })
      .catch(function (error) {
          console.log(error.status); // xhr.status
      });
  };

  /***** helper methods *****/
  function dom(name, attrs) {
      var el = document.createElement(name.toString());

      !!attrs && Object.keys(attrs).forEach(function(key) {
        el.setAttribute(key, attrs[key]);
      });

      return el;
  };

  /***** public method *****/
  // main init method
  function init() {
      renderCounters();

      addCounter.addEventListener('click', addToList, false);
      title.addEventListener('change', function() { title.classList.remove( 'is-invalid' ); }, false);

      document.addEventListener('click', function ( e ) {
          // .btn-delete clicked
          if ( e.target.classList.contains( 'btn-delete' ) || e.target.parentNode.classList.contains( 'btn-delete' ) ) {
              if ( e.target.classList.contains( 'fas' ) ) {
                  removeFromList( e.target.parentNode.parentNode.parentNode );
              } else {
                  removeFromList( e.target.parentNode.parentNode );
              }
          }
          // .btn-increment clicked
          else if ( e.target.classList.contains( 'btn-increment' ) || e.target.parentNode.classList.contains( 'btn-increment' ) ) {
              if ( e.target.classList.contains( 'fas' ) ) {
                  updateCounter( e.target.parentNode.parentNode.parentNode, 'inc' );
              } else {
                  updateCounter( e.target.parentNode.parentNode, 'inc' );
              }
          }
          // .btn-decrement clicked
          else if ( e.target.classList.contains( 'btn-decrement' ) || e.target.parentNode.classList.contains( 'btn-decrement' ) ) {
              if ( e.target.classList.contains( 'fas' ) ) {
                  updateCounter( e.target.parentNode.parentNode.parentNode, 'dec' );
              } else {
                  updateCounter( e.target.parentNode.parentNode, 'dec' );
              }
          }
      }, false);
  }

  /***** export public methods *****/
  return {
    init: init
  };
}(window));

window.addEventListener('load', function () {
	counter.init();
}, false);
