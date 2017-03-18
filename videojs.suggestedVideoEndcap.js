/**
 * Video.js Suggested Video Endcap
 * Created by Justin McCraw for New York Media LLC
 * License information: https://github.com/jmccraw/videojs-suggestedVideoEndcap/blob/master/LICENSE
 * Plugin details: https://github.com/jmccraw/videojs-suggestedVideoEndcap
 */

(function (videojs) {
  'use strict';
  
  videojs.plugin('suggestedVideoEndcap', function (opts, callback) {
    opts = opts || {
      header: 'Похожие видео',
      suggestions: [
        {
          url: '',
          image: '',
          alt: '',
          target: '_self'
        }
      ]
    };
    var player = this;

    if (!player.suggestions) {
      player.suggestions = {
        el: null,
        suggestions: []
      }
    }

    /**
     * Generate the DOM elements for the suggested video endcap content
     * @type {function}
     */
    function constructSuggestedVideoEndcapContent() {

      var sugs = opts.suggestions;

      var block = document.createElement('aside');
      block.className = 'vjs-suggested-video-endcap';

      var sub_block = document.createElement('div');
      sub_block.className = 'vjs-suggested-video-endcap-container';

      sugs.slice(0, 6).forEach(function (suggestion) {
        var a, img, title
        //a tag
        a = document.createElement('a');
        a.className = 'vjs-suggested-video-endcap-link';
        a.title = suggestion.title;
        a.style.backgroundImage = "url(" + suggestion.image + ")";
        if (callback && typeof callback === 'function') {
          a.onclick = function(){
            callback(suggestion)
          }
        } else {
          a.target = suggestion.target || '_self';
          a.href = suggestion.url;
        }
        //img tag
        img = document.createElement('img');
        img.className = 'vjs-suggested-video-endcap-img';
        img.src = "http://198.199.124.81/img/notphoto.jpg";
        img.alt = suggestion.alt || suggestion.title;
        //title tag
        title = document.createElement('div');
        title.className = "vjs-suggested-title_block";
        title.innerHTML = suggestion.title;

        a.appendChild(img);
        a.appendChild(title);
        sub_block.appendChild(a);
      })
      block.appendChild(sub_block);
      if (player.suggestions.el) player.el().removeChild(player.suggestions.el)
      player.suggestions.el = block;
      player.el().appendChild(block);
    }

    // attach VideoJS event handlers
    player.on('ended', function () {
      player.suggestions.el.classList.add('is-active');
    }).on('play', function () {
      player.suggestions.el.classList.remove('is-active');
    }).on('showsuggestions', function () {
        player.suggestions.el.classList.add('is-active');
    }).on('hidesuggestions', function () {
        player.suggestions.el.classList.remove('is-active');
    });

    player.ready(function () {
      constructSuggestedVideoEndcapContent();
    });


  });
}(window.videojs));
