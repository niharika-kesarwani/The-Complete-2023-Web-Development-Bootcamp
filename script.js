const input = document.getElementById("input");
const button = document.getElementById("button");

button.addEventListener("click", async () => {
  try {
    console.log(`https://joke-capstone.onrender.com?q=${input.value}`);
    const response = await axios.get(
      `https://joke-capstone.onrender.com?q=${input.value}`
    );
    console.log(response);
  } catch (err) {
    console.log(err);
  }
});
