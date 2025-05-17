# Resume Critique AI

![AI Analysis](https://img.shields.io/badge/AI-Powered-blueviolet)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue)
![Python](https://img.shields.io/badge/Python-3.8+-yellow)

An intelligent system that analyzes resumes against job descriptions using AI, providing structured feedback for both candidates and recruiters.

## 📌 Features

-   **Dual-Perspective Evaluation** - Candidate-focused improvements and recruiter-facing insights
-   **PDF Text Extraction** - Automatically processes resume and job description PDFs
-   **Structured Output** - Clean, categorized analysis using Zod schemas
-   **AI-Powered Insights** - Leverages Ollama's Qwen3 model for intelligent assessment
-   **Humorous "Spicy Takes"** - Memorable one-liners to help recruiters contextualize candidates

## 🛠️ Installation

### Prerequisites

-   Node.js (v18+)
-   Bun 
-   Python (v3.8+)
-   Ollama (with Qwen3 model)

```bash
# Install Ollama (if needed)
curl -fsSL https://ollama.com/install.sh | sh

# Pull the AI model
ollama pull qwen3
```

### Setup

Clone the repository

Install dependencies:

```bash
bun install
pip install pypdf
```

## 🚀 Usage

Add your files to project root:

-   `resume.pdf` - Your resume/CV
-   `job-file.pdf` - Job description PDF

Extract text:

```bash
python pdf_extractor.py
```

Run analysis:

```bash
bun resume-critique.ts
```

## 📊 Sample Output Structure

```json
{
    "candidateInfo": {
        "name": "John Developer",
        "email": "john@dev.com"
    },
    "skills": ["React", "TypeScript"],
    "candidateAnalysis": {
        "strengthsForRole": ["Excellent React skills"],
        "gapsInRole": ["Limited backend experience"],
        "overallFit": "Moderate",
        "recommendations": ["Highlight performance optimization work"]
    },
    "recruiterDecisionAid": {
        "shouldShortlist": true,
        "rationale": "Strong fundamentals but needs domain-specific experience",
        "spicyTake": "A Ferrari stuck in city traffic - great engine but not on the right track... yet"
    }
}
```

## 🧩 Components

| File                 | Purpose                                 |
| -------------------- | --------------------------------------- |
| `pdf_extractor.py`   | Extracts text from PDFs to JSON         |
| `resume-critique.ts` | Main analysis logic with AI integration |
| `pdf_texts.json`     | Intermediate text storage               |
| `package.json`       | Node.js dependencies                    |

## 🌟 Advanced Configuration

Customize the analysis by modifying:

-   **Prompt Engineering** - Edit `resumeCritiquePrompt` in `resume-critique.ts`
-   **Output Schema** - Adjust `analysisSchema` for different fields
-   **Model Selection** - Change `qwen3` to other Ollama models

## 📈 Future Enhancements

-   Add DOCX/Word document support
-   Implement web interface
-   Enable batch processing
-   Add PDF generation for reports

## 🤝 Contributing

-   Fork the project
-   Create your feature branch (`git checkout -b feature/amazing-feature`)
-   Commit your changes (`git commit -m 'Add some amazing feature'`)
-   Push to the branch (`git push origin feature/amazing-feature`)
-   Open a Pull Request

## 📜 License

Distributed under the MIT License.
