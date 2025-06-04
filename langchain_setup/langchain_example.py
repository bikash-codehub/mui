import os

from langchain.llms import OpenAI


def main():
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise EnvironmentError("Please set the OPENAI_API_KEY environment variable.")

    llm = OpenAI(api_key=api_key)
    response = llm("Hello, world!")
    print(response)


if __name__ == "__main__":
    main()
