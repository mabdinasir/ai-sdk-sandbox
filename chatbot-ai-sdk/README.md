# 🧠 AI Chat Interface

A clean and responsive AI-powered chat interface built with **React**, **Tailwind CSS**, and the `@ai-sdk/react` package. It connects to an Ollama-hosted AI model (`mistral`) to stream assistant responses in real time.

## ✨ Features

-   💬 Real-time two-way messaging with AI
-   🎨 Stylish gradient-based UI using Tailwind CSS
-   👤 Distinct visual styling for user and assistant messages
-   ⚡ Streamed responses using Ollama AI
-   🚫 Auto-scroll removed for manual control

## 🛠 Tech Stack

-   React + Next.js (client components)
-   Tailwind CSS
-   [Lucide React](https://lucide.dev/) Icons
-   `@ai-sdk/react` for chat state and streaming
-   Ollama AI (Mistral model)

## 📁 Project Structure

-   `app/page.tsx` – Main UI component rendering chat messages and input form
-   `app/api/chat/route.ts` – API handler for streaming chat responses from Ollama

## 🚀 Getting Started

1. **Install dependencies**

    ```bash
    bun install
    ```

2. **Start development server**
    ```bash
    bun dev
    ```

## 📜 License

-   -   MIT
