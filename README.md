# AINews

AINews is a small full-stack project that scrapes news articles from a few websites, summarizes each one with a locally running LLM, and displays the summaries as cards in a simple web page. This is a mini project aimed at scraping and summarizing articles off the internet for larger AI based projects that need to implement web searching.

## How It Works

1. The web page has a **Press for AI News** button.
2. Clicking it sends a request to a local Java HTTP server (`GET /api/run`).
3. The server scrapes the top articles from each configured news source using Jsoup.
4. Each article is sent to a local Ollama model (`llama3.2`), which returns a structured summary.
5. The summaries are returned to the browser, parsed, and rendered as clickable cards.

## GITHUB

- using a test file for github viewing purposes

## Project Structure

```
Java/
  AINewsAPI.java     HTTP server exposing the /api/run endpoint (port 8080)
  NewsManager.java   Defines the news sources and coordinates scraping + summarizing
  Source.java        Abstract base class for a news source
  SourceLink.java    Source that scrapes a site's front page and follows article links
  SourcePrompt.java  Source that holds a prompt (placeholder, search is not implemented)
  AISummary.java     Sends article text to Ollama and returns the summary
Webpage/
  main.html          Page markup
  index.js           Fetches summaries from the API and builds the article cards
  style.css          Dark theme styling
```

## Requirements

- Java 17 or newer (uses `com.sun.net.httpserver`)
- [Ollama](https://ollama.com) installed and running on `http://localhost:11434`
- The `llama3.2` model pulled: `ollama pull llama3.2`
- Libraries on the classpath:
  - [Jsoup](https://jsoup.org) for HTML scraping
  - [ollama4j](https://github.com/ollama4j/ollama4j) for talking to Ollama

## Setup and Running

1. Start Ollama and make sure the model is available:

   ```
   ollama pull llama3.2
   ollama serve
   ```

2. Compile and run the Java server (adjust the classpath to wherever your Jsoup and ollama4j jars live):

   ```
   cd Java
   javac -cp "libs/*" *.java
   java -cp ".:libs/*" AINewsAPI
   ```

   On Windows, use `;` instead of `:` in the classpath.

3. The server listens on `http://localhost:8080`. Open `src/Webpage/main.html` in your browser and click **Press for AI News**.

Note: summarizing takes a while, since each article is processed by the local model one at a time. The request timeout is set to 300 seconds per article.

## Adding a News Source

Sources are defined in `NewsManager.populateSources()`. To add one, create a `SourceLink` with the site's front page URL, a CSS selector that matches article links, and a display name:

```java
Source example = new SourceLink("https://example.com", "a.article-link", "Example");
sources.add(example);
```

## Configuration

| Setting | Location | Default |
| --- | --- | --- |
| Server port | `AINewsAPI.java` | `8080` |
| Ollama host | `AISummary.java` | `http://localhost:11434` |
| Model | `AISummary.java` | `llama3.2` |
| Articles per source | `NewsManager.java` (`source.search(5)`) | `5` |
| Minimum article length | `SourceLink.java` | 1000 characters |
| API URL used by the page | `src/Webpage/index.js` | `http://localhost:8080/api/run` |

