document.addEventListener('DOMContentLoaded', function() {
  var submitPurge = document.getElementById('submit-purge');
  var inputDomain = document.getElementById('input-domain');
  var inputSince  = document.getElementById('input-since');

  submitPurge.addEventListener('click', function(ev) {
    ev.preventDefault();

    var domain = inputDomain.value;
    var sinceString = inputSince.value;

    var sinceDate = Date.parse(sinceString);
    var domainMatcher = new RegExp('([\\w-]+\\.)*[\\w-]+\\.[\\w]+');

    if (!domain.match(domainMatcher)) {
      document.write('Error: \'' + domain + '\' is not a valid domain');
      return false;
    }

    if (isNaN(sinceDate)) {
      document.write('Error: \'' + sinceString + '\' is not a valid date');
      return false;
    }

    chrome.history.search({ text: domain, startTime: sinceDate, maxResults: 0 }, function(results) {
      var urlMatcher = new RegExp('^https?://([\\w-]+\\.)*' + domain);
      var counter = 0;

      results.forEach(function(result, index, allResults) {
        var url = result.url;
        if (url.match(urlMatcher)) {
          counter++;
          chrome.history.deleteUrl({ url: url });
        }
      });

      document.write('Success: deleted ' + counter + ' URLs');
    });
  });
});
