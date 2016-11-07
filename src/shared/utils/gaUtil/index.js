
export default class GaUtil {

  static init() {
    /*eslint-disable */
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-75576478-1', 'auto');
    ga('send', 'pageview');
    /*eslint-enable */
  }

  static sendEvent(eventCategory, eventAction, eventLabel, eventValue) {
    /*eslint-disable */
    ga('send', 'event', eventCategory, eventAction, eventLabel, eventValue);
    /*eslint-enable */
  }
}
