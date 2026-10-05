import java.util.ArrayList;
import java.util.List;

public class NewsManager{
    private static List<Source> sources = new ArrayList<>();

    private static void populateSources(){
        Source NPR = new SourceLink("https://text.npr.org", "a.topic-title", "NPR");
        Source THN = new SourceLink("https://thehackernews.com", "a.story-link", "The Hacker News");
        //ADD More Here

        sources.add(NPR);
        sources.add(THN);
    }

    public static List<String> getNews(){
        populateSources();

        List<String> summaries = new ArrayList<>();

            for(Source source: sources){
                List<String> list = source.search(4);

                for(String item: list){
                    summaries.add(AISummary.summarize(item));
                }
            }

                for(String i: summaries){
                    System.out.println(i + "\n\n");
                }

        return summaries;
    }




}