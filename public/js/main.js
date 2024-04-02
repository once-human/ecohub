document
  .getElementById("queryForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const queryInput = document.getElementById("queryInput").value;

    try {
      const response = await fetch("/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: queryInput }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      document.getElementById("response").innerText = responseData.reply;
    } catch (error) {
      console.error("Error sending query:", error);
      document.getElementById("response").innerText =
        "An error occurred. Please try again later.";
    }
  });
