public class Demo{

    public static void main(String args[]){
        SourceLink NPR = new SourceLink("https://text.npr.org", "a.topic-title", "NPR");
        SourceLink THN = new SourceLink("https://thehackernews.com/", "a.story-link", "The Hacker News");

        System.out.printf("Titles && summaries:\n\n %s", AISummary.summarize(THN.search(5)));
    }
}