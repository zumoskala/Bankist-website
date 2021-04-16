'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function(e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Smooth scroll
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function() {

  const s1coords = section1.getBoundingClientRect();

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  //Smooth scroll - we need to pass in an object
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });

  //Only in modern browsers:
  section1.scrollIntoView({ behavior: 'smooth' });

});

// PAGE NAVIGATION

//Less efficient way
// document.querySelectorAll('.nav__link').forEach(
//   function(el) {
//     el.addEventListener('click', function(e) {
//       e.preventDefault();
//       const id = this.getAttribute('href');
//       document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     });
//   }
// );

//Better way

//Event delegation
// 1. Add event listener to common parent element (e.target mówi gdzie był wywołany event)
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// event delegation - e tells us where click happened
tabsContainer.addEventListener('click', function(e) {
    const clicked = e.target.closest('.operations__tab');

    // ignore clicks where there is no clicked elt - a GUARD CLAUSE
    if (!clicked) return;

    // active tab
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    clicked.classList.add('operations__tab--active');

    // active content area
    tabsContent.forEach(t => t.classList.remove('operations__content--active'));

    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
  }
);

// Menu fade animation

// container on which we will handle events
const nav = document.querySelector('.nav');

const handleHover = function(e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el != link) {
        siblings.forEach(el => {
          if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
      }
    });
  }
};
// Passing "argument" into handler - a workaround of the fact that eventhandler can only take 1 argument
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


// BEFORE REFORMATING TO DRY PRINCIPLE

// nav.addEventListener('mouseover', function(e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//
//     siblings.forEach(el => {
//         if (el != link) {
//           el.style.opacity = 0.5;
//         }
//       }
//     );
//     logo.style.opacity = 0.5;
//   }
// });
//
// nav.addEventListener('mouseout', function(e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//
//     siblings.forEach(el => {
//         if (el != link) {
//           el.style.opacity = 1;
//         }
//       }
//     );
//     logo.style.opacity = 1;
//   }
// });

// STICKY NAVIGATION
//
// // bierzemy coordy sekcji, od której nagłówek ma być sticky
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
//
// window.addEventListener('scroll', function() {
//   console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

///////////////////////////////////////
// Sticky navigation: Intersection Observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

///////////////////////////////////////
// Sticky navigation: Intersection Observer API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries; //same as entries[0] - destructuring
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, //whole viewport
  threshold: 0,
  rootMargin: `-${navHeight}px`, //box of px applied outside of our target element
});

headerObserver.observe(header);
