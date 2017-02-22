
function scheduleTrigger() {
var builder = ScriptApp.newTrigger("createAndSendDocument").forDocument('1DIa59PP8e6yG-0MWJLTmVv1KjEc2rlvUk_AYJZP-Ba8').onOpen();
builder.create();
}

/*function BuildUI() {
  //create the application itself
  var app = UiApp.createApplication();
  app.setTitle("Journal Trigger");

  //create panels and add them to the UI
  var panel = app.createVerticalPanel();

  //create a submit button
  var button = app.createButton('Click');

  //add the button to the panel
  panel.add(button);

  var handler = app.createServerHandler("createAndSendDocument");
  button.addClickHandler(handler);
  handler.addCallbackElement(panel); 
  
  //add the panel to the application
  app.add(panel);
  
  var doc = DocumentApp.getActive();
  doc.show(app);
}
*/


function createAndSendDocument() {
  // Create a new Google Doc with the name structured based upon date.
  var date = Utilities.formatDate(new Date(), "GMT-5", "yyyyMMdd");
  var doc = DocumentApp.create(date + " Personal Log");

  // Access the body of the document, then add paragraphs.
  doc.getBody().appendParagraph(date + " Personal Log");
  doc.getBody().appendParagraph('This is the journal of Michael P. Johnson Jr.');
  doc.getBody().appendParagraph('');


// Get Weather and Parse it.
  var url = 'http://api.wunderground.com/api/58b235c28b602b1e/conditions/q/pws:KMENOBLE2.json';
  var response = UrlFetchApp.fetch(url);
  
  var contentText = response.getContentText();
  var conditions = JSON.parse(contentText);
  
  var temp_f = conditions.current_observation.temp_f;
  var wind_string = conditions.current_observation.wind_string;
  var weather = conditions.current_observation.weather;
  var observation_time = conditions.current_observation.observation_time;
  var station_id = conditions.current_observation.station_id;
  var history_url = conditions.current_observation.history_url;
  
  var url = 'http://api.wunderground.com/api/58b235c28b602b1e/forecast/q/pws:KMENOBLE2.json';
 
//Inserting the Weather into the document. 
  doc.getBody().appendParagraph('Current Weather: ');
  doc.getBody().appendParagraph(weather + ', ' + temp_f + 'ºF, ' + 'Wind: ' + wind_string);
  doc.getBody().appendParagraph(observation_time);
  doc.getBody().appendParagraph('Station ID: ' +  station_id);
  doc.getBody().appendParagraph(history_url);

// Some formating in the document. 
  doc.getBody().appendParagraph('');
  doc.getBody().appendHorizontalRule();
  doc.getBody().appendParagraph('');

// Inserting ISO time into the document.
  var time = Utilities.formatDate(new Date(), 'GMT-5', 'yyyy-MM-dd\'T\'HH:mm:ss\'-5\'');
  doc.getBody().appendParagraph('Time: ' + time);
  doc.getBody().appendParagraph('');
  
// Some formating in the document. 
  doc.getBody().appendHorizontalRule();
  doc.getBody().appendParagraph('');

  // Get the URL of the document.
  var url = doc.getUrl();

  // Get the email address of the active user - that's you.
  var email = Session.getActiveUser().getEmail();

  // Get the name of the document to use as an email subject line.
  var subject = doc.getName();

  // Append a new string to the "url" variable to use as an email body.
  var body = 'Link to your doc: ' + url;

  // Send yourself an email with a link to the document.
  GmailApp.sendEmail(email, subject, body);
}
  