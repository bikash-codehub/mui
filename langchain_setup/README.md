# LangChain Setup

This folder contains a minimal setup for using [LangChain](https://python.langchain.com) within this repository.

## Installation

Create a virtual environment (optional) and install the dependencies:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Usage

Set your OpenAI API key in the environment and run the example script:

```bash
export OPENAI_API_KEY=your-key-here
python langchain_example.py
```

The script will make a simple completion request using LangChain's `OpenAI` wrapper.

