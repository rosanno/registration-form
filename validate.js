const inputElements = document.querySelectorAll("[data-input]");
let data = [];

const validateEmail = (email, element) => {
  const checkEmailAt = email.lastIndexOf("@");
  if (checkEmailAt !== -1 && checkEmailAt < email.length - 1) {
    const dot = email.slice(checkEmailAt + 1);

    const dotPart = dot.split(".");

    if (dotPart.length > 0) {
      const domain = dotPart[dotPart.length - 1];

      if (domain.length >= 2) {
        element.classList.remove("error");
        element.nextElementSibling.innerHTML = "";
      } else {
        element.classList.add("error");
        element.nextElementSibling.innerHTML = "Invalid Email address";
      }
    }
  } else {
    element.classList.add("error");
    element.nextElementSibling.innerHTML = "Invalid Email address";
  }

  return;
};

const addEventOnInputElements = function (input, eventType, callback) {
  input.addEventListener(eventType, callback);
};

const firstNameInput = document.querySelector("[data-input-firstName]");
const lastNameInput = document.querySelector("[data-input-lastName]");
const emailInput = document.querySelector("[data-input-email]");
const contactInput = document.querySelector("[data-input-contact]");
const cityInput = document.querySelector("[data-input-city]");

const barangayInput = document.querySelector("[data-input-barangay]");
const streetInput = document.querySelector("[data-input-street]");
const provinceInput = document.querySelector("[data-input-province]");
const zipInput = document.querySelector("[data-input-zip]");
const passwordInput = document.querySelector("[data-input-password]");
const confirmPasswordInput = document.querySelector("[data-input-confirmPassword]");

const validateName = (name, element) => {
  if (name.length < 6 || name.length > 20) {
    element.classList.add("error");
    element.nextElementSibling.innerHTML = "Name min 6 and max 20 of characters";
  } else {
    element.classList.remove("error");
    element.nextElementSibling.innerHTML = "";
  }
};

addEventOnInputElements(firstNameInput, "keyup", (event) => {
  const firstName = event.target.value;
  validateName(firstName, firstNameInput);
});

addEventOnInputElements(lastNameInput, "keyup", (event) => {
  const lastName = event.target.value;
  validateName(lastName, lastNameInput);
});

addEventOnInputElements(emailInput, "keyup", (event) => {
  const email = event.target.value;
  validateEmail(email, emailInput);
});

contactInput.addEventListener("keyup", function (event) {
  if (contactInput.value.length >= 10) {
    event.preventDefault();
    contactInput.classList.remove("error");
  } else {
    contactInput.classList.add("error");
    contactInput.nextElementSibling.innerHTML = "Contact must 10 character long";
  }
});

addEventOnInputElements(passwordInput, "keyup", (event) => {
  if (event.target.value.length < 10) {
    passwordInput.classList.add("error");
    passwordInput.nextElementSibling.innerHTML = "Password must 10 characters long";
  } else {
    passwordInput.classList.remove("error");
    passwordInput.nextElementSibling.innerHTML = "";
  }
});

addEventOnInputElements(confirmPasswordInput, "keyup", (event) => {
  if (event.target.value !== passwordInput.value) {
    confirmPasswordInput.classList.add("error");
    confirmPasswordInput.nextElementSibling.innerHTML = "Password did not match!";
  } else {
    confirmPasswordInput.classList.remove("error");
    confirmPasswordInput.nextElementSibling.innerHTML = "";
  }
});

const hideOrShowForm = (formId, prop1, prop2) => {
  document.getElementById(formId).classList.replace(prop1, prop2);
};

const activeNav = (selector, prop1, prop2) => {
  document.querySelector(selector).classList.replace(prop1, prop2);
};

const fieldRequired = (inputElements) => {
  document.querySelectorAll(inputElements).forEach((input) => {
    if (input.value !== "") {
      input.classList.remove("error");
    } else {
      input.classList.add("error");
      input.nextElementSibling.innerHTML = "Fields required";
    }
  });
};

const checkFormOne = () => {
  if (
    firstNameInput.value !== "" &&
    lastNameInput.value !== "" &&
    emailInput.value !== "" &&
    contactInput.value !== "" &&
    cityInput.value !== ""
  ) {
    hideOrShowForm("form-one", "block", "hidden");
    hideOrShowForm("form-two", "hidden", "block");

    activeNav("[data-nav-one]", "active", "inactive");
    activeNav("[data-nav-two]", "inactive", "active");
  } else {
    fieldRequired(".input-one");
  }
};

const registered = (data) => {
  const details = [
    "Firt Name",
    "Last Name",
    "Email",
    "Contact #",
    "City",
    "Barangay",
    "Street/Unit",
    "Province",
    "Zip Code",
  ];

  document.querySelector(".form-container").classList.replace("block", "hidden");
  document.querySelector(".registered-container").classList.replace("hidden", "block");

  for (let i = 0; i < data.length; i++) {
    const dataItem = data[i];

    const p = document.createElement("p");
    p.classList.add("mt-6");
    const span = document.createElement("span");
    span.classList.add("ml-2", "text-gray-400");
    span.textContent = dataItem;
    p.textContent = `${details[i]}:`;
    p.appendChild(span);

    document.querySelector(".details").appendChild(p);
  }
};

const checkFormTwo = () => {
  if (
    barangayInput.value !== "" &&
    streetInput.value !== "" &&
    provinceInput.value !== "" &&
    zipInput.value !== "" &&
    passwordInput.value !== "" &&
    confirmPasswordInput.value !== ""
  ) {
    data.push(
      firstNameInput.value,
      lastNameInput.value,
      emailInput.value,
      contactInput.value,
      cityInput.value,
      barangayInput.value,
      streetInput.value,
      provinceInput.value,
      zipInput.value,
    );

    registered(data);
  } else {
    fieldRequired(".input-two");
  }
};

document.getElementById("nextBtn").addEventListener("click", (e) => {
  e.preventDefault();

  checkFormOne();
});

document.getElementById("register").addEventListener("click", (e) => {
  e.preventDefault();

  checkFormTwo();
});

document.getElementById("prevBtn").addEventListener("click", (e) => {
  e.preventDefault();

  hideOrShowForm("form-two", "block", "hidden");
  hideOrShowForm("form-one", "hidden", "block");

  activeNav("[data-nav-two]", "active", "inactive");
  activeNav("[data-nav-one]", "inactive", "active");
});
