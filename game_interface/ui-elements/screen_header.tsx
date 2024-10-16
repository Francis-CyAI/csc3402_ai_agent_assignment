'use client'

export default function ScreenHeader() {
    return (
        <div className="header-screen">
            <span id="message-span">
                Some message here
            </span>
            <span id="controls-span">
                <button
                    onClick={() => {
                        document.getElementById("message-span")?.innerText +="\nControl button was clicked!"
                    }}
                >Some control</button>
            </span>

        </div>
    )
}