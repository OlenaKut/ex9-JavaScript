for (let i = 1; i <= 100; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log("Bish-Bosh");
  } else if (i % 3 === 0) {
    console.log("Bish");
  } else if (i % 5 === 0) {
    console.log("Bosh");
  } else {
    console.log(i);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const warning = document.getElementById("formWarning");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const bish = parseInt(document.getElementById("bishNumber").value);
    const bosh = parseInt(document.getElementById("boshNumber").value);
    const max = parseInt(document.getElementById("maxNumber").value);

    const userInputs = document.getElementById("userInputs");

    userInputs.innerHTML = `
  <strong>Bish:</strong> ${bish} <br>
  <strong>Bosh:</strong> ${bosh} <br>
  <strong>Max:</strong> ${max}
`;
    userInputs.style.display = "block";

    const result = [];
    for (let i = 1; i <= max; i++) {
      if (i % bish === 0 && i % bosh === 0) {
        result.push("Bish-Bosh");
      } else if (i % bish === 0) {
        result.push("Bish");
      } else if (i % bosh === 0) {
        result.push("Bosh");
      } else {
        result.push(i);
      }
    }

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = result.join(", ");
    resultDiv.style.display = "block";

    const modalElement = document.getElementById("staticBackdrop");
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
    form.reset();
  });
});

function resetGame() {
  const userInputs = document.getElementById("userInputs");
  const resultDiv = document.getElementById("result");

  userInputs.style.display = "none";
  resultDiv.style.display = "none";
}
