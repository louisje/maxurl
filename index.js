#!/usr/bin/env node

const maximage = require("./userscript.user.js");

const smallimage = process.argv[process.argv.length - 1];

const largeimage = maximage(smallimage, {
  // If set to false, it will return only the URL if there aren't any special properties
  // Recommended to keep true.
  //
  // The only reason this option exists is as a small hack for a helper userscript used to find new rules,
  //  to check if IMU already supports a rule.
  fill_object: true,

  // Maximum amount of times it should be run.
  // Recommended to be at least 5.
  iterations: 200,

  // Whether or not to store to, and use an internal cache for URLs.
  // Set this to "read" if you want to use the cache without storing results to it.
  use_cache: true,

  // Timeout (in seconds) for cache entries in the URL cache
  urlcache_time: 60 * 60,

  // List of "problems" (such as watermarks or possibly broken image) to exclude.
  //
  // By default, all problems are excluded.
  // You can access the excluded problems through maximage.default_options.exclude_problems
  // By setting it to [], no problems will be excluded.
  //exclude_problems: [],

  // Whether or not to exclude videos
  exclude_videos: false,

  // This will include a "history" of objects found through iterations.
  // Disabling this will only keep the objects found through the last successful iteration.
  include_pastobjs: true,

  // This will try to find the original page for an image, even if it requires extra requests.
  force_page: false,

  // This allows rules that use 3rd-party websites to find larger images
  allow_thirdparty: false,

  // This is useful for implementing a blacklist or whitelist.
  //  If unspecified, it accepts all URLs.
  filter: function (url) {
    return true;
  },

  // Helper function to perform HTTP requests, used for sites like Flickr
  //  The API is expected to be like GM_xmlHTTPRequest's API.
  // An implementation using node's request module can be found in reddit-bot/dourl.js
  do_request: function (options) {
    // options = {
    //   url: "",
    //   method: "GET",
    //   data: "", // for method: "POST"
    //   overrideMimeType: "", // used to decode alternate charsets
    //   headers: {}, // If a header is null or "", don't include that header
    //   onload: function(resp) {
    //     // resp is expected to be XMLHttpRequest-like object, implementing these fields:
    //     //   finalUrl
    //     //   readyState
    //     //   responseText
    //     //   status
    //   }
    // }
  },

  // Callback
  cb: function (result) {
    if (!result) return;

    if (result.length === 1 && result[0].url === smallimage) {
      // No larger image was found
      return;
    }

    for (var i = 0; i < result.length; i++) {
      // Do something with the object
    }
  },
}).map(function (img) {
  return img.url;
});

largeimage.forEach(function (url) {
	console.log(url);
});
