// Set the message according validation status
function setMsg(el, ok, text) {
  el.classList.toggle("text-danger", !ok);
  el.classList.toggle("text-success", ok);
  el.textContent = text;
}

function validation() {
  event.preventDefault();

  // Name: Must not be empty
  const name = document.getElementById("name").value.trim();
  const nameMsg = document.getElementById("nameMsg");
  setMsg(nameMsg, name !== "", name ? "" : "You must enter your name");

  // Phone: Must not be empty and must be in the Australian phone number format
  const phone = document.getElementById("phone").value.trim();
  const phoneMsg = document.getElementById("phoneMsg");
  const auPhone = /^(?:\+61|0)(?:4\d{8}|[2378]\d{8})$/; // Australian phone number regex
  setMsg(
    phoneMsg,
    auPhone.test(phone),
    auPhone.test(phone) ? "" : "Invalid phone number"
  );

  // Email: Must not be empty and must have the @ symbol
  const email = document.getElementById("email").value;
  const emailMsg = document.getElementById("emailMsg");
  const hasAt = email.includes("@"); // Check if email has the @ symbol
  setMsg(emailMsg, hasAt, hasAt ? "" : email + " Invalid email address");

  // Address: Must not be empty
  const address = document.getElementById("address").value;
  const addressMsg = document.getElementById("addressMsg");
  setMsg(
    addressMsg,
    address !== "",
    address ? "" : "You must enter your address"
  );

  // Event type: Must be selected
  // Event details: Must not be empty if "other" is chosen for event type
  const eventType = document.getElementById("eventType").value;
  const eventTypeMsg = document.getElementById("eventTypeMsg");
  const eventDetails = document.getElementById("eventDetails").value.trim();
  const eventDetailsMsg = document.getElementById("eventDetailsMsg");
  if (eventType === "") {
    setMsg(eventTypeMsg, false, "You must select an event type");
    setMsg(eventDetailsMsg, true, "");
  } else if (eventType === "other") {
    setMsg(eventTypeMsg, true, "");
    setMsg(
      eventDetailsMsg,
      eventDetails !== "",
      eventDetails ? "" : "You must include event details"
    );
  } else {
    setMsg(eventTypeMsg, true, "");
    setMsg(eventDetailsMsg, true, "");
  }

  // Event date: Must not be empty and must be a date in the future
  const eventDate = document.getElementById("eventDate").value;
  const eventDateMsg = document.getElementById("eventDateMsg");
  const today = new Date(); // Get the current date
  if (!eventDate) {
    setMsg(eventDateMsg, false, "You must select a date");
  } else {
    const convertedDate = new Date(eventDate);
    setMsg(
      eventDateMsg,
      convertedDate > today,
      convertedDate > today ? "" : "You must select a date in the future"
    );
  }

  // Event style: Must be selected
  // Style details: Must not be empty if "other" is chosen for event style
  const selectedStyle = document.querySelector('input[name="style"]:checked');
  const styleMsg = document.getElementById("styleMsg");
  const styleDetails = document.getElementById("styleDetails").value.trim();
  const styleDetailsMsg = document.getElementById("styleDetailsMsg");
  if (!selectedStyle) {
    setMsg(styleMsg, false, "You must select a style");
    setMsg(styleDetailsMsg, true, "");
  } else if (selectedStyle.value == "other") {
    setMsg(styleMsg, true, "");
    setMsg(
      styleDetailsMsg,
      styleDetails !== "",
      styleDetails ? "" : "You must include style details"
    );
  } else {
    setMsg(styleMsg, true, "");
    setMsg(styleDetailsMsg, true, "");
  }

  // Get the event type selection and message
  const budget = document.getElementById("budget").value;
  const budgetMsg = document.getElementById("budgetMsg");
  setMsg(
    budgetMsg,
    budget !== "",
    budget ? "" : "You must select a budget range"
  );

  // Check if the event type is selected
  if (budget.length == 0) {
    budgetMsg.classList.add("text-danger");
    budgetMsg.textContent = "You must select a budget range";
  } else {
    budgetMsg.classList.remove("text-danger");
    budgetMsg.classList.add("text-success");
    budgetMsg.textContent = "";
  }

  // Reset form if all fields are valid
  let allValid = document.querySelectorAll(".text-danger").length === 0;
  if (allValid) {
    alert("Form submitted successfully!");
    document.getElementById("requestForm").reset();
  }
}
