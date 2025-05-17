import os
import json
from pypdf import PdfReader

def extract_text_from_pdf(filepath):
    reader = PdfReader(filepath)
    return "\n".join(page.extract_text() or "" for page in reader.pages)

# === Locate PDFs relative to this script ===
base_dir = os.path.dirname(os.path.abspath(__file__))
resume_path = os.path.join(base_dir, "resume.pdf")
job_path = os.path.join(base_dir, "job-file.pdf")

# === Extract text ===
resume_text = extract_text_from_pdf(resume_path)
job_text = extract_text_from_pdf(job_path)

# === Save to JSON ===
output_path = os.path.join(base_dir, "pdf_texts.json")
with open(output_path, "w", encoding="utf-8") as f:
    json.dump({
        "resume": resume_text,
        "job_description": job_text
    }, f, ensure_ascii=False, indent=2)

print(f"✅ Extracted text saved to {output_path}")
