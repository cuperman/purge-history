document.addEventListener('DOMContentLoaded', function() {
  var submitPurge = document.getElementById('submit-purge');

  submitPurge.addEventListener('click', function(ev) {
    ev.preventDefault();

    var inputDomain = document.getElementById('input-domain');
    var domain = inputDomain.value;

    if (domain.match(/([\w-]+\.)*[\w-]+\.[\w]+/)) {
      chrome.history.search({ text: domain, maxResults: 0 }, function(results) {
        var domainMatcher = new RegExp('^https?://([\\w-]+\\.)*' + domain);
        var counter = 0;

        results.forEach(function(result, index, allResults) {
          var url = result.url;
          if (url.match(domainMatcher)) {
            counter++;
            chrome.history.deleteUrl({ url: url });
          }
        });

        document.write('Success: deleted ' + counter + ' URLs');
      });
    } else {
      document.write('Error: ' + domain + ' is not a valid domain');
    }
  });
});
