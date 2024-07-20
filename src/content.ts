// SETTINGS BUTTON

// Define the style object
const style: Partial<CSSStyleDeclaration> = {
  alignItems: "center",
  backgroundImage: "linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB)",
  border: "0",
  borderRadius: "8px",
  boxShadow: "rgba(151, 65, 252, 0.2) 0 15px 30px -5pageXOffset",
  boxSizing: "border-boxpageXOffset",
  // color: "#FFFFFFpageXOffset",
  display: "flexpageXOffset",
  fontFamily: "Phantomsans, sans-serifpageXOffset",
  fontSize: "20pageXOffset",
  justifyContent: "centerpageXOffset",
  lineHeight: "1empageXOffset",
  maxWidth: "100%pageXOffset",
  minWidth: "140pageXOffset",
  padding: "19px 24pageXOffset",
  textDecoration: "nonepageXOffset",
  userSelect: "nonepageXOffset",
  touchAction: "manipulationpageXOffset",
  whiteSpace: "nowrappageXOffset",
  cursor: "pointerpageXOffset",
  color: "#f5fffb",
  backgroundColor: "blue",
  zIndex: "10",
  position: "fixed",
  right: "2rem",
  top: "1rem",
  height: "4rem",
  width: "13rem",
  fontWeight: "500",
};

function handleClick() {
  addSkillAddPopUp();
}

// Create the button element
let settingsButton = document.createElement("button");
settingsButton.style.top = "10px";
settingsButton.style.right = "10px";
settingsButton.style.zIndex = "10";
settingsButton.id = "filtersSettingsButton";
// Append the image to the button
// settingsButton.appendChild(img);
settingsButton.textContent = "Settings ⚙️";
// Add the click event listener to the button
settingsButton.onclick = handleClick;
settingsButton.style.fontSize = "1.7rem";
// Append the button to the body
document.body.appendChild(settingsButton);

// --------------------------------------------------------------------------------

// FILTER BUTTON

// Create the button element
let button = document.createElement("button");

// Assign ID, class, and style
button.id = "myButton";
button.className = "top-right-button";
button.textContent = "Filter";

// Apply the styles to the button
for (const property in style) {
  if (style.hasOwnProperty(property)) {
    button.style[property as any] = style[property]!;
    settingsButton.style[property as any] = style[property]!;
  }
}

button.style.right = "160px";

button.style.fontSize = "1.7rem";
// Add the button to the DOM
document.body.appendChild(button);

const documentButton = document.getElementById("myButton");
console.log({ documentButton });

documentButton?.addEventListener("click", () => {
  const posts = document.getElementsByClassName("artdeco-card");

  getData("filters", (filters: string[]) => {
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i] as HTMLElement;
      const text = (post.textContent || "")?.toLocaleLowerCase();
      const filterMatchFound = filters.some((filter) => {
        return text.includes(filter);
      });
      if (!filterMatchFound) {
        post.style.display = "none";
        console.log("Not a hiring post");
      }
    }
  });
});

const removeEffects = () => {
  const documentButton = document.getElementById("myButton");
  const filtersSettingsButton = document.getElementById(
    "filtersSettingsButton"
  );
  if (documentButton) {
    documentButton.style.display = "none";
  }
  if (filtersSettingsButton) {
    filtersSettingsButton.style.display = "none";
  }
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "cleanup") {
    removeEffects();
  }
});

// Data ( Filter ) save functions

function saveData(key: string, value: string[]) {
  chrome.storage.local.set({ [key]: value }, () => {
    console.log(`Data saved: ${key} = ${value}`);
  });
}

// Retrieve data from chrome.storage.local
async function getData(key: string, callback: any) {
  chrome.storage.local.get([key], (result: any) => {
    callback(result[key]);
  });
}

// Example usage
// saveData("filters", ["hiring", "opportunity", "opportunities"]);

// Adding the pop up for taking keywords from user

const addSkillAddPopUp = async () => {
  let filters: string[] = [];
  getData("filters", (value: string[]) => {
    filters = value;
    let index = 0;
    filters.forEach((filter, index) => {
      addSkill(filter, String(index));
    });
  });

  // Create the overlay div for backdrop effect
  const overlay = document.createElement("div");
  overlay.id = "overlay";

  // Create the container div for the skill tagger
  const skillTagger = document.createElement("div");
  skillTagger.classList.add("skill-tagger");

  // Create the input field for adding new skills
  const skillInput = document.createElement("input");
  skillInput.type = "text";
  skillInput.id = "skill-input";
  skillInput.placeholder = "Enter posts filter keywords";

  // Create the div to display added skills
  const skillsContainer = document.createElement("div");
  skillsContainer.id = "skills-container";
  skillsContainer.classList.add("skills-container");

  // Create the Remove All button
  const removeAllButton = document.createElement("button");
  removeAllButton.id = "remove-all";
  removeAllButton.textContent = "Remove All";

  // Create the Save button
  const saveButton = document.createElement("button");
  saveButton.id = "save";
  saveButton.textContent = "Save";

  // Create a container for buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  buttonContainer.appendChild(removeAllButton);
  buttonContainer.appendChild(saveButton);

  // Append the input field, skills container, and button container to the skill tagger
  skillTagger.appendChild(skillInput);
  skillTagger.appendChild(skillsContainer);
  skillTagger.appendChild(buttonContainer);

  // Create a wrapper div to contain both the overlay and the skill tagger
  const wrapper = document.createElement("div");
  wrapper.id = "wrapper";
  wrapper.appendChild(overlay);
  wrapper.appendChild(skillTagger);

  // Append the wrapper div to the body
  document.body.appendChild(wrapper);

  // Add styles using JavaScript
  const style = document.createElement("style");
  style.textContent = `
      #wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: none;
          justify-content: center;
          align-items: center;
          z-index: 1000;
      }

      #overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
      }
      
      .skill-tagger {
          z-index: 1000;
          display: flex;
          flex-direction: column;
          padding: 10px;
          border-radius: 5px;
          max-width: 500px;
          background-color: #fff;
          width: 50vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: around;
          padding: 10px;
          min-height: 40vh;
          background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);
      }
      
      #skill-input {
          border-radius: 6px;
          padding: 13px;
          outline: none;
          margin-bottom: 10px;
          width: 97% !important;
          background-color: transparent;
          color: white;
          font-size: 16px;
          border: 1px solid #b6b8b4;
          box-shadow: none !important;
      }

      input:focus{
        border: 1px solid #b6b8b4 !important;
        outline: none !important;
        box-shadow: none !important;
      }

        input::placeholder {
          color: white !important;
          opacity: 1; 
        }
      #skills-container {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          padding: 5px;
          border-top: 1px solid #ccc;
          border-radius: 3px;
          background-color: #fff;
          background-color: transparent;
          margin-bottom: auto;
          padding-top: 10px;
      }
      
      .skill-tag {
          background-color: #e0e0e0;
          border-radius: 3px;
          padding: 14px 12px;
          display: flex;
          align-items: center;
          justify-content: around;
          gap: 5px;
          height: 25px;
          background-color: transparent;
          color: white;
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 5px;
      }
      
      .remove-skill {
          margin-left: 2px;
          cursor: pointer;
      }

      .button-container{
        width: 100%;
        display:flex;
        align-items-center;
        justify-content: space-between;
      }

      #remove-all {
          font-size: 15px;
          padding: 8px 13px;
          background-color: rgb(22, 23, 23, 0.6);
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
      }

      #save {
          font-size: 15px;
          padding: 8px 13px;
          background-color: rgb(22, 23, 23, 0.6);
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
      }
  `;
  document.head.appendChild(style);

  // Function to add a new skill
  function addSkill(skill: string, index: string) {
    const skillTag = document.createElement("div");
    skillTag.classList.add("skill-tag");
    skillTag.textContent = skill;

    const removeButton = document.createElement("span");
    removeButton.textContent = "×";
    removeButton.setAttribute("filter_number", index);
    removeButton.classList.add("remove-skill");

    skillTag.appendChild(removeButton);
    skillsContainer.appendChild(skillTag);
  }

  // Event listener for adding new skills
  skillInput.setAttribute("autocomplete", "off");
  skillInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const skill = skillInput.value.trim();
      if (skill) {
        filters.push(skill);
        addSkill(skill, String(filters.length));
        skillInput.value = "";
        console.log({ filters });
      }
    }
  });

  // Event listener for removing skills
  skillsContainer.addEventListener("click", (event: any) => {
    if (event.target.classList.contains("remove-skill")) {
      const skillTag = event.target.parentElement;
      skillsContainer.removeChild(skillTag);
      const index = skillTag.getAttribute("filter_number");
      if (Number(index) < filters.length) {
        filters.splice(Number(index), 1);
      }
      console.log({ filters });
    }
  });

  // Function to show the skill tagger and overlay
  function showSkillTagger() {
    wrapper.style.display = "flex";
  }

  // Function to hide the skill tagger and overlay
  function hideSkillTagger() {
    wrapper.style.display = "none";
  }

  // Event listener to hide the skill tagger when clicking outside
  overlay.addEventListener("click", hideSkillTagger);

  // Event listener for the Remove All button
  removeAllButton.addEventListener("click", () => {
    skillsContainer.innerHTML = ""; // Remove all skill tags
    filters = [];
    saveData("filters", []);
  });

  // Event listener for the Save button
  saveButton.addEventListener("click", () => {
    const skills = Array.from(skillsContainer.children).map((tag: any) =>
      tag.textContent.trim()
    );
    console.log({ filters });
    saveData("filters", filters);
    hideSkillTagger();
    // alert("Skills saved: " + skills.join(", "));
  });

  // Optional: Show the skill tagger and overlay for demonstration purposes
  // Call this function where needed (e.g., on a button click to open the skill tagger)
  showSkillTagger();
};

// addSkillAddPopUp();
console.log("after adding skill tagger");
