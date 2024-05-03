const submit_button = document.getElementById('submit_button')
const history_button = document.getElementById('history_button')
const memory_button = document.getElementById('allow_memory')
const text_display = document.getElementById("text_display")
const user_text = document.getElementById("user_text")
const loader = document.getElementById("loader")

let allow_memory = false
let chat_log = ""

const executePrompt = () => {
    if (user_text.value != "") {
        sendUserText()
        loader.style.display = "block"
        text_display.style.display = "none"
    }
}

const memoryLogic = () => {
    if (allow_memory) {
        allow_memory = false

        memory_button.style.background = "red"
        memory_button.style.color = "white"

    } else {
        allow_memory = true

        memory_button.style.background = "green"
        memory_button.style.color = "white"
    }
}

const sendUserText = async () => {
    const userText = user_text.value
    if (allow_memory) {
        chat_log += `\n${userText}`
        // console.log(chat_log)
    }

    const requestBody = allow_memory ? chat_log : userText

    const response = await fetch("/chatgpt", {
        method: "POST",
        body: JSON.stringify({ userText: requestBody }),
        headers: {
            "Content-Type": "application/json",
        },
    })

    response_data = await response.json()
    text_display.textContent = response_data.message

    if (allow_memory) {
        chat_log += `\n${response_data.message}`
        // console.log(chat_log)
    }

    loader.style.display = "none"
    text_display.style.display = "block"
}

submit_button.addEventListener('click', executePrompt)
history_button.addEventListener('click', () => { chat_log = "" })
memory_button.addEventListener('click', memoryLogic)