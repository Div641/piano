//NEW CARDS CREATE KAR K , DATA LOCAL STORAGE MAI SAVE KRNA HA
//LOCAL STORAGE SE HI CARDS KO SHOW KRNA HAI
//BUTTONS KO HANDLE KRNA HAI
//FILTERS KO HANDLE KRNA HAI



// Load from LocalStorage OR use default 30
let contacts = JSON.parse(localStorage.getItem("contactsData")) || [
  { name: "Fatima Uma", town: "Singapore", booking: "3 times", phone: "82104455", priority: "high" },
  { name: "Rohan Mehta", town: "Mumbai", booking: "6 times", phone: "9820111223", priority: "high" },
  { name: "Emily Carter", town: "London", booking: "4 times", phone: "7700900123", priority: "high" },
  { name: "Arjun Rao", town: "Bengaluru", booking: "5 times", phone: "9845099887", priority: "high" },
  
  // Medium (6)
  { name: "Isha Sharma", town: "Delhi", booking: "2 times", phone: "+91 98731 55221", priority: "medium" },
  { name: "Noah Wilson", town: "Toronto", booking: "3 times", phone: "+1 416 555 2011", priority: "medium" },
  { name: "Liu Wei", town: "Beijing", booking: "1 time", phone: "+86 10 5555 1100", priority: "medium" },
  { name: "Priya Nair", town: "Kochi", booking: "2 times", phone: "+91 98951 11220", priority: "medium" },
  { name: "Lucas Marques", town: "São Paulo", booking: "4 times", phone: "+55 11 95555 2222", priority: "medium" },
  { name: "Olivia Brown", town: "Sydney", booking: "3 times", phone: "+61 400 123 456", priority: "medium" },

  // Low (6)
  { name: "Rahul Verma", town: "Pune", booking: "1 time", phone: "+91 97671 88990", priority: "low" },
  { name: "Mia Rossi", town: "Rome", booking: "1 time", phone: "+39 320 777 4455", priority: "low" },
  { name: "David Lee", town: "Seoul", booking: "1 time", phone: "+82 10-5555-9999", priority: "low" },
  { name: "Nora Jensen", town: "Copenhagen", booking: "2 times", phone: "+45 50 55 66 77", priority: "low" },
  { name: "Kabir Ali", town: "Jaipur", booking: "1 time", phone: "+91 98280 44771", priority: "low" },
  { name: "Emma Stone", town: "Dublin", booking: "1 time", phone: "+353 85 123 4567", priority: "low" },

  // VIP (6)
  { name: "Aarav Malhotra", town: "Dubai", booking: "10 times", phone: "+971 50 555 9090", priority: "vip" },
  { name: "Chloe Martin", town: "Paris", booking: "8 times", phone: "+33 6 12 34 56 78", priority: "vip" },
  { name: "Michael Adams", town: "New York", booking: "11 times", phone: "+1 917 555 9001", priority: "vip" },
  { name: "Hina Suzuki", town: "Osaka", booking: "9 times", phone: "+81 90-9876-5432", priority: "vip" },
  { name: "Yusuf Khan", town: "Doha", booking: "7 times", phone: "+974 5500 1212", priority: "vip" },
  { name: "Ana Pereira", town: "Lisbon", booking: "8 times", phone: "+351 91 234 5678", priority: "vip" },

  // Follow up (6)
  { name: "Neha Gupta", town: "Lucknow", booking: "Pending", phone: "+91 93351 66778", priority: "followup" },
  { name: "Jason Park", town: "Chicago", booking: "Pending", phone: "+1 312 555 2030", priority: "followup" },
  { name: "Sara Ahmed", town: "Cairo", booking: "Pending", phone: "+20 101 555 7766", priority: "followup" },
  { name: "Markus Weber", town: "Berlin", booking: "Pending", phone: "+49 171 222 3344", priority: "followup" },
  { name: "Lara Novak", town: "Prague", booking: "Pending", phone: "+420 777 666 555", priority: "followup" },
  { name: "Aditya Joshi", town: "Nagpur", booking: "Pending", phone: "+91 90210 12345", priority: "followup" }

];

const priorityText = {
  high: "High",
  medium: "Medium",
  low: "Low",
  vip: "VIP",
  followup: "Follow up"
};

let currentPriority = "high";
let filteredContacts = contacts.filter(c => c.priority === currentPriority);
let currentIndex = 0;

// DOM , could have used querySelector too, both the things work anyhow
const nameEl = document.getElementById("name");
const townEl = document.getElementById("town");
const bookingEl = document.getElementById("booking");
const phoneEl = document.getElementById("phone");
const cardEl = document.getElementById("contactCard");
const priorityLabelEl = document.getElementById("priorityLabel");

//left n right of form
const dots = document.querySelectorAll(".priority-dot");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const addBtn = document.getElementById("addBtn");

//form starters
const overlay = document.getElementById("formOverlay");
const saveForm = document.getElementById("saveForm");
const cancelForm = document.getElementById("cancelForm");

//form elements
const inputName = document.getElementById("inputName");
const inputTown = document.getElementById("inputTown");
const inputBooking = document.getElementById("inputBooking");
const inputPhone = document.getElementById("inputPhone");
const inputPriority = document.getElementById("inputPriority");


function updateDotHighlight() {
  dots.forEach(dot => {
    //forEach jo hai vo dots ki har value pr traverse krega , jo current priority se match hoga usko true milega or 
    //vo active ho jayega using toggle and or sab false honge to inactive ho jayenge
    dot.classList.toggle("active", dot.dataset.priority === currentPriority);
  });
}

//card ki visibility handle krne k liye function
//uske inputs ko check kr k hi display krna hai
function renderCard() {
  //agar filtered contacts ki length 0 hai toh no contacts show krna hai 
  if (!filteredContacts.length) {
    nameEl.textContent = "No Contacts";
    townEl.textContent = bookingEl.textContent = phoneEl.textContent = "-";
    priorityLabelEl.textContent = "";
    return;
  }
//length hai toh current index ka contact show krna hai
  const c = filteredContacts[currentIndex];
  nameEl.textContent = c.name;
  townEl.textContent = c.town;
  bookingEl.textContent = c.booking;
  phoneEl.textContent = c.phone;

  priorityLabelEl.textContent = priorityText[c.priority];
  priorityLabelEl.className = `priority-label ${c.priority}`;
}

function nextCard() {
  cardEl.classList.add("slide-down");

  setTimeout(() => {
    // +1 kiya hai next index k liye but usi mai % laga diya kyuki ye agar 
    //jaise 5 cards hai uske baad +1 krne pe out of bound chala jaayega , uski dikkat thik krne ko % length kr diya taaki back to index 0 ho jaaye  
    currentIndex = (currentIndex + 1) % filteredContacts.length;
    renderCard();
    cardEl.classList.remove("slide-down");
  }, 200);
}

function previousCard() {
  cardEl.classList.add("slide-up");

  setTimeout(() => {
    //-1 kiya hai previous index k liye , usi mai + length kr diya taaki negative na ho jaaye
    //% laga diya taaki circular movement ho jaaye
    currentIndex = (currentIndex - 1 + filteredContacts.length) % filteredContacts.length;
    renderCard();
    cardEl.classList.remove("slide-up");
  }, 200);
}

function changePriority(priority) {
  currentPriority = priority;
  //making array for all the elements with required priority using .filter
  filteredContacts = contacts.filter(c => c.priority === currentPriority);
  //filteredContacts naam ka array to ban gaya by default uska index hm 0th index pe fix krenge
  currentIndex = 0;
  updateDotHighlight();
  renderCard();
}

// Events
// .onclick is a way to write eventListeners eg: we can similarly use .mousemove , .dblclick etc
nextBtn.onclick = nextCard;
prevBtn.onclick = previousCard;

dots.forEach(dot => {
  dot.onclick = () => changePriority(dot.dataset.priority);
});

// Add contact popup
addBtn.onclick = () => overlay.style.display = "flex";
cancelForm.onclick = () => overlay.style.display = "none";

//form mai .trim() use kr k aage peeche ki extra sapce hata di  
saveForm.onclick = () => {

    //new contact object create kar rahe form se values le k
  const newContact = {
    name: inputName.value.trim(),
    town: inputTown.value.trim(),
    booking: inputBooking.value.trim(),
    phone: inputPhone.value.trim(),
    priority: inputPriority.value
  };

  //trimed form values ko check kar rahe agar koi bhi empty space hoga toh vo false hota varna according to js these values will be true , hence space aane par alert popup aayega screen pr 
  if (!newContact.name || !newContact.town || !newContact.booking || !newContact.phone) {
    alert("Fill all fields");
    return;
  }

//objects mai push pop all functions are allowed
//new contact ko contacts array mai push kar diya
//local storage mai set kr diya updated contacts array ko
//upar vahi lacalStorage se .getItem kr k load kiya tha na , vo ab updated ho chuka hoga
  contacts.push(newContact);
  localStorage.setItem("contactsData", JSON.stringify(contacts));

  if (newContact.priority === currentPriority) {
    filteredContacts.push(newContact);
    currentIndex = filteredContacts.length - 1;
  }

  renderCard();
  overlay.style.display = "none";

  inputName.value = inputTown.value = inputBooking.value = inputPhone.value = "";
  inputPriority.value = "high";
};

// initial UI load
updateDotHighlight();
renderCard();
