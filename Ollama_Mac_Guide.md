# 🧠 Ollama on macOS — Quick Command Guide

## 📦 Install & Info

```bash
brew install ollama
brew info ollama           # View install size and path
```

## ⚙️ Start the Server

### Option 1: Manual (in terminal)

```bash
ollama serve
```

### Option 2: Background service (auto-start at login)

```bash
brew services start ollama
brew services stop ollama  # To disable
```

### Option 3: Background (with log)

```bash
nohup ollama serve > ~/ollama.log 2>&1 &
```

## ⚡ zsh Aliases (`~/.zshrc`)

```zsh
# Start server manually
alias olls="/opt/homebrew/opt/ollama/bin/ollama serve"

# Start in background with logging
alias ollbg="nohup /opt/homebrew/opt/ollama/bin/ollama serve > ~/ollama.log 2>&1 &"

# Direct alias to ollama CLI
alias ollama="/opt/homebrew/opt/ollama/bin/ollama"
```

> After editing `.zshrc`, run: `source ~/.zshrc`

## 📥 Download LLMs (Recommended for 16GB RAM)

```bash
ollama pull mistral        # Fast, general-purpose (~4.1GB)
ollama pull llama3         # Meta's latest 8B model (~4.7GB)
ollama pull gemma:2b       # Lightweight chat (~2GB)
ollama pull codellama:7b   # Code-focused (~7GB)
```

## 💬 Run Models

```bash
ollama run mistral
ollama run llama3
```

## 📋 Manage Models

```bash
ollama list                # Show downloaded models
ollama remove llama3       # Delete a model
```

## 📁 Storage & System Monitoring

-   Models pulled via Ollama are stored in:

```
~/.ollama/models
```

```bash
du -sh ~/.ollama           # Check Ollama's total storage size
du -sh ~/.ollama/models    # Check model storage size
top -o mem                 # Monitor memory usage
```

## 🛑 Stop the Ollama Server

To stop the server, simply press Ctrl + C in the terminal where it's running.
