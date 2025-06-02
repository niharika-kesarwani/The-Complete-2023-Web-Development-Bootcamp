const input = document.getElementById("input");
const button = document.getElementById("button");
const result = document.getElementById("result");

button.addEventListener("click", async () => {
  try {
    const response = await axios.get(
      `https://joke-capstone.onrender.com?q=${input.value}`
    );
    if (response.data.data.joke) {
      result.textContent = response.data.data.joke;
    } else {
      result.innerHTML = `${response.data.data.setup}<br>${response.data.data.delivery}`;
    }
  } catch (err) {
    result.innerHTML = err.message;
  }
});
