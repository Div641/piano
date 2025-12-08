const users = [
    {
        name :"Amisha Rathore",
        pic:"https://plus.unsplash.com/premium_photo-1673038752634-46e014f0f353?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
        bio:"silent chaos in a loud world | not for everyone",
    },
    {
        name: "Aarav Singh",
        pic: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
        bio: "building dreams one bug at a time 💻",
    },
    {
        name: "Riya Mehta",
        pic: "https://plus.unsplash.com/premium_photo-1729688320678-45bf6744754b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8",
        bio: "chai, books & late-night thoughts ✨",
    },
    {
        name: "Kabir Sharma",
        pic: "https://images.unsplash.com/photo-1480429370139-e0132c086e2a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fHww",
        bio: "in search of good music & better conversations 🎧",
    },
    {
        name: "Neha Gupta",
        pic: "https://plus.unsplash.com/premium_photo-1683121850784-a6bdf87c6150?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI5fHx8ZW58MHx8fHx8",
        bio: "smile first, panic later :)",
    },
    {
        name: "Yuvraj Chauhan",
        pic: "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFufGVufDB8fDB8fHww",
        bio: "work in progress — literally",
    },
    {
        name: "Saanvi Verma",
        pic: "https://plus.unsplash.com/premium_photo-1689371958569-9591167a8db8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM0fHx8ZW58MHx8fHx8",
        bio: "moon child 🌙 finding magic in small things",
    },
    {
        name: "Dev Patel",
        pic: "https://images.unsplash.com/photo-1581382575275-97901c2635b7?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8fDB8fHww",
        bio: "sarcasm is my love language 😌",
    }
];

const container = document.querySelector(".cards-container");
const input = document.querySelector(".inp");

// ------------------ DISPLAY USERS -------------------
function showUsers(arr) {
    container.innerHTML = ""; // clear old cards

    arr.forEach(user => {
        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.className = "bg-img";
        img.src = user.pic;

        const layer = document.createElement("div");
        layer.className = "blurred-layers";
        layer.style.backgroundImage = `url(${user.pic})`;

        const content = document.createElement("div");
        content.className = "content";

        const h3 = document.createElement("h3");
        h3.textContent = user.name;

        const p = document.createElement("p");
        p.textContent = user.bio;

        content.appendChild(h3);
        content.appendChild(p);
        card.appendChild(img);
        card.appendChild(layer);
        card.appendChild(content);

        // container.appendChild(card);

        
        container.appendChild(card);
    });
}

// Initial Load
showUsers(users);

//------------------- FILTER USERS -------------------
input.addEventListener("input", function() {
    // let newU = users.filter(user => {
        // return user.name.startsWith(input.value);  REMOVED THIS LINE BECAUSE YE DIRECT ANS DE RAHA THA AND startsWith is CASE-SENSITIVE
        
        const query = input.value.toLowerCase().trim();

        const newU = users.filter(user => 
            user.name.toLowerCase().startsWith(query) 
    );

    // document.querySelector(".cards-container").innerHTML = "";
    showUsers(newU);
});