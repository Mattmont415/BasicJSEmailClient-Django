document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  document.querySelector('#compose-form').addEventListener('click', send_email);
 
  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

  //Reaches out to the form from inbox.html where composing email ID is
  document.querySelector('#compose-form').onsubmit = function() {

    let recipient = document.querySelector('#compose-recipient');
    let subject = document.querySelector('#compose-subject');
    let body = docuement.querySelector('#compose-body');

    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
        recipients: recipient.value,
        subject: subject.value,
        body: body.value
      })
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
    });
    load_mailbox('sent')
    return false;
  };
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}