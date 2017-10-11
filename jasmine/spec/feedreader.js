/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it("have valid URLs", function() {
           for(i = 0; i < allFeeds.length; i++){
             expect(allFeeds[i].url.length).not.toBe(0);
           }
         });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty. */
         it("have valid names", function() {
           for(i = 0; i < allFeeds.length; i++){
             expect(allFeeds[i].name.length).not.toBe(0);
           }
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
      var body = $('body');
      /* A test that ensures the menu element is
       * hidden by default. */
       it("is closed at start", function() {
         expect($('body').hasClass('menu-hidden')).toBe(true);
       });
       /* A test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * has two expectations: does the menu display when
        * clicked, and does it hide when clicked again?
        */
        it("toggles 'menu-hidden' class on body when icon is clicked", function() {
            var trigger = $('.icon-list');
            trigger.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            trigger.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('(async) Initial entries', function() {
      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });

      /* A test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * loadFeed() is async so we use done()
       * to make sure we've got the feed. */
      it("shows at least one .entry within the .feed container", function(done) {
        var entries = $('.entry').length;
        expect(entries > 0).toBe(true);
        done();
      });
    });

    describe('(async) New Feed Selection', function() {
      var entry1;
      var entry2;

      beforeEach(function(done) {
        loadFeed(0, function() {
          entry1 = $('.feed').html();
          loadFeed(1, function() {
            entry2 = $('.feed').html();
            done();
          });
        });
      });

      /* A test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes. */
        it("changes to the appropriate content when a new feed is selected", function(done) {
          expect(entry1).not.toEqual(entry2);
          done();
        });
    });

}());
